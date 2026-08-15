import React from 'react';
import { Background } from '@/components/Background';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FinalCTA } from '@/components/landing/FinalCTA';

type SiteChromeProps = {
  children: React.ReactNode;
  showFinalCta?: boolean;
};

export const SiteChrome = ({ children, showFinalCta = true }: SiteChromeProps) => {
  return (
    <div className="relative min-h-dvh overflow-hidden text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-brand focus:text-black focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Background />
      <Header />

      <main id="main-content" className="relative z-20">
        {children}
        {showFinalCta ? <FinalCTA /> : null}
        <Footer />
      </main>
    </div>
  );
};
