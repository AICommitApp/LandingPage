import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useMotionReady() {
  const shouldReduceMotion = useReducedMotion();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return {
    shouldReduceMotion,
    canAnimate: hasHydrated && !shouldReduceMotion,
  };
}
