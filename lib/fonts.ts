import localFont from 'next/font/local';

export const zedSans = localFont({
  src: [
    { path: '../public/fonts/zed/zed-sans-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendedbold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-zed-sans',
  preload: true,
});

export const zedMono = localFont({
  src: [
    { path: '../public/fonts/zed/zed-mono-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendedbold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-zed-mono',
  preload: false,
});
