import React, { useState, useRef } from 'react';
import { m } from 'framer-motion';
import { Play } from 'lucide-react';
import { useMotionReady } from '@/lib/useMotionReady';

const springFast = { type: 'spring', stiffness: 300, damping: 30 } as const;
const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;

export const VideoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { canAnimate } = useMotionReady();

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <m.div
          className="mb-10"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            transition: springBase,
            viewport: { once: true },
          } : {})}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Watch AICommit in action
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            A quick walkthrough from staged files to a generated commit message inside a JetBrains IDE.
          </p>
        </m.div>

        <m.div
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            transition: { ...springBase, delay: 0.08 },
            viewport: { once: true },
          } : {})}
        >
          <div className="aspect-[16/9]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/og-image.jpg"
              preload="metadata"
              controls={isVideoPlaying}
              playsInline
              title="AICommit commit flow demo"
              aria-label="AICommit commit flow demo video"
            >
              <source src="/assets/commit_vcs_window.mp4" type="video/mp4" />
            </video>

            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer">
                <m.button
                  className="p-4 bg-brand rounded-full border-2 border-black/10
                             shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  whileHover={canAnimate ? { scale: 1.08 } : {}}
                  whileTap={canAnimate ? { scale: 0.94 } : {}}
                  transition={springFast}
                  onClick={handlePlayVideo}
                  aria-label="Play demo video"
                >
                  <Play className="w-8 h-8 text-black fill-black" />
                </m.button>
              </div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};
