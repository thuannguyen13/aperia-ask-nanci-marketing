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

# Ship: commit, push, cut the next tag (so @latest advances), purge jsDelivr.
# ponytail: skip with SKIP_SHIP=1 ./build.sh when you just want a local build.
if [ "${SKIP_SHIP:-}" != "1" ] && git rev-parse --git-dir >/dev/null 2>&1; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    git add -A
    git commit -q -m "Rebuild app bundle"
    git push -q origin main
    curl -fsS "https://purge.jsdelivr.net/gh/thuannguyen13/aperia-ask-nanci-marketing@main/$MIN" -o /dev/null \
      && echo "Shipped: pushed + jsDelivr purged" || echo "Pushed; purge failed (jsDelivr refreshes within 7d)"
  else
    echo "Nothing to ship (no changes)"
  fi
fi
