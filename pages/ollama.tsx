import React from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { SourceCite } from '@/components/landing/SourceCite';
import { changelogHref, PLUGIN_DESCRIPTION_URL } from '@/lib/changelog';
import { OLLAMA_DESCRIPTION, OLLAMA_TITLE } from '@/lib/site-pages';

const facts = [
  {
    title: 'One-click local setup',
    body: 'First-run includes one-click local Ollama quick setup, plus deep links from the tool window into the right Settings field.',
    sourceLabel: 'CHANGELOG v3.6.1',
    sourceUrl: changelogHref('3.6.1'),
  },
  {
    title: 'Nothing leaves the machine',
    body: 'With Ollama, staged diffs stay on your machine. AICommit does not collect your code or commit messages.',
    sourceLabel: 'Plugin description',
    sourceUrl: PLUGIN_DESCRIPTION_URL,
  },
  {
    title: 'Telemetry is opt-out',
    body: 'Telemetry is opt-out, with a full disclosure in Settings → About.',
    sourceLabel: 'Plugin description',
    sourceUrl: PLUGIN_DESCRIPTION_URL,
  },
];

const OllamaPage = () => {
  return (
    <>
      <SeoHead title={OLLAMA_TITLE} description={OLLAMA_DESCRIPTION} path="/ollama" />
      <SiteChrome>
        <PageIntro
          eyebrow="Local models"
          title={
            <>
              Keep the diff on{' '}
              <span className="text-brand">your machine</span>
            </>
          }
          lede="Ollama is the local-first path: generate a commit message from the staged diff without sending that diff to a cloud provider."
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
              Prefer a cloud model you already pay for? AICommit also supports OpenAI,
              Azure OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and OpenAI-compatible
              custom endpoint profiles. DeepSeek details live on the{' '}
              <Link href="/deepseek" className="text-gray-200 underline decoration-white/20 hover:text-brand">
                DeepSeek page
              </Link>
              .
            </p>
          </div>
        </section>
      </SiteChrome>
    </>
  );
};

export default OllamaPage;
