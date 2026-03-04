/** @type {import('next').NextConfig} */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  // Keep Next.js scoped to this project instead of the parent dir to avoid
  // dev-server restarts and hot-update 404s when other lockfiles exist.
  outputFileTracingRoot: __dirname,
  experimental: {
    // Tree-shake icon packages so only imported icons are bundled.
    optimizePackageImports: ['lucide-react', '@icons-pack/react-simple-icons'],
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR_SECONDS}, immutable` },
        ],
      },
      {
        source: '/fonts/:path*',
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
