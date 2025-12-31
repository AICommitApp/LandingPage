import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Layers, Settings2 } from 'lucide-react';

export const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const screenshots = [
    {
      src: '/screenshots/s_0_action_icon.png',
      alt: 'AICommit action button in JetBrains IDE commit panel',
      title: 'One-Click Generation',
      description: 'Generate commit messages instantly from the VCS commit panel with a single click',
      icon: <Sparkles className="w-5 h-5 text-[#ded14f]" />
    },
    {
      src: '/screenshots/s_1_commit_panel.png',
      alt: 'AICommit panel showing provider switch, prompt templates, and history',
      title: 'Prompt Lab & Provider Switch',
      description: 'Pick provider/model, apply prompt templates, and review generation history in one place',
      icon: <Settings2 className="w-5 h-5 text-[#ded14f]" />
    },
    {
      src: '/screenshots/s_2_template.png',
      alt: 'AICommit template dropdown with multiple preset options',
      title: 'Custom Templates',
      description: 'Use built-in templates or create your own for Conventional Commits, Release Notes & more',
      icon: <Layers className="w-5 h-5 text-[#ded14f]" />
    }
  ];

  // Auto-rotate through screenshots
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPaused, screenshots.length]);

  return (
    <section className="py-20 lg:py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
          {...(!shouldReduceMotion ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true }
          } : {})}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Designed for Developer Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Seamlessly integrated into your JetBrains IDE workflow. 
            Generate precise commit messages without leaving your editor.
          </p>
        </motion.div>

        {/* Desktop: Feature tabs + large screenshot */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Feature tabs */}
          <div className="col-span-4 space-y-3">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                  activeIndex === index
                    ? 'bg-white/10 border-[#ded14f]/50 shadow-[0_0_30px_-10px_rgba(222,209,79,0.3)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
                {...(!shouldReduceMotion ? {
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { delay: index * 0.1 },
                  viewport: { once: true }
                } : {})}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-[#ded14f]/20 border border-[#ded14f]/30'
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
                      activeIndex === index ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {screenshot.description}
                    </p>
                  </div>
                </div>
                {/* Progress bar for active item */}
                {activeIndex === index && !isPaused && (
                  <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#ded14f]"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, ease: 'linear' }}
                      key={activeIndex}
                    />
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: Large screenshot display */}
          <div 
            className="col-span-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="relative"
              {...(!shouldReduceMotion ? {
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true }
              } : {})}
            >
              {/* Glow effect behind screenshot */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ded14f]/20 via-[#ded14f]/10 to-transparent rounded-3xl blur-2xl opacity-60" />
              
              {/* Window frame decoration (clean, no title bar) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141b] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        scale: activeIndex === index ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet: Swipeable cards */}
        <div className="lg:hidden space-y-6">
          {/* Mobile screenshot display */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12141b] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3]">
              {screenshots.map((screenshot, index) => (
                <motion.div
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
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile feature tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-[#ded14f]/20 border-[#ded14f]/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400'
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


