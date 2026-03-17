import React, { useState, useEffect, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const COMMIT_MESSAGES = [
  'feat(auth): implement OAuth2 token refresh with retry logic',
  'fix(api): resolve race condition in concurrent request handler',
  'refactor(db): extract connection pooling into service layer',
  'perf(render): memoize expensive selectors with reselect',
  'chore(deps): upgrade TypeScript to 5.6 and fix type errors',
];

export const CommitPreview = () => {
  const shouldReduceMotion = useReducedMotion();
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
      className="mt-3 rounded-xl overflow-hidden border border-white/[0.09] bg-[#0e1016]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.06] bg-white/[0.015]">
        <span className="font-mono text-[10px] text-gray-600 tracking-wide">AICommit</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-50 [animation-duration:2s]" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand/70" />
          </span>
          <span className="font-mono text-[10px] text-gray-600">generating</span>
        </div>
      </div>

      {/* Commit message line — fixed height prevents layout shift when text fills */}
      <div className="px-3 py-2 font-mono text-[11px] flex items-center gap-1.5 h-[34px] overflow-hidden">
        <span className="text-brand/50 select-none shrink-0">$</span>
        <span className="text-gray-500 select-none shrink-0">git commit -m</span>
        <span className="text-gray-200 whitespace-nowrap overflow-hidden">
          &ldquo;{displayedText}
          <span className="cursor-blink inline-block w-[1px] h-[0.85em] bg-brand/80 mx-px align-middle" />
          &rdquo;
        </span>
      </div>
    </m.div>
  );
};
