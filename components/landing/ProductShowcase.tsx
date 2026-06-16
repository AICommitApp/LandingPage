import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Sparkles, Layers, Settings2 } from 'lucide-react';
import { useMotionReady } from '@/lib/useMotionReady';

export const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const { canAnimate, shouldReduceMotion } = useMotionReady();
  const firstRenderRef = useRef(true);
  
  const screenshots = [
    {
      src: '/screenshots/s_0_action_icon.webp',
      alt: 'AICommit action button in JetBrains IDE commit panel',
      title: 'One-Click Generation',
      description: 'Generate commit messages instantly from the VCS commit panel with a single click',
      icon: <Sparkles className="w-5 h-5 text-brand" />
    },
    {
      src: '/screenshots/s_1_commit_panel.webp',
      alt: 'AICommit panel showing provider switch, prompt templates, and history',
      title: 'Prompt Lab & Provider Switch',
      description: 'Pick provider/model, apply prompt templates, and review generation history in one place',
      icon: <Settings2 className="w-5 h-5 text-brand" />
    },
    {
      src: '/screenshots/s_2_template.webp',
      alt: 'AICommit template dropdown with multiple preset options',
      title: 'Custom Templates',
      description: 'Use built-in templates or create your own for Conventional Commits, Release Notes & more',
      icon: <Layers className="w-5 h-5 text-brand" />
    }
  ];

  // Lazy-load images as they become active
  useEffect(() => {
    setLoaded((prev) => { const next = new Set(prev); next.add(activeIndex); return next; });
  }, [activeIndex]);

  // Auto-rotate through screenshots
  useEffect(() => {
    // Ensure autoplay is running right after mount (some browsers report hover state late)
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      setIsPaused(false);
    }

    if (shouldReduceMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPaused, screenshots.length]);

  return (
    <section id="showcase" className="py-20 lg:py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <m.div
          className="text-center mb-12 lg:mb-20"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { type: 'spring', stiffness: 80, damping: 20 },
            viewport: { once: true }
          } : {})}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight text-balance">
            Built into your JetBrains workflow
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto text-pretty">
            Generate precise commit messages without leaving your editor.
            Works wherever you commit — VCS panel, terminal, or Git integration.
          </p>
        </m.div>

        {/* Desktop: Feature tabs + large screenshot */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Feature tabs */}
          <div className="col-span-4 space-y-3" role="tablist" aria-label="Product features">
            {screenshots.map((screenshot, index) => (
              <m.button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`showcase-panel-${index}`}
                id={`showcase-tab-${index}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`w-full text-left p-5 rounded-2xl border transition duration-300 group ${
                  activeIndex === index
                    ? 'bg-white/10 border-brand/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
                {...(canAnimate
                  ? {
                      initial: { opacity: 0, x: -16 },
                      whileInView: { opacity: 1, x: 0 },
                      transition: { type: 'spring', stiffness: 80, damping: 20, delay: index * 0.08 },
                      viewport: { once: true },
                    }
                  : {})}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl transition duration-300 ${
                    activeIndex === index
                      ? 'bg-brand/20 border border-brand/30'
                      : 'bg-white/10 border border-white/10 group-hover:bg-white/15'
                  }`}>
                    {screenshot.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {screenshot.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      activeIndex === index ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {screenshot.description}
                    </p>
                  </div>
                </div>
                {/* Progress bar for active item (keep space to avoid hover jitter) */}
                <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <m.div
                    key={`${activeIndex}-${isPaused}`}
                    className={`h-full bg-brand ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    initial={{ width: '0%' }}
                    animate={{ width: activeIndex === index && !isPaused ? '100%' : '0%' }}
                    transition={{
                      duration: activeIndex === index && !isPaused ? 4 : 0.2,
                      ease: 'linear',
                    }}
                  />
                </div>
              </m.button>
            ))}
          </div>

          {/* Right: Large screenshot display */}
          <div
            className="col-span-8 relative"
            role="tabpanel"
            id={`showcase-panel-${activeIndex}`}
            aria-labelledby={`showcase-tab-${activeIndex}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <m.div
              className="relative"
              {...(canAnimate ? {
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1 },
                transition: { type: 'spring', stiffness: 80, damping: 20 },
                viewport: { once: true }
              } : {})}
            >
              {/* Glow effect behind screenshot */}
              <div className="absolute -inset-4 bg-linear-to-r from-brand/20 via-brand/10 to-transparent rounded-3xl blur-2xl opacity-60" />

              {/* Window frame decoration (clean, no title bar) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141b] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-16/10 overflow-hidden">
                  {screenshots.map((screenshot, index) => (
                    <m.div
                      key={index}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        scale: activeIndex === index ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      {loaded.has(index) ? (
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#12141b]" />
                      )}
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* Mobile/Tablet: Swipeable cards */}
        <div className="lg:hidden space-y-6">
          {/* Mobile screenshot display */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141b] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
            role="tabpanel"
            id={`showcase-panel-mobile-${activeIndex}`}
            aria-labelledby={`showcase-tab-mobile-${activeIndex}`}
          >
            <div className="relative aspect-4/3">
              {screenshots.map((screenshot, index) => (
                <m.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </m.div>
              ))}
            </div>
          </div>

          {/* Mobile feature tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Product features">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`showcase-panel-mobile-${index}`}
                id={`showcase-tab-mobile-${index}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition duration-300 ${
                  activeIndex === index
                    ? 'bg-brand/20 border-brand/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                {screenshot.icon}
                <span className="text-sm font-medium whitespace-nowrap">{screenshot.title}</span>
              </button>
            ))}
          </div>

          {/* Mobile description */}
          <p className="text-center text-gray-400 text-sm px-4">
            {screenshots[activeIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
};
