import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { LazyMotion } from 'framer-motion';
import { zedSans, zedMono } from '@/lib/fonts';

// Load animation features asynchronously so they don't block the initial render.
// The ~16 kB domAnimation chunk is deferred until after first paint.
const loadMotionFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(
      '%c AICommit ',
      'background: #ded14f; color: #0e1016; font-size: 20px; font-weight: bold; font-family: monospace; padding: 4px 10px; border-radius: 4px;'
    );
    console.log(
      '%cStill the best AI commit messages for JetBrains IDEs.',
      'color: #6b7280; font-size: 12px; font-family: monospace;'
    );
    console.log(
      '%c→ github.com/AICommitApp/community',
      'color: #ded14f; font-size: 11px; font-family: monospace;'
    );
  }, []);

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
