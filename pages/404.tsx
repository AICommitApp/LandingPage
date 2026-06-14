// pages/404.tsx — statically optimized (NO getServerSideProps/getInitialProps),
// noindex, lazy + client-only interactive terminal, full keyboard/no-JS recovery.
//
// On Cloudflare Pages via @cloudflare/next-on-pages this stays a static asset
// (no Worker invocation, no `runtime = 'edge'`); the terminal chunk is fetched
// only when a 404 actually renders and never enters the homepage bundle.
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Background } from '@/components/Background';
import { Footer } from '@/components/landing/Footer';
import { HOME_URL, MARKETPLACE_URL } from '@/lib/seo';

// ssr:false + dynamic import ⇒ separate async chunk, downloaded only on a 404 hit.
const GitTerminal = dynamic(() => import('@/components/notfound/GitTerminal'), {
  ssr: false,
  loading: () => (
    // Reserve the terminal's footprint so there's no layout shift while it loads.
    <div
      aria-hidden="true"
      className="mx-auto h-[min(600px,72vh)] w-full max-w-2xl rounded-xl border border-white/10 bg-[#0e1016]/80"
    />
  ),
});

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — pathspec did not match · AICommit</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="This page was not found." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#21252f" />
      </Head>

      <div className="relative min-h-screen overflow-hidden text-white">
        <Background />

        <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-20">
          <h1 className="mb-2 font-mono text-2xl font-bold text-brand md:text-3xl">404</h1>
          <p className="mb-8 font-mono text-sm text-gray-400">commit not found in this tree</p>

          <GitTerminal />

          {/* No-JS / crawler-safe recovery: real anchors outside the JS island. */}
          <noscript>
            <div className="mt-6 text-center font-mono text-sm">
              <a className="text-brand underline" href={HOME_URL}>
                cd / (home)
              </a>
              {'  ·  '}
              <a
                className="text-brand underline"
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                git remote (JetBrains Marketplace)
              </a>
            </div>
          </noscript>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
