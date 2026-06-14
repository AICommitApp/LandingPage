/** @type {import('next').NextConfig} */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const HOME_URL = 'https://aicommit.app/';
const AGENT_RESOURCE_NO_INDEX_HEADERS = [
  { key: 'X-Robots-Tag', value: 'noindex, follow' },
];

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  // Required by @opennextjs/cloudflare — it adapts the standalone server bundle
  // (.next/standalone) into a Cloudflare Worker.
  output: 'standalone',
  // Keep Next.js scoped to this project instead of the parent dir to avoid
  // dev-server restarts and hot-update 404s when other lockfiles exist.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    // Tree-shake icon packages so only imported icons are bundled.
    optimizePackageImports: ['lucide-react', '@icons-pack/react-simple-icons'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.aicommit.app',
          },
        ],
        destination: `${HOME_URL}:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '<https://aicommit.app/llms.txt>; rel="describedby"; type="text/plain"',
              '<https://aicommit.app/index.md>; rel="alternate"; type="text/markdown"',
              '<https://aicommit.app/.well-known/ai-agent.json>; rel="service-desc"; type="application/json"',
            ].join(', '),
          },
        ],
      },
      {
        // index.md mirrors the homepage copy verbatim, so exclude it from search
        // indexing outright (a directive) rather than only hinting via canonical.
        // AI crawlers are gated by robots.txt, not X-Robots-Tag, so they still read it.
        source: '/index.md',
        headers: AGENT_RESOURCE_NO_INDEX_HEADERS,
      },
      {
        source: '/llms.txt',
        headers: AGENT_RESOURCE_NO_INDEX_HEADERS,
      },
      {
        source: '/llms-full.txt',
        headers: AGENT_RESOURCE_NO_INDEX_HEADERS,
      },
      {
        source: '/.well-known/ai-agent.json',
        headers: AGENT_RESOURCE_NO_INDEX_HEADERS,
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR_SECONDS}, immutable` },
        ],
      },
      {
        source: '/screenshots/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR_SECONDS}, immutable` },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
