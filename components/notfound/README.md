# Branded 404 — git terminal

An interactive, on-brand 404 page styled as a faux **git terminal**: it boots, auto-types
`git checkout <the-path-you-wanted>`, answers with `fatal: pathspec … did not match`, prints
an ASCII "404" and a broken commit graph, then drops you at a live shell that accepts real
commands (`help`, `ls`, `git status`, `git log`, `cd ~`, `git remote -v`, …) with ↑/↓ history
and Tab-complete. Fits AICommit's product (a git commit-message tool), so the joke lands.

## Files

| File | Role |
| --- | --- |
| `pages/404.tsx` | The route. Static (no `getServerSideProps`), `noindex`, reuses `<Background>` + `<Footer>`, `<noscript>` recovery links. Lazy-loads the terminal. |
| `components/notfound/GitTerminal.tsx` | The terminal itself. **Client-only**, loaded via `next/dynamic({ ssr: false })`. |

## Architecture & why

- **Lazy, client-only terminal.** `404.tsx` imports `GitTerminal` through `next/dynamic` with
  `ssr: false`, so it becomes a separate async chunk that downloads **only when a 404 is hit**
  and never enters the homepage bundle. The dynamic `loading` placeholder reserves the
  terminal's exact height (`min(600px,72vh)`) so there is **no layout shift**.
- **Static prerender.** `/404` builds to a static asset (`○` in `next build`), ~5.9 kB; on
  Cloudflare Pages (`@cloudflare/next-on-pages`) it stays a static asset — no Worker, no
  `runtime = 'edge'`.
- **Pure React, no `innerHTML`.** Output lines are `ReactNode`s with Tailwind-colored `<span>`s
  (`A`/`D`/`G`/`R`/`B`/`W` helpers), not HTML strings. No `dangerouslySetInnerHTML`, so the
  rich multi-color git-graph and ASCII art stay XSS-safe by construction.
- **Personalized.** The bad path comes from `window.location.pathname` (`sanitizePath`:
  decoded, length-capped to 40 chars, rendered only as a text node — safe).
- **Reduced motion.** With `prefers-reduced-motion`, the full transcript renders instantly
  (no typewriter, no blinking caret).
- **StrictMode-safe.** A `gen` ref (generation counter) is bumped on every effect run and on
  cleanup; in-flight `setTimeout` callbacks bail when `gen.current` no longer matches, so
  React 18 StrictMode's double-invoke (and any unmount) can't leave duplicate animations or
  zombie timers running.
- **No-JS recovery.** The interactive chips need JS, but `404.tsx`'s `<noscript>` ships real
  anchors to home + Marketplace, so recovery always works.

## Design provenance

This page was chosen via a **design-by-demo shootout**: 6 distinct concepts (three.js 3D
commit-graph, three.js GLSL glitch, this ASCII git terminal, ASCII canvas matrix, raw-WebGL
shader, CSS/SVG glitch) were each built as a self-contained live demo and reviewed side-by-side
in one tabbed page. The terminal won on brand fit + near-zero weight. The reusable playbook for
that process is the `concept-shootout` Claude skill.

> Note: the original throwaway HTML demo had a latent bug — a `.404big` CSS selector is invalid
> (a class can't start with a digit), so its ASCII banner never received the accent color. The
> production port uses a valid class, so the banner is correctly brand-colored here.

## Extending it

- **Add a command:** extend the `switch` in `run()` inside `GitTerminal.tsx`. Each case calls
  `push(<>…</>)` with colored fragments. `cd`/`git remote` navigate; `clear` resets history.
  Add the command to `TAB_OPTIONS` if it should Tab-complete.
- **Change the boot script:** edit `bootScript(path)` — a list of `{ kind: 'type' | 'print' }`
  steps. `type` animates a command char-by-char; `print` reveals a line after `delay` ms.
- **Recovery chips:** `RecoveryChips` (rendered inline in the scrollback). The `cd ~` and `help`
  chips route through the same `run()` handler as typed input (via the module-level `chipRun`);
  the Marketplace chip is a plain external `<a>` link so it opens natively (real link semantics,
  no popup-blocker issues).

## Verify after changes

```bash
npx tsc --noEmit && npm run lint && npm run build   # /404 should show as ○ (Static)
```
Then run `next dev` and visit any nonexistent route (e.g. `/the-page-you-wanted`) — it must
return **HTTP 404** and animate.
