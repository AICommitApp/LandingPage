import React from 'react';
import { HOME_FAQ } from '@/lib/seo';

export const CompatibilityFaq = () => {
  return (
    <section id="compatibility-faq" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mb-10">
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
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {HOME_FAQ.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {item.question}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-300">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
