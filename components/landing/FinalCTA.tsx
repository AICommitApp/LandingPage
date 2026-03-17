import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ChevronRight, Terminal } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { DOWNLOAD_COUNT } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

const springFast = { type: 'spring', stiffness: 300, damping: 30 } as const;
const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;

export const FinalCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-6">
      <m.div
        className="container mx-auto max-w-4xl"
        {...(!shouldReduceMotion ? {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: springBase,
          viewport: { once: true },
        } : {})}
      >
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent" />
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm" />

          <div className="relative p-8 md:p-12 border border-white/10 rounded-3xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* Left — text content */}
              <div className="flex-1">
                <m.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-brand/15 border border-brand/25 text-brand text-xs font-medium mb-5"
                  {...(!shouldReduceMotion ? {
                    initial: { scale: 0.9, opacity: 0 },
                    whileInView: { scale: 1, opacity: 1 },
                    transition: { ...springFast, delay: 0.1 },
                    viewport: { once: true },
                  } : {})}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Free to start
                </m.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Stop writing commit
                  <br />
                  messages manually.
                </h2>
                <p className="text-gray-400 text-base max-w-md">
                  <AnimatedCounter
                    value={DOWNLOAD_COUNT}
                    format={(n) => n.toLocaleString() + '+'}
                    fallback="20,626+"
                    triggerOnView
                  />
                  {' '}downloads on JetBrains Marketplace. Commit faster without the mental overhead.
                </p>
              </div>

              {/* Right — CTA */}
              <div className="flex-shrink-0">
                <m.a
                  href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center px-7 py-3.5 bg-brand hover:bg-brand/90
                           text-black font-semibold rounded-lg gap-2 transition-colors duration-200
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  transition={springFast}
                  onClick={() => trackEvent('click_install_plugin', { location: 'final_cta' })}
                >
                  Install for Free
                  <ChevronRight className="w-4 h-4" />
                </m.a>
              </div>

            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
};
