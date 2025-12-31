import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

export const VideoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // Ensure video starts playing
    videoRef.current?.play();
  };

  return (
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
  );
};


