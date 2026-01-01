import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pt-28 pb-8 md:pt-32 md:pb-12 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Still the best AI commit messages
            <br />
            for JetBrains IDEs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto">
            Save 30+ minutes daily writing commit messages. Generate precise, context‑aware messages in one click.
            Privacy‑first with local processing. Trusted by 19,000+ developers worldwide.
          </p>
          <motion.div
            className="mb-12 md:mb-16 inline-block"
            {...(!shouldReduceMotion ? { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } } : {})}
          >
            <a
              href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#ded14f] hover:bg-[#ded14f]/90 
                      text-black font-semibold rounded-lg gap-2 transition-colors duration-200"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click_install_plugin', { location: 'hero' });
                }
              }}
            >
              Install Plugin
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
