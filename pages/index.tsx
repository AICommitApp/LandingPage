import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { Background } from '@/components/Background';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

const ProductShowcase = dynamic(
  () => import('@/components/landing/ProductShowcase').then((mod) => mod.ProductShowcase),
  {
    ssr: false,
    loading: () => <SectionFallback title="Product showcase is loading…" />,
  }
);

const Reviews = dynamic(
  () => import('@/components/landing/Reviews').then((mod) => mod.Reviews),
  {
    ssr: false,
    loading: () => <SectionFallback title="Reviews are loading…" />,
  }
);

const VideoSection = dynamic(
  () => import('@/components/landing/VideoSection').then((mod) => mod.VideoSection),
  {
    ssr: false,
    loading: () => <SectionFallback title="Video is loading…" />,
  }
);

const FinalCTA = dynamic(
  () => import('@/components/landing/FinalCTA').then((mod) => mod.FinalCTA),
  {
    ssr: false,
    loading: () => <SectionFallback title="CTA is loading…" />,
  }
);

const Footer = dynamic(() => import('@/components/landing/Footer').then((mod) => mod.Footer), {
  ssr: false,
  loading: () => <SectionFallback title="Footer is loading…" />,
});

const SectionFallback = ({ title }: { title: string }) => (
  <section className="py-16 px-6">
    <div className="container mx-auto max-w-6xl">
      <div className="h-40 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 text-sm">
        {title}
      </div>
    </div>
  </section>
);

const LandingPage = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HEJVZLQ4GV"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-HEJVZLQ4GV');
        `}
      </Script>
      <Head>
        {/*
          SEO notes:
          - Set NEXT_PUBLIC_SITE_URL (e.g. https://your-domain.com) to enable canonical + og:url.
          - Keep title/og/twitter aligned for consistent previews.
        */}
        {(() => {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
          const pageUrl = siteUrl ? `${siteUrl}/` : undefined;
          const title = 'Still the best AI commit messages for JetBrains IDEs — AICommit';
          const description =
            'Save 30+ minutes daily with AI-powered commit messages. Trusted by 19,000+ developers. One-click generation with privacy-first local processing. Works with IntelliJ IDEA, WebStorm & more.';

          return (
            <>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
              <meta name="application-name" content="AICommit" />

              {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}

              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="AICommit" />
              {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content="/og-image.jpg" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content="/og-image.jpg" />
            </>
          );
        })()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#4a4a4a" />
        <meta
          name="google-site-verification"
          content="XYctT5gtc4q0PyFyA7mLFRlGQxCplYC5XM_SBLjdV6Y"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      <div className="relative min-h-screen text-white overflow-hidden">
        <Background />

        <Header />

        <main className="relative z-20">
          <Hero />
          <ProductShowcase />
          <Features />
          <Reviews />
          <VideoSection />
          <FinalCTA />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
