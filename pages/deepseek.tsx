import React from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { SourceCite } from '@/components/landing/SourceCite';
import { changelogHref } from '@/lib/changelog';
import { DEEPSEEK_DESCRIPTION, DEEPSEEK_TITLE } from '@/lib/site-pages';

const facts = [
  {
    title: 'First-class provider',
    body: 'DeepSeek has been a built-in provider since v3.6.1, with inline first-run setup in the tool window.',
    sourceLabel: 'CHANGELOG v3.6.1',
    sourceUrl: changelogHref('3.6.1'),
  },
  {
    title: 'Thinking Mode',
    body: 'v3.7.0 added a dedicated Thinking Mode experience with live reasoning progress and token statistics.',
    sourceLabel: 'CHANGELOG v3.7.0',
    sourceUrl: changelogHref('3.7.0'),
  },
  {
    title: 'Reasoning stays out of the commit',
    body: 'Reasoning content is never inserted into your commit, stored in history, or sent in telemetry.',
    sourceLabel: 'CHANGELOG v3.7.0',
    sourceUrl: changelogHref('3.7.0'),
  },
];

const DeepSeekPage = () => {
  return (
    <>
      <SeoHead title={DEEPSEEK_TITLE} description={DEEPSEEK_DESCRIPTION} path="/deepseek" />
      <SiteChrome>
        <PageIntro
          eyebrow="DeepSeek"
          title={
            <>
              DeepSeek commit messages in{' '}
              <span className="text-brand">JetBrains IDEs</span>
            </>
          }
          lede="Use DeepSeek as a first-class provider inside the Commit tool window. Thinking Mode shows reasoning while you wait — and keeps that reasoning out of the message you commit."
        />

        <section className="px-6 pb-8">
          <div className="container mx-auto max-w-3xl grid gap-4">
            {facts.map((fact) => (
              <article key={fact.title} className="surface-card p-6">
                <h2 className="text-xl font-bold text-white tracking-tight">{fact.title}</h2>
                <p className="mt-3 text-gray-300 leading-relaxed">{fact.body}</p>
                <p className="mt-3 text-xs text-gray-400">
                  Source: <SourceCite href={fact.sourceUrl} label={fact.sourceLabel} />
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm text-gray-400 leading-relaxed text-pretty">
              AICommit also supports OpenAI, Azure OpenAI, Anthropic Claude, Google Gemini,
              Ollama, and OpenAI-compatible custom endpoint profiles. For a local-only
              workflow, see{' '}
              <Link href="/ollama" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                Ollama
              </Link>
              . The sourced list of what ships is on the{' '}
              <Link href="/capabilities" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                capabilities page
              </Link>
              .
            </p>
          </div>
        </section>
      </SiteChrome>
    </>
  );
};

export default DeepSeekPage;
