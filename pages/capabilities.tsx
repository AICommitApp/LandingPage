import React from 'react';
import Link from 'next/link';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { SourceCite } from '@/components/landing/SourceCite';
import { AICOMMIT_CAPABILITIES } from '@/lib/capabilities';
import { RECENT_RELEASES } from '@/lib/changelog';
import { CAPABILITIES_DESCRIPTION, CAPABILITIES_TITLE } from '@/lib/site-pages';

const CapabilitiesPage = () => {
  return (
    <>
      <SeoHead
        title={CAPABILITIES_TITLE}
        description={CAPABILITIES_DESCRIPTION}
        path="/capabilities"
      />
      <SiteChrome>
        <PageIntro
          eyebrow="Sourced capabilities"
          title={
            <>
              What AICommit{' '}
              <span className="text-brand">actually ships</span>
            </>
          }
          lede="Every statement on this page traces to the changelog or the Marketplace-facing plugin description. If it is not listed here, the site does not claim it."
        />

        <section className="px-6 pb-10">
          <div className="container mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-brand/70">
              Changelog
            </p>
            <div className="surface-card overflow-hidden">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Recent AICommit releases from CHANGELOG.md</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-gray-400"
                    >
                      Version
                    </th>
                    <th
                      scope="col"
                      className="hidden px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-gray-400 sm:table-cell"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-gray-400"
                    >
                      What landed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RELEASES.map((release) => (
                    <tr key={release.version} className="border-b border-white/10 last:border-b-0">
                      <th scope="row" className="px-5 py-4 align-top text-sm font-semibold text-white">
                        <Link href={release.href} className="hover:text-brand">
                          {release.version}
                        </Link>
                        <p className="mt-1 font-sans text-xs font-normal text-gray-400 sm:hidden">
                          {release.date}
                        </p>
                      </th>
                      <td className="hidden px-5 py-4 align-top font-mono text-sm tabular-nums text-gray-400 sm:table-cell">
                        {release.date}
                      </td>
                      <td className="px-5 py-4 align-top text-sm leading-relaxed text-pretty text-gray-200">
                        {release.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              <Link
                href="/changelog"
                className="text-gray-200 underline decoration-white/20 hover:text-brand"
              >
                Full changelog
              </Link>
              {' · '}
              <Link
                href="/compare"
                className="text-gray-200 underline decoration-white/20 hover:text-brand"
              >
                Category comparison
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 pb-4">
          <div className="container mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-brand/70">
              Capability list
            </p>
            <ul className="space-y-3">
              {AICOMMIT_CAPABILITIES.map((item) => (
                <li key={item.statement} className="surface-card p-5">
                  <p className="text-gray-200 leading-relaxed">{item.statement}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Source: <SourceCite href={item.sourceUrl} label={item.sourceLabel} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SiteChrome>
    </>
  );
};

export default CapabilitiesPage;
