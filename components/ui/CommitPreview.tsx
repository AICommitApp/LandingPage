import React, { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useMotionReady } from '@/lib/useMotionReady';

const COMMIT_MESSAGES = [
  'feat(auth): implement OAuth2 token refresh with retry logic',
  'fix(api): resolve race condition in concurrent request handler',
  'refactor(db): extract connection pooling into service layer',
  'perf(render): memoize expensive selectors with reselect',
  'chore(deps): upgrade TypeScript to 5.6 and fix type errors',
];

export const CommitPreview = () => {
  const { canAnimate, shouldReduceMotion } = useMotionReady();
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(COMMIT_MESSAGES[0]);
      return;
    }

    const msg = COMMIT_MESSAGES[msgIndex];
    const clear = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    if (phase === 'typing') {
      if (displayedText.length < msg.length) {
        timerRef.current = setTimeout(() => {
          setDisplayedText(msg.slice(0, displayedText.length + 1));
        }, 26);
      } else {
        timerRef.current = setTimeout(() => setPhase('pause'), 2400);
      }
    } else if (phase === 'pause') {
      timerRef.current = setTimeout(() => setPhase('erasing'), 100);
    } else {
      if (displayedText.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 13);
      } else {
        setMsgIndex((i) => (i + 1) % COMMIT_MESSAGES.length);
        setPhase('typing');
      }
    }

    return clear;
  }, [displayedText, phase, msgIndex, shouldReduceMotion]);

  return (
    <m.div
      className="mt-3 rounded-xl overflow-hidden border border-white/9 bg-[#0e1016]"
      {...(canAnimate
        ? {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.55, duration: 0.4, ease: [0.25, 1, 0.5, 1] },
          }
        : {})}
    >
      {/* IDE tool window chrome — mimics JetBrains VCS panel header */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/6 bg-white/1.5">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white/6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
          <span className="font-mono text-[10px] text-gray-400 tracking-wide">Commit</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-50 [animation-duration:2s]" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand/70" />
          </span>
          <span className="font-mono text-[10px] text-gray-600">generating</span>
        </div>
      </div>

      {/* Commit message input area — mimics IDE message field */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-500 font-medium">Commit Message</span>
          <div className="flex items-center gap-1 text-brand/60">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px]">AI</span>
          </div>
        </div>

        {/* Fake text area */}
        <div className="relative rounded-md border border-white/8 bg-white/3 px-3 py-2 min-h-[32px]">
          <span className="text-gray-200 text-[11px] font-mono leading-relaxed">
            {displayedText}
            <span className="cursor-blink inline-block w-px h-[0.85em] bg-brand/80 mx-px align-middle" />
          </span>
        </div>
      </div>
    </m.div>
  );
};
