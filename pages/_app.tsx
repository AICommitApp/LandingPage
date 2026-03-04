import '@/styles/globals.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { LazyMotion } from 'framer-motion';
import { zedSans, zedMono } from '@/lib/fonts';

// Load animation features asynchronously so they don't block the initial render.
// The ~16 kB domAnimation chunk is deferred until after first paint.
const loadMotionFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LazyMotion features={loadMotionFeatures}>
      <div className={`${zedSans.variable} ${zedMono.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </LazyMotion>
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
