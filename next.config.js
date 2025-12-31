/** @type {import('next').NextConfig} */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  output: 'standalone',
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
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
