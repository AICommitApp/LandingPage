import localFont from 'next/font/local';

// Fonts are colocated here (not in public/) so next/font self-hosts + fingerprints
// them (no duplicate public serving). NOTE: the build/dev scripts use `--webpack`
// because Turbopack 16.2.9 mishandles next/font/local multi-file `src` arrays
// (needed here for the 400/700 weights) and fails with a misleading
// "Font loader calls must be assigned to a const" error.
const zedSans = localFont({
  src: [
    { path: './fonts/zed/zed-sans-extended.woff2', weight: '400', style: 'normal' },
    { path: './fonts/zed/zed-sans-extendedbold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-zed-sans',
  preload: true,
});

const zedMono = localFont({
  src: [
    { path: './fonts/zed/zed-mono-extended.woff2', weight: '400', style: 'normal' },
    { path: './fonts/zed/zed-mono-extendedbold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-zed-mono',
  preload: false,
});

export { zedSans, zedMono };
