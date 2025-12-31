import '@/styles/globals.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import localFont from 'next/font/local';

// Trimmed font set: only woff2 + required weights to cut unused bytes.
const zedSans = localFont({
  src: [
    { path: '../public/fonts/zed/zed-sans-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendeditalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/zed/zed-sans-extendedbold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendedbolditalic.woff2', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-zed-sans',
  preload: true,
});

const zedMono = localFont({
  src: [
    { path: '../public/fonts/zed/zed-mono-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendedbold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-zed-mono',
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${zedSans.variable} ${zedMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', metric.name, {
      value: metric.value,
      label: metric.id,
      non_interaction: true,
    });
    return;
  }
  if (process.env.NODE_ENV === 'development') {
    // Fallback logging for quick inspection without GA.
    console.log('[Web Vitals]', metric);
  }
}
