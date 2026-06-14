# AICommit — Landing Page

Marketing site for **[AICommit](https://aicommit.app)** — a JetBrains IDE plugin that generates
git commit messages from your staged diff. Live at **https://aicommit.app**.

Built with **Next.js 15** (Pages Router) + TypeScript + **Tailwind CSS**, with `framer-motion`
for animation and self-hosted **Zed Sans / Zed Mono** fonts via `next/font/local`. Deployed on
**Cloudflare Pages**.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Edit the home page from `pages/index.tsx`; the sections live in `components/landing/*`.
Node ≥ 18 (see `.node-version`).

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run test:seo` | Builds, then asserts the SEO output — SSR metadata, JSON-LD, `robots.txt`, `sitemap.xml`, the agent-readable files, and the `next.config.js` headers/redirects |
| `npm run build:cf` | Cloudflare build — `next build --webpack` then OpenNext adapt → `.open-next/` |
| `npm run preview` | Build + run the Worker locally (`wrangler dev`) |
| `npm run deploy` | Build + `wrangler deploy` |

Requires **Node 20+**. Builds use `--webpack` (Turbopack 16.x mishandles `next/font/local` multi-file `src` arrays).

## Deployment — Cloudflare (OpenNext)

Deployed to **Cloudflare** via [OpenNext](https://opennext.js.org/cloudflare) —
**[`@opennextjs/cloudflare`](https://github.com/opennextjs/opennextjs-cloudflare)**, the official
successor to the now-deprecated `@cloudflare/next-on-pages`. OpenNext adapts the Next.js
**standalone** build into a Cloudflare **Worker**, so `next.config.js` `redirects()` and `headers()`
run at the Worker runtime — the **www → apex 301**, the `X-Robots-Tag: noindex` on the agent files,
and the long-lived cache headers all originate from `next.config.js` (no porting to
`_redirects`/`_headers`). Worker entry + static-assets binding live in `wrangler.jsonc`;
adapter config in `open-next.config.ts`.

The Cloudflare project build command is **`npm run build:cf`** (output `.open-next/worker.js`).
See the [OpenNext Cloudflare guide](https://opennext.js.org/cloudflare/get-started) for connecting
the repo / dashboard settings.

Domains: `aicommit.app` (apex) is the custom domain; `www.aicommit.app` 301-redirects to it.

## Project layout

| Path | Purpose |
| --- | --- |
| `pages/index.tsx` | Home page |
| `pages/404.tsx` | Branded git-terminal 404 (see `components/notfound/README.md`) |
| `components/landing/` | Page sections (`Hero`, `Features`, `Reviews`, …) |
| `components/ui/` | Shared UI bits |
| `lib/seo.ts` | Titles, description, FAQ, and the JSON-LD structured data |
| `public/` | `robots.txt`, `sitemap.xml`, OG image, fonts, and agent-readable resources (`llms.txt`, `llms-full.txt`, `index.md`, `.well-known/ai-agent.json`) |
| `tests/seo-output.test.mjs` | Guards the SEO / structured-data output |
