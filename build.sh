#!/bin/bash
# Rebuilds ask-nanci-architecture-summary-app.js and .min.js from the JSX source
# of truth (the <script type="text/babel"> block in ask-nanci-architecture-summary.html).
set -euo pipefail
cd "$(dirname "$0")"

SRC=ask-nanci-architecture-summary.html
OUT=ask-nanci-architecture-summary-app.js
MIN=ask-nanci-architecture-summary-app.min.js

sed -n '/<script type="text\/babel">/,/<\/script>/p' "$SRC" | sed '1d;$d' > .build.jsx

{
  echo "(function() {"
  npx babel --presets=@babel/preset-react .build.jsx
  echo "})();"
} > "$OUT"

npx terser "$OUT" --compress --mangle -o "$MIN"

rm .build.jsx
node -e "new Function(require('fs').readFileSync('$OUT','utf8')); new Function(require('fs').readFileSync('$MIN','utf8')); console.log('OK: $OUT and $MIN rebuilt and syntax-checked')"

REPO=thuannguyen13/aperia-ask-nanci-marketing

# A single purge reports success while the CDN still serves the old file, so purge
# until what jsDelivr hands back actually matches the bundle we just built.
verify_cdn() {
  local want got
  want=$(shasum -a 256 < "$MIN" | cut -d' ' -f1)
  for i in 1 2 3 4 5; do
    curl -fsS "https://purge.jsdelivr.net/gh/$REPO@main/$MIN" -o /dev/null || true
    sleep 3
    got=$(curl -fsS "https://cdn.jsdelivr.net/gh/$REPO@main/$MIN" 2>/dev/null | shasum -a 256 | cut -d' ' -f1)
    if [ "$want" = "$got" ]; then echo "CDN serving current bundle (purge $i)"; return 0; fi
  done
  echo "WARNING: CDN still stale after 5 purges. Live site is NOT current."
  echo "  check: https://cdn.jsdelivr.net/gh/$REPO@main/$MIN"
  return 1
}

# Ship: commit, push, purge jsDelivr and confirm the CDN really updated.
# ponytail: skip with SKIP_SHIP=1 ./build.sh when you just want a local build.
if [ "${SKIP_SHIP:-}" != "1" ] && git rev-parse --git-dir >/dev/null 2>&1; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    git add "$SRC" "$OUT" "$MIN"
    git commit -q -m "Rebuild app bundle"
    git push -q origin main
    echo "Pushed $(git rev-parse --short HEAD)"
    verify_cdn || true
  else
    echo "Nothing to ship (no changes)"
    verify_cdn || true
  fi
fi
