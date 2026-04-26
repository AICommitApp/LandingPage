import React from 'react';
import { m } from 'framer-motion';
import { Zap, Lock } from 'lucide-react';
import { SiGooglegemini, SiOllama } from '@icons-pack/react-simple-icons';
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
// Gemini + Ollama: official icons from @icons-pack/react-simple-icons (Simple Icons CC0-1.0)
// OpenAI + Azure: inline SVG paths from simple-icons@latest (CC0-1.0), not yet in React wrapper

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684" />
  </svg>
);

const providers = [
  { name: 'OpenAI',  Icon: OpenAIIcon  },
  { name: 'Azure',   Icon: AzureIcon   },
  { name: 'Gemini',  Icon: () => <SiGooglegemini size={20} color="currentColor" /> },
  { name: 'Ollama',  Icon: () => <SiOllama size={20} color="currentColor" /> },
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
      'Works with OpenAI, Azure OpenAI, Google Gemini, and Ollama — including local models. Switch providers without touching a config file.',
    align: 'right',
    visual: 'providers',
  },
  {
    icon: Lock,
    label: 'Privacy First',
    title: 'Code stays on your machine.',
    description:
      "All diffs are processed locally before any API call. No code is stored, logged, or shared. Built for teams who can't compromise on data security.",
    align: 'left',
    visual: 'icon',
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────

export const Features = () => {
  const { canAnimate } = useMotionReady();

  return (
    <section id="features" className="py-20 px-6">
      <h2 className="sr-only">Features</h2>
      <div className="container mx-auto max-w-6xl">
        <div className="divide-y divide-white/[0.06]">
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
                                       bg-white/[0.04] border border-white/[0.08]
                                       shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                                       cursor-default transition-colors duration-200
                            hover:bg-brand/[0.06] hover:border-brand/20"
                            variants={providerCardVariants}
                            initial="rest"
                            whileHover={canAnimate ? 'hover' : {}}
                            transition={springSnappy}
                          >
                            <m.span
                              className="text-brand/70 flex-shrink-0"
                              variants={providerIconVariants}
                              transition={springSnappy}
                            >
                              <Icon />
                            </m.span>
                            <span className="text-sm font-medium text-gray-300">{name}</span>
                          </m.div>
                        ))}
                      </div>
                      <p className="text-center text-xs text-gray-600 mt-3">+ custom API endpoints</p>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                      <div className="absolute inset-0 rounded-3xl bg-white/[0.03] border border-white/[0.07]" />
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
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg">
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
