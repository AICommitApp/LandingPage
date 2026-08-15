import React from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { INTELLIJ_DESCRIPTION, INTELLIJ_TITLE } from '@/lib/site-pages';

const steps = [
  {
    title: 'Stage the change',
    body: 'Work in the JetBrains Commit tool window the way you already do. AICommit reads the staged diff.',
  },
  {
    title: 'Generate in one click',
    body: 'Run generation from the commit dialog or the AI Commit tool window. Large changesets can be processed in parallel.',
  },
  {
    title: 'Edit, then commit',
    body: 'The draft stays editable. Nothing is committed until you accept it.',
  },
];

const IntelliJPage = () => {
  return (
    <>
      <SeoHead
        title={INTELLIJ_TITLE}
        description={INTELLIJ_DESCRIPTION}
        path="/ai-commit-message-intellij"
      />
      <SiteChrome>
        <PageIntro
          eyebrow="IntelliJ IDEA"
          title={
            <>
              AI commit messages inside the{' '}
              <span className="text-brand">Commit tool window</span>
            </>
          }
          lede="AICommit is a JetBrains plugin for IntelliJ IDEA and the rest of the IntelliJ platform. It drafts a commit message from your staged diff — in the IDE, not in a separate app."
        />

        <section className="px-6 pb-8">
          <div className="container mx-auto max-w-3xl grid gap-4">
            {steps.map((step, index) => (
              <article key={step.title} className="surface-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-brand/70 mb-2">
                  Step {index + 1}
                </p>
                <h2 className="text-xl font-bold text-white tracking-tight">{step.title}</h2>
                <p className="mt-3 text-gray-300 leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="container mx-auto max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">What you can configure</h2>
            <p className="text-gray-400 leading-relaxed text-pretty">
              Bring your own provider: OpenAI, Azure OpenAI, Anthropic Claude, Google Gemini,
              DeepSeek, Ollama, or an OpenAI-compatible custom endpoint. The interface is
              available in English, 简体中文, 日本語, and 한국어. Commit-message history is
              persisted per project.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed text-pretty">
              Also works in WebStorm, PyCharm, GoLand, Rider, PhpStorm, RubyMine, CLion,
              Android Studio, DataGrip, and RustRover — any IntelliJ-platform IDE with the
              Commit tool window.{' '}
              <Link href="/deepseek" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                DeepSeek
              </Link>
              {' · '}
              <Link href="/ollama" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                Ollama
              </Link>
              {' · '}
              <Link href="/capabilities" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                Capabilities
              </Link>
            </p>
          </div>
        </section>
      </SiteChrome>
    </>
  );
};

export default IntelliJPage;
