import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

export const FinalCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-6">
      <motion.div
        className="container mx-auto max-w-4xl"
        {...(!shouldReduceMotion
          ? {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
            }
          : {})}
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ded14f]/20 via-[#ded14f]/10 to-transparent" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          <div className="relative p-8 md:p-12 text-center border border-white/10 rounded-3xl">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ded14f]/20 border border-[#ded14f]/30 text-[#ded14f] text-sm font-medium mb-6"
              {...(!shouldReduceMotion
                ? {
                    initial: { scale: 0.9, opacity: 0 },
                    whileInView: { scale: 1, opacity: 1 },
                    viewport: { once: true },
                  }
                : {})}
            >
              <Zap className="w-4 h-4" />
              Start saving time today
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Ready to Transform Your
              <br />
              Commit Workflow?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join 19,000+ developers who save 30+ minutes daily with AI-powered commits
            </p>

            <motion.div
              className="inline-block"
              {...(!shouldReduceMotion
                ? { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }
                : {})}
            >
              <a
                href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#ded14f] hover:bg-[#ded14f]/90 
                         text-black font-semibold rounded-lg gap-2 transition-colors duration-200"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_install_plugin', {
                      location: 'final_cta',
                    });
                  }
                }}
              >
                Install Plugin for Free
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <p className="text-sm text-gray-500 mt-4">
              Free to start
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

