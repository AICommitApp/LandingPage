import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Background } from '@/components/Background';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { Reviews } from '@/components/landing/Reviews';
import { VideoSection } from '@/components/landing/VideoSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { CompatibilityFaq } from '@/components/landing/CompatibilityFaq';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  HOME_URL,
  OG_IMAGE_URL,
  SITE_NAME,
  homeStructuredData,
} from '@/lib/seo';

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
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="application-name" content={SITE_NAME} />
        <link rel="canonical" href={HOME_URL} />
        <link rel="alternate" type="text/plain" title="AICommit for LLMs" href={`${HOME_URL}llms.txt`} />
        <link rel="alternate" type="text/markdown" title="AICommit Markdown Snapshot" href={`${HOME_URL}index.md`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={HOME_URL} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:alt" content="AICommit landing page preview" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#21252f" />
        <meta
          name="google-site-verification"
          content="XYctT5gtc4q0PyFyA7mLFRlGQxCplYC5XM_SBLjdV6Y"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
        />
      </Head>

      <div className="relative min-h-dvh text-white overflow-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-brand focus:text-black focus:font-semibold focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Background />

        <Header />

        <main id="main-content" className="relative z-20">
          <Hero />
          <ProductShowcase />
          <Features />
          <Reviews />
          <VideoSection />
          <CompatibilityFaq />
          <FinalCTA />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
