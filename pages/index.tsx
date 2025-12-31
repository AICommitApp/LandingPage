import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ChevronRight, Zap, Lock, Code, Star,
  Bug, FileText, HelpCircle, Play,
  Sparkles, Layers, Settings2
} from 'lucide-react';
import { Background } from '@/components/Background';

// Product Screenshot Showcase Component - Cursor-style single-focus layout
const ProductShowcase = () => {
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

const HalfStar = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="halfFill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="50%"
          className="fill-yellow-400"
          style={{ stopColor: "#facc15" }}
        />
        <stop
          offset="50%"
          className="fill-gray-600"
          style={{ stopColor: "#4b5563" }}
        />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="url(#halfFill)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface RatingProps {
  score: number;
}

const Rating = ({ score }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((starPosition) => {
          if (starPosition <= Math.floor(score)) {
            return (
              <Star
                key={starPosition}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            );
          } else if (
            starPosition === Math.ceil(score) &&
            !Number.isInteger(score)
          ) {
            return <HalfStar key={starPosition} />;
          } else {
            return (
              <Star key={starPosition} className="w-5 h-5 text-gray-600" />
            );
          }
        })}
      </div>
      <span className="text-lg font-medium">{score}/5</span>
    </div>
  );
};

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // 确保视频开始播放
    videoRef.current?.play();
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#ded14f]" />,
      title: "Smart Commit Messages",
      description:
        "Advanced diff analysis for precise, meaningful commits automatically generated based on your changes.",
    },
    {
      icon: <Code className="w-6 h-6 text-[#ded14f]" />,
      title: "Multi-Platform AI",
      description:
        "Seamless integration with OpenAI, Azure, and Google Gemini for flexible AI processing options.",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#ded14f]" />,
      title: "Privacy First",
      description:
        "Your code stays secure with local processing and encrypted communications.",
    },
  ];

  const reviews = [
    {
      text: "The plugin experience is incredibly smooth. With just one click, the commit is done - it's remarkably efficient and precise.",
      author: "dag***830, Software Engineer",
    },
    {
      text: "Excellent plugin! It's not just for commits - the code reading experience is seamless. With the recent GPT-4 integration, the overall experience has reached a new level.",
      author: "dd***ch, Software Engineer",
    },
    {
      text: "Very powerful and easy to use",
      author: "Jim Kim, Software Engineer",
    },
    {
      text: "Found that students and teachers can use it for free, thanks",
      author: "ki***us,student",
    },
  ];

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
        {/*
          SEO notes:
          - Set NEXT_PUBLIC_SITE_URL (e.g. https://your-domain.com) to enable canonical + og:url.
          - Keep title/og/twitter aligned for consistent previews.
        */}
        {(() => {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
          const pageUrl = siteUrl ? `${siteUrl}/` : undefined;
          const title = 'Still the best AI commit messages for JetBrains IDEs — AICommit';
          const description =
            'Generate precise, context‑aware commit messages in one click. Privacy‑first with local processing. Works across IntelliJ IDEA, WebStorm and more.';

          return (
            <>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
              <meta name="application-name" content="AICommit" />

              {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}

              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="AICommit" />
              {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content="/og-image.jpg" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content="/og-image.jpg" />
            </>
          );
        })()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#4a4a4a" />
        <meta
          name="google-site-verification"
          content="XYctT5gtc4q0PyFyA7mLFRlGQxCplYC5XM_SBLjdV6Y"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      <div className="relative min-h-screen text-white overflow-hidden">
        <Background />

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-[#21252f]/50 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center">
                  <Image
                    src="/favicon.svg"
                    alt="AICommit Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    priority
                  />
                </div>
                <span className="font-semibold text-lg leading-none">
                  AICommit
                </span>
              </div>
                <a
                href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[#ded14f] hover:bg-[#ded14f]/90 text-black font-medium 
                    rounded-full transition-all duration-200 hidden md:inline-block"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_install_plugin', { location: 'nav' });
                  }
                }}
                >
                Install Plugin
                </a>
            </div>
            <div className="flex items-center space-x-6 hidden md:flex">
              <a
              href="https://github.com/AICommitApp/community/blob/main/FAQ.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
              </a>
              <a
              href="https://github.com/AICommitApp/community/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
              <Bug className="w-4 h-4" />
              <span>Bug Report</span>
              </a>
              <a
              href="https://github.com/AICommitApp/community/blob/main/EULA.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
              <FileText className="w-4 h-4" />
              <span>EULA</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-20">
          {/* Hero Section */}
          <section className="pt-28 pb-8 md:pt-32 md:pb-12 px-6">
            <div className="container mx-auto text-center max-w-4xl">
              <motion.div
                {...(!shouldReduceMotion ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: 'easeOut' } } : {})}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                  Still the best AI commit messages
                  <br />
                  for JetBrains IDEs
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto">
                  Stop writing commit messages by hand. Generate precise, context‑aware messages in one click.
                  Privacy‑first with local processing. Works across IntelliJ IDEA, WebStorm and more.
                </p>
                <motion.div
                  className="mb-12 md:mb-16"
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
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    {...(!shouldReduceMotion ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, viewport: { once: true } } : {})}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                           hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Screenshots Showcase */}
          <ProductShowcase />

          {/* Reviews Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <div className="inline-flex flex-col items-center gap-4">
                  <Rating score={4.5} />
                  <p className="text-gray-400">
                    Based on 12000+ Downloads on JetBrains Marketplace
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    {...(!shouldReduceMotion ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } } : {})}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <p className="text-lg mb-4">&quot;{review.text}&quot;</p>
                    <p className="text-gray-400">— {review.author}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See AICommit in Action
        </h2>
        <motion.div
          className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
          {...(!shouldReduceMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } } : {})}
        >
          <div className="aspect-[16/9]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/og-image.jpg"
              preload="metadata"
              controls={isVideoPlaying}
              onClick={handlePlayVideo}
              playsInline
              title="AICommit commit flow demo"
              aria-label="AICommit commit flow demo video"
            >
              <source
                src="/assets/commit_vcs_window.mp4"
                type="video/mp4"
              />
            </video>
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                onClick={handlePlayVideo}
              >
                <motion.button
                  className="p-4 bg-[#ded14f] hover:bg-[#ded14f]/90 rounded-full
                           transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayVideo}
                >
                  <Play className="w-8 h-8 text-black" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>

          {/* Footer */}
          <footer className="py-8 px-6 border-t border-white/10">
            <div className="container mx-auto text-center text-gray-400 text-sm">
              <p>© 2024 AICommit. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
