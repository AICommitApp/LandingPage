import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | null;
  format: (n: number) => string;
  fallback: string;
  className?: string;
  /** Delay start until element scrolls into view */
  triggerOnView?: boolean;
}

export const AnimatedCounter = ({
  value,
  format,
  fallback,
  className,
  triggerOnView = false,
}: AnimatedCounterProps) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(fallback);
  const hasAnimated = useRef(false);
  const formatRef = useRef(format);
  formatRef.current = format;

  const shouldAnimate = triggerOnView ? isInView : true;

  useEffect(() => {
    if (value === null || !shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    if (shouldReduceMotion) {
      setDisplay(formatRef.current(value));
      return;
    }

    const from = Math.round(value * 0.88);
    const controls = animate(from, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(formatRef.current(Math.round(v))),
    });

    return () => controls.stop();
  }, [value, shouldAnimate, shouldReduceMotion]);

  // tabular-nums keeps every digit the same width so animating the value doesn't
  // shift any text that follows it inline.
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`} suppressHydrationWarning>
      {display}
    </span>
  );
};
