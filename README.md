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

## Deployment — Cloudflare Pages

Deployed to **Cloudflare Pages** via its GitHub integration: every push to `main` triggers a
build on Cloudflare's side. (The build/deploy check you see on commits and PRs is the Cloudflare
Pages deployment — there are no GitHub Actions workflows in this repo.)

The build runs through **[`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages)**,
which adapts the Next.js output to the Pages runtime and translates `next.config.js` `redirects()`
and `headers()` into Cloudflare routing — so the **www → apex 301**, the `X-Robots-Tag: noindex`
on the agent files, and the long-lived cache headers all originate from `next.config.js`.

**Cloudflare Pages project settings:**

| Setting | Value |
| --- | --- |
| Build command | `npx @cloudflare/next-on-pages` |
| Build output directory | `.vercel/output/static` |
| Compatibility flags | `nodejs_compat` |

Domains: `aicommit.app` (apex) is the Pages custom domain; `www.aicommit.app` 301-redirects to it.

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
