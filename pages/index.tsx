import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Zap, Lock, Code, Star,
  Bug, FileText, HelpCircle, Play
} from 'lucide-react';
import { Background } from '@/components/Background';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // 确保视频开始播放
    videoRef.current?.play();
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
        <title>AICommit</title>
        <meta
          name="description"
          content="AI-powered programming assistant for JetBrains IDEs!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#4a4a4a" />
        <meta property="og:title" content="Automates your commit by AI!" />
        <meta
          name="google-site-verification"
          content="XYctT5gtc4q0PyFyA7mLFRlGQxCplYC5XM_SBLjdV6Y"
        />
        <meta
          property="og:description"
          content="AI-powered programming assistant for JetBrains IDEs!"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>

      <div className="relative min-h-screen text-white overflow-hidden">
        {/* Rest of your existing JSX code remains the same */}
        <style jsx global>{`
          .noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.05;
            pointer-events: none;
          }
        `}</style>

        <Background />

        {/* Mouse follow effect */}
        <div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            background:
              mousePosition.x > 0 || mousePosition.y > 0
                ? `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(222, 209, 79, 0.05), transparent 75%)`
                : "none",
          }}
        />

        {/* Noise texture overlay */}
        <div className="fixed inset-0 noise" />

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
                    unoptimized
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
                      rounded-full transition-all duration-200"
              >
                Install Plugin
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#faq"
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
          <section className="pt-32 pb-20 px-6">
            <div className="container mx-auto text-center max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                  Your AI companion for
                  <br />
                  better commits
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                  Transform your development workflow with intelligent commit
                  messages, code optimization, and documentation generation.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-[#ded14f] hover:bg-[#ded14f]/90 
                            text-black font-semibold rounded-lg gap-2 transition-colors duration-200"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="aspect-w-16 aspect-h-9">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/api/placeholder/1920/1080"
              controls={isVideoPlaying}
              onClick={handlePlayVideo}
              playsInline
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
