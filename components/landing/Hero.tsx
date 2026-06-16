import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { ChevronRight, Download, RefreshCw } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CommitPreview } from '@/components/ui/CommitPreview';
import { DOWNLOAD_COUNT } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { MARKETPLACE_URL } from '@/lib/seo';
import { useMotionReady } from '@/lib/useMotionReady';

const formatHeroDownloads = (n: number) => n.toLocaleString() + '+';

const springFast = { type: 'spring', stiffness: 300, damping: 30 } as const;
const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;

export const Hero = () => {
  const { canAnimate, shouldReduceMotion } = useMotionReady();

  const transition = (delay = 0) =>
    shouldReduceMotion ? {} : { ...springBase, delay };

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left — Content */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
            <m.div
              {...(canAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: transition(0),
              } : {})}
            >
              <p className="text-xs font-mono uppercase tracking-[0.32em] text-brand/70 mb-4">
                JetBrains Marketplace plugin
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
                AI commit message generator for{' '}
                <span className="text-brand whitespace-nowrap">JetBrains IDEs</span>
              </h1>
            </m.div>

            <m.p
              className="text-base sm:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed text-pretty"
              {...(canAnimate ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: transition(0.1),
              } : {})}
            >
              Generate AI commit messages in one click for IntelliJ IDEA, WebStorm,
              and other JetBrains IDEs. Works with OpenAI, Azure OpenAI, Gemini,
              Claude, and Ollama with privacy-first provider controls.
            </m.p>

            <m.div
              {...(canAnimate ? {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: transition(0.18),
              } : {})}
            >
              <m.a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center px-7 py-3.5 bg-brand hover:bg-brand/90
                         text-black font-semibold rounded-lg gap-2 transition-colors duration-200"
                whileHover={canAnimate ? { scale: 1.03 } : {}}
                whileTap={canAnimate ? { scale: 0.97 } : {}}
                transition={springFast}
                onClick={() => trackEvent('click_install_plugin', { location: 'hero' })}
              >
                Install Plugin
                <ChevronRight className="w-4 h-4" />
              </m.a>
            </m.div>

            {/* Social proof stats */}
            <m.div
              className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10"
              {...(canAnimate ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: transition(0.28),
              } : {})}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Download className="w-4 h-4 text-brand" />
                <span>
                  <strong className="text-white font-semibold">
                    <AnimatedCounter
                      value={DOWNLOAD_COUNT}
                      format={formatHeroDownloads}
                      fallback="21,712+"
                    />
                  </strong>{' '}
                  Marketplace installs
                </span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw className="w-4 h-4 text-brand" />
                <span><strong className="text-white font-semibold">58%</strong> renewal rate</span>
              </div>
            </m.div>
          </div>

          {/* Right — Product screenshot */}
          <m.div
            className="lg:col-span-6 xl:col-span-5 relative"
            {...(canAnimate ? {
              initial: { opacity: 0, x: 32, scale: 0.97 },
              animate: { opacity: 1, x: 0, scale: 1 },
              transition: { ...springBase, delay: 0.12 },
            } : {})}
          >
            {/* Ambient glow behind screenshot */}
            <div className="absolute -inset-6 bg-linear-to-br from-brand/15 to-transparent rounded-3xl blur-3xl opacity-70 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141b] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
              {/* Fake IDE window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/4 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="relative aspect-16/11 overflow-hidden">
                <Image
                  src="/screenshots/s_0_action_icon.webp"
                  alt="AICommit one-click generation button in JetBrains IDE VCS panel"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <CommitPreview />
          </m.div>

        </div>
      </div>
    </section>
  );
};
