import React from 'react';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { AICOMMIT_CAPABILITIES } from '@/lib/capabilities';
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

        <section className="px-6 pb-4">
          <div className="container mx-auto max-w-3xl">
            <ul className="space-y-3">
              {AICOMMIT_CAPABILITIES.map((item) => (
                <li key={item.statement} className="surface-card p-5">
                  <p className="text-gray-200 leading-relaxed">{item.statement}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Source:{' '}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 underline decoration-white/20 hover:text-brand"
                    >
                      {item.sourceLabel}
                    </a>
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
