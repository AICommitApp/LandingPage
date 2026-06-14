// ESLint flat config (ESLint 9 / Next 16 — `next lint` was removed).
// eslint-config-next/core-web-vitals ships a native flat-config array.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'out/**', '.open-next/**', '.wrangler/**', 'build/**', 'dist/**'] },
  ...nextCoreWebVitals,
  {
    // react-hooks v6 (bundled in eslint-config-next 16) is much stricter than before.
    // These two rules flag intentional, known-safe patterns in this codebase — the
    // hydration-ready flag (useMotionReady), the latest-value ref (AnimatedCounter), and
    // framer-motion animation loops. Adopt them as warnings for now rather than refactoring
    // working animation code as part of a dependency upgrade; revisit in a focused pass.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
];

export default config;
