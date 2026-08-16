import React, { useEffect } from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { CHANGELOG_RELEASES, type ChangelogRelease } from '@/lib/changelog';
import { CHANGELOG_DESCRIPTION, CHANGELOG_TITLE } from '@/lib/site-pages';

const FEATURED_COUNT = 8;

const ReleaseBody = ({ release }: { release: ChangelogRelease }) => (
  <div className="grid gap-5">
    {release.groups.map((group) => (
      <div key={group.title}>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand/70">{group.title}</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-pretty text-gray-200">
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ReleaseHeader = ({ release }: { release: ChangelogRelease }) => (
  <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <h2 className="text-xl font-bold tracking-tight text-white">{release.version}</h2>
    {release.date ? (
      <time dateTime={release.date} className="font-mono text-sm tabular-nums text-gray-400">
        {release.date}
      </time>
    ) : null}
  </div>
);

const ChangelogPage = () => {
  const featured = CHANGELOG_RELEASES.slice(0, FEATURED_COUNT);
  const earlier = CHANGELOG_RELEASES.slice(FEATURED_COUNT);

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.closest('details')?.setAttribute('open', '');
    target.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <>
      <SeoHead title={CHANGELOG_TITLE} description={CHANGELOG_DESCRIPTION} path="/changelog" />
      <SiteChrome>
        <PageIntro
          eyebrow="Changelog"
          title={
            <>
              What shipped,{' '}
              <span className="text-brand">version by version</span>
            </>
          }
          lede="This page is the public changelog. The plugin source repository is private, so capability claims on this site link here instead of GitHub."
        />

        <section className="px-6 pb-8">
          <div className="container mx-auto grid max-w-3xl gap-4">
            {featured.map((release) => (
              <article
                key={release.anchor}
                id={release.anchor}
                className="surface-card scroll-mt-24 p-6"
              >
                <ReleaseHeader release={release} />
                <ReleaseBody release={release} />
              </article>
            ))}
          </div>
        </section>

        {earlier.length > 0 ? (
          <section className="px-6 pb-12">
            <div className="container mx-auto max-w-3xl">
              <details className="surface-card p-6">
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  Earlier releases
                  <span className="ml-2 font-mono text-xs font-normal uppercase tracking-[0.18em] text-gray-400">
                    {earlier.length}
                  </span>
                </summary>
                <div className="mt-6 grid gap-8">
                  {earlier.map((release) => (
                    <article key={release.anchor} id={release.anchor} className="scroll-mt-24">
                      <ReleaseHeader release={release} />
                      <ReleaseBody release={release} />
                    </article>
                  ))}
                </div>
              </details>
            </div>
          </section>
        ) : null}

        <section className="px-6 pb-4">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm leading-relaxed text-pretty text-gray-400">
              Sourced claims that point here live on the{' '}
              <Link
                href="/capabilities"
                className="text-gray-200 underline decoration-white/20 hover:text-brand"
              >
                capabilities
              </Link>
              {' and '}
              <Link
                href="/compare"
                className="text-gray-200 underline decoration-white/20 hover:text-brand"
              >
                compare
              </Link>{' '}
              pages.
            </p>
          </div>
        </section>
      </SiteChrome>
    </>
  );
};

export default ChangelogPage;
