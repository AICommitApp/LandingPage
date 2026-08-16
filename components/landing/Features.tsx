import React from 'react';
import { m } from 'framer-motion';
import { Zap, Lock } from 'lucide-react';
import Azure from '@lobehub/icons/es/Azure/components/Mono';
import Claude from '@lobehub/icons/es/Claude/components/Mono';
import DeepSeek from '@lobehub/icons/es/DeepSeek/components/Mono';
import Gemini from '@lobehub/icons/es/Gemini/components/Mono';
import Ollama from '@lobehub/icons/es/Ollama/components/Mono';
import OpenAI from '@lobehub/icons/es/OpenAI/components/Mono';
import { useMotionReady } from '@/lib/useMotionReady';

const springBase = { type: 'spring', stiffness: 80, damping: 20 } as const;
const springSnappy = { type: 'spring', stiffness: 400, damping: 28 } as const;

const providerCardVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.04, y: -2 },
};

const providerIconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 12, scale: 1.2 },
};

// ── Provider icons ─────────────────────────────────────────────────────────
// Brand marks from @lobehub/icons (MIT). Mono variants inherit currentColor so
// they stay on the existing dark-chip + Commit Yellow treatment.
// Import Mono subpaths only: the package default export also attaches Avatar /
// Combine, which pull @lobehub/ui and antd-style into the client bundle.

const providers = [
  { name: 'OpenAI',   Icon: OpenAI },
  { name: 'Azure',    Icon: Azure },
  { name: 'Gemini',   Icon: Gemini },
  { name: 'Claude',   Icon: Claude },
  { name: 'DeepSeek', Icon: DeepSeek },
  { name: 'Ollama',   Icon: Ollama },
];

// ── Feature data ───────────────────────────────────────────────────────────

const features = [
  {
    icon: Zap,
    label: 'Smart Generation',
    title: 'One click. Done.',
    description:
      'Advanced AI analysis reads your staged diff and produces professional, meaningful commit messages in under two seconds. No more staring at a blank field.',
    align: 'left',
    visual: 'icon',
  },
  {
    icon: null,
    label: 'Multi-Platform AI',
    title: 'Your model, your rules.',
    description:
      'Works with OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, DeepSeek, and Ollama — including local models. Switch providers without touching a config file.',
    align: 'right',
    visual: 'providers',
  },
  {
    icon: Lock,
    label: 'Privacy First',
    title: 'You control where your code goes.',
    description:
      "AICommit never collects or logs your code or commit messages. For cloud generation, your staged diff is sent only to the provider you configure — or keep everything on your machine with Ollama. Built for teams that can't compromise on data security.",
    align: 'left',
    visual: 'icon',
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────

export const Features = () => {
  const { canAnimate } = useMotionReady();

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <m.div
          className="max-w-3xl mb-12"
          {...(canAnimate ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: springBase,
            viewport: { once: true },
          } : {})}
        >
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-brand/70 mb-3">
            Why developers choose AICommit
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
            AI commit messages, native to your JetBrains workflow
          </h2>
        </m.div>
        <div className="divide-y divide-white/6">
          {features.map((feature, index) => {
            const isRight = feature.align === 'right';

            return (
              <m.div
                key={index}
                className="py-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                {...(canAnimate ? {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { ...springBase, delay: 0.05 },
                  viewport: { once: true, margin: '-60px' },
                } : {})}
              >
                {/* ── Visual side ── */}
                <div className={`flex items-center justify-center ${isRight ? 'md:order-last' : ''}`}>
                  {feature.visual === 'providers' ? (
                    <div className="w-full max-w-[300px]">
                      <div className="grid grid-cols-2 gap-3">
                        {providers.map(({ name, Icon }) => (
                          <m.div
                            key={name}
                            className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                                       bg-white/4 border border-white/8
                                       shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                                       cursor-default transition-colors duration-200
                            hover:bg-brand/6 hover:border-brand/20"
                            variants={providerCardVariants}
                            initial="rest"
                            whileHover={canAnimate ? 'hover' : {}}
                            transition={springSnappy}
                          >
                            <m.span
                              className="text-brand/70 shrink-0"
                              variants={providerIconVariants}
                              transition={springSnappy}
                            >
                              <Icon size={20} aria-hidden="true" />
                            </m.span>
                            <span className="text-sm font-medium text-gray-300">{name}</span>
                          </m.div>
                        ))}
                      </div>
                      <p className="text-center text-xs text-gray-400 mt-3">+ custom API endpoints</p>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                      <div className="absolute inset-0 rounded-3xl bg-white/3 border border-white/[0.07]" />
                      <div className="absolute inset-8 rounded-2xl border border-brand/10" />
                      <div className="relative flex flex-col items-center gap-4">
                        <div className="p-5 rounded-2xl bg-brand/10 border border-brand/20">
                          {feature.icon && (
                            <feature.icon className="w-10 h-10 text-brand" strokeWidth={1.5} />
                          )}
                        </div>
                        <span className="text-xs font-mono text-brand/60 tracking-widest uppercase">
                          {feature.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Text side ── */}
                <div className={isRight ? 'md:order-first' : ''}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg text-pretty">
                    {feature.description}
                  </p>
                </div>

              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
