#!/bin/bash
# Rebuilds each deck's -app.js and -app.min.js from that deck's JSX source of
# truth (the <script type="text/babel"> block in its .html).
set -euo pipefail
cd "$(dirname "$0")"

# One entry per deck, named after its .html minus the extension:
#   <base>.html -> <base>-app.js -> <base>-app.min.js
DECKS=(
  ask-nanci-architecture-summary
  ask-nanci-architecture-summary-generic
)

PAGES=https://thuannguyen13.github.io/aperia-ask-nanci-marketing

build_deck() {
  local base=$1
  local src="$base.html" out="$base-app.js" min="$base-app.min.js"

  sed -n '/<script type="text\/babel">/,/<\/script>/p' "$src" | sed '1d;$d' > .build.jsx

  {
    echo "(function() {"
    npx babel --presets=@babel/preset-react .build.jsx
    echo "})();"
  } > "$out"

  npx terser "$out" --compress --mangle -o "$min"

  rm .build.jsx
  node -e "new Function(require('fs').readFileSync('$out','utf8')); new Function(require('fs').readFileSync('$min','utf8')); console.log('OK: $out and $min rebuilt and syntax-checked')"
}

for deck in "${DECKS[@]}"; do
  build_deck "$deck"
done

# Pages serves whatever is on main, so a deploy is confirmed by hashing the live
# file against the one we just built. (This replaced a jsDelivr purge loop;
# jsDelivr no longer serves these decks.)
verify_pages() {
  local min=$1 want got
  want=$(shasum -a 256 < "$min" | cut -d' ' -f1)
  for i in 1 2 3 4 5; do
    got=$(curl -fsS "$PAGES/$min" 2>/dev/null | shasum -a 256 | cut -d' ' -f1) || got=""
    if [ "$want" = "$got" ]; then echo "Pages serving current $min (check $i)"; return 0; fi
    sleep 10
  done
  echo "WARNING: Pages still stale for $min after 5 checks."
  echo "  check: $PAGES/$min"
  return 1
}

# Ship: commit, push, and confirm Pages really updated.
# ponytail: skip with SKIP_SHIP=1 ./build.sh when you just want a local build.
if [ "${SKIP_SHIP:-}" != "1" ] && git rev-parse --git-dir >/dev/null 2>&1; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    for deck in "${DECKS[@]}"; do
      git add "$deck.html" "$deck-app.js" "$deck-app.min.js"
    done
    git commit -q -m "Rebuild app bundle"
    git push -q origin main
    echo "Pushed $(git rev-parse --short HEAD)"
    for deck in "${DECKS[@]}"; do verify_pages "$deck-app.min.js" || true; done
  else
    echo "Nothing to ship (no changes)"
  fi
fi
