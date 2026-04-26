import React from 'react';
import { m } from 'framer-motion';
import { HOME_FAQ } from '@/lib/seo';
import { useMotionReady } from '@/lib/useMotionReady';

const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;

export const CompatibilityFaq = () => {
  const { canAnimate } = useMotionReady();

  return (
    <section id="compatibility-faq" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <m.div
          className="max-w-3xl mb-10"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: springBase,
            viewport: { once: true },
          } : {})}
        >
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-brand/70 mb-3">
            Compatibility & onboarding
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            What developers ask before installing
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-4 leading-relaxed">
            The essentials for JetBrains compatibility, model support, privacy, local-only
            workflows, onboarding, and current Marketplace licensing.
          </p>
        </m.div>

        <div className="grid gap-4 md:grid-cols-2">
          {HOME_FAQ.map((item, index) => (
            <m.article
              key={item.question}
              {...(canAnimate ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { ...springBase, delay: index * 0.06 },
                viewport: { once: true, margin: '-40px' },
              } : {})}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {item.question}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-300">
                {item.answer}
              </p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};
