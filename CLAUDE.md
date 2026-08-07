# aperia-ask-nanci-marketing

Static HTML decks about Ask Nanci, embedded into Webflow. (Working directory is `webflow`; the git
remote is `aperia-ask-nanci-marketing`.)

## The HTML is the source, the bundle is generated

Each deck's React/JSX lives in its `<script type="text/babel">` block. `build.sh` extracts it, runs
babel to `-app.js`, then terser to `-app.min.js`.

**Webflow loads the `.min.js`.** Editing the HTML alone ships nothing, and a stale bundle is
invisible until someone looks at prod. `.githooks/pre-commit` rebuilds and stages the bundle
whenever a deck's HTML is committed, so the two can't drift. It needs
`git config core.hooksPath .githooks` once per clone, since hooks aren't cloned.

## Two decks, one pipeline

`DECKS` in `build.sh` lists them; `.githooks/pre-commit` has a copy that must stay in sync. Naming
is positional: `<base>.html` builds `<base>-app.js` and `<base>-app.min.js`. Adding a deck is one
line in each array.

- `ask-nanci-architecture-summary` — the original, mentions Clover.
- `ask-nanci-architecture-summary-generic` — a full fork with the Clover wording removed
  (`"Point of sale"`, matching the category labels already in `sourceNameMap`). It deliberately
  keeps the shamrock icon and `COLORS.clover`.

**The fork means copy edits do not propagate.** Any shared wording change has to be applied to both
files by hand. Nothing checks for drift.

## `./build.sh` is a push

It commits, pushes and purges as its final step. Use `SKIP_SHIP=1 ./build.sh` for local builds; run
it bare only when the user has said to ship.

Its `verify_cdn` step still purges jsDelivr, which nothing serves from anymore. Failures are
swallowed, so a bare run can print `WARNING: CDN still stale` while the Pages deploy is fine.

## Shipping is GitHub Pages

Every push to `main` republishes. Permanent embed URLs, never need swapping, one per deck:

```
https://thuannguyen13.github.io/aperia-ask-nanci-marketing/ask-nanci-architecture-summary-app.min.js
https://thuannguyen13.github.io/aperia-ask-nanci-marketing/ask-nanci-architecture-summary-generic-app.min.js
```

`cache-control: max-age=600`, correct `application/javascript`, CORS open. **The Pages root 404s**
(no `index.html`), which looks broken but isn't; only file URLs resolve.

Don't go back to jsDelivr: `@main` caches the branch-to-commit mapping for 12h and the purge API
clears the file, not that mapping, so a stale bundle is unfixable for half a day.

Verify a deploy by hash, not by eye:

```bash
curl -s <url> | shasum -a256
shasum -a256 ask-nanci-architecture-summary-app.min.js
```

## The embed is not self-contained

The bundle compiles to `React.createElement` calls and ends with
`ReactDOM.createRoot(document.getElementById("root")).render(...)`. The Webflow page must supply:

1. `React` global (18 UMD)
2. `ReactDOM` global (18 UMD)
3. A `<div id="root">`

`babel-standalone` is in the HTML only so the file runs when opened locally. Webflow doesn't need it.

The embed appends the script tag dynamically, which makes it async. If it beats `#root` into the
DOM, `createRoot(null)` throws and the deck renders blank with nothing obviously wrong on the page.
Place the embed after the root div.
