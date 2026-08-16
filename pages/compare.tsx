import React from 'react';
import Link from 'next/link';
import { Check, Minus } from 'lucide-react';
import { SeoHead } from '@/components/landing/SeoHead';
import { SiteChrome } from '@/components/landing/SiteChrome';
import { PageIntro } from '@/components/landing/PageIntro';
import { SourceCite } from '@/components/landing/SourceCite';
import { COMPARE_DESCRIPTION, COMPARE_TITLE } from '@/lib/site-pages';
import {
  COMPARE_ROWS,
  STATUS_LABEL,
  type CompareRow,
  type CompareStatus,
} from '@/lib/compare-matrix';

const StatusMark = ({ status }: { status: CompareStatus }) => {
  const isShips = status === 'ships';
  return (
    <span
      className={
        isShips
          ? 'inline-flex items-center gap-1.5 text-brand'
          : 'inline-flex items-center gap-1.5 text-gray-400'
      }
    >
      {isShips ? (
        <Check className="size-4" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Minus className="size-4" strokeWidth={2} aria-hidden="true" />
      )}
      <span className="font-mono text-xs uppercase tracking-[0.18em]">
        {STATUS_LABEL[status]}
      </span>
    </span>
  );
};

const AiCommitCell = ({ row }: { row: CompareRow }) => (
  <>
    <StatusMark status={row.aicommit.status} />
    <p className="mt-2 text-sm text-gray-200 leading-relaxed text-pretty">
      {row.aicommit.note}
    </p>
    <p className="mt-2 text-xs text-gray-400">
      Source: <SourceCite href={row.aicommit.sourceUrl} label={row.aicommit.sourceLabel} />
    </p>
  </>
);

const TypicalCell = ({ row }: { row: CompareRow }) => (
  <>
    <StatusMark status={row.typical.status} />
    <p className="mt-2 text-sm text-gray-400 leading-relaxed text-pretty">{row.typical.note}</p>
  </>
);

const ComparePage = () => {
  return (
    <>
      <SeoHead title={COMPARE_TITLE} description={COMPARE_DESCRIPTION} path="/compare" />
      <SiteChrome>
        <PageIntro
          eyebrow="Compare"
          title={
            <>
              What ships, versus typical{' '}
              <span className="text-brand">open-source plugins</span>
            </>
          }
          lede="A category comparison, not a product list. No project is named. Every AICommit cell traces to the changelog or the Marketplace-facing plugin description."
        />

        <section className="px-6 pb-4">
          <div className="container mx-auto max-w-6xl">
            {/* Desktop: IDE-style matrix */}
            <div className="surface-card hidden overflow-hidden md:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Capability matrix comparing typical open-source Marketplace listings with AICommit
                </caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th
                      scope="col"
                      className="w-[18%] px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-brand/70"
                    >
                      Capability
                    </th>
                    <th
                      scope="col"
                      className="w-[41%] px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-gray-400"
                    >
                      Open-source listings
                    </th>
                    <th
                      scope="col"
                      className="w-[41%] bg-white/6 px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-gray-200"
                    >
                      AICommit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.capability} className="border-b border-white/10 last:border-b-0">
                      <th
                        scope="row"
                        className="px-6 py-5 align-top text-sm font-semibold text-white"
                      >
                        {row.capability}
                      </th>
                      <td className="px-6 py-5 align-top">
                        <TypicalCell row={row} />
                      </td>
                      <td className="bg-white/4 px-6 py-5 align-top">
                        <AiCommitCell row={row} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: one capability per panel */}
            <ul className="grid gap-3 md:hidden">
              {COMPARE_ROWS.map((row) => (
                <li key={row.capability} className="surface-card p-5">
                  <h2 className="text-lg font-bold tracking-tight text-white">{row.capability}</h2>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-gray-400">
                        Open-source listings
                      </p>
                      <div className="mt-2">
                        <TypicalCell row={row} />
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/6 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-gray-200">
                        AICommit
                      </p>
                      <div className="mt-2">
                        <AiCommitCell row={row} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm leading-relaxed text-pretty text-gray-400">
              The open-source column describes patterns that show up across free Marketplace
              listings in this category. It does not identify, rank, or link any specific project.
              If a claim about AICommit is not in the table, the site does not make it. The
              inventory with every source on its own line is the{' '}
              <Link
                href="/capabilities"
                className="text-gray-200 underline decoration-white/20 hover:text-brand"
              >
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

export default ComparePage;
