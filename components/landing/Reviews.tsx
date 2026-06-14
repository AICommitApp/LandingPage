import React from 'react';
import { m } from 'framer-motion';
import { Star } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Rating } from '@/components/ui/Rating';
import { DOWNLOAD_COUNT, MARKETPLACE_RATING, MARKETPLACE_RATING_COUNT } from '@/lib/constants';
import { MARKETPLACE_REVIEWS_URL } from '@/lib/seo';
import { useMotionReady } from '@/lib/useMotionReady';

const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;

const formatDownloadsText = (n: number) => n.toLocaleString() + '+';
const formatDownloadsStat = (n: number) => `${Math.round(n / 1000)}k+`;

const reviews = [
  {
    text: "The plugin experience is incredibly smooth. With just one click, the commit is done — remarkably efficient and precise.",
    author: "dag***830",
    role: "Software Engineer",
    stars: 5,
  },
  {
    text: "Excellent plugin! With the recent GPT-4 integration, the overall experience has reached a new level. Highly recommended.",
    author: "dd***ch",
    role: "Software Engineer",
    stars: 5,
  },
  {
    text: "Very powerful and easy to use. Saves me from thinking about commit messages every single day.",
    author: "Jim Kim",
    role: "Software Engineer",
    stars: 5,
  },
  {
    text: "Found that students and teachers can use it for free — huge win for the learning community. Thank you!",
    author: "ki***us",
    role: "Student",
    stars: 4,
  },
];

export const Reviews = () => {
  const { canAnimate } = useMotionReady();

  return (
    <section id="reviews" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <m.div
          className="mb-14"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: springBase,
            viewport: { once: true },
          } : {})}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.28em] text-brand/70">
                Customer feedback
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-3">
                Feedback from AICommit users
              </h2>
              <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl leading-relaxed">
                <AnimatedCounter
                  value={DOWNLOAD_COUNT}
                  format={formatDownloadsText}
                  fallback="21,712+"
                  triggerOnView
                />
                {' '}JetBrains Marketplace installs and a steady stream of user reviews, bug reports,
                and onboarding feedback from the IDE workflow itself.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
                <Rating score={MARKETPLACE_RATING} />
                <a
                  href={MARKETPLACE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brand transition-colors"
                >
                  {MARKETPLACE_RATING_COUNT} ratings on JetBrains Marketplace
                </a>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-brand tabular-nums">58%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Renewal rate</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-brand tabular-nums">
                    <AnimatedCounter
                      value={DOWNLOAD_COUNT}
                      format={formatDownloadsStat}
                      fallback="22k+"
                      triggerOnView
                    />
                  </div>
                  <span className="relative flex h-1.5 w-1.5 mb-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 [animation-duration:3s]" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Marketplace installs</div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Review cards — 2-col grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {reviews.map((review, index) => (
            <m.div
              key={index}
              {...(canAnimate ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { ...springBase, delay: index * 0.07 },
                viewport: { once: true },
              } : {})}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.stars ? 'text-brand fill-brand' : 'text-white/15'}`}
                  />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-5 text-gray-200">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-gray-300">
                  {review.author[0].toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">{review.author}</span>
                  <span className="text-sm text-gray-400"> · {review.role}</span>
                </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
};
