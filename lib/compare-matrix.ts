import { changelogHref, PLUGIN_DESCRIPTION_URL } from '@/lib/changelog';

/**
 * Category comparison against typical open-source Marketplace listings.
 * No project is named. AICommit cells must stay sourced; the typical column
 * describes patterns, not a scored opponent.
 */

export type CompareStatus = 'ships' | 'typical' | 'rare' | 'missing';

export type CompareRow = {
  capability: string;
  typical: {
    status: CompareStatus;
    note: string;
  };
  aicommit: {
    status: CompareStatus;
    note: string;
    sourceLabel: string;
    sourceUrl: string;
  };
};

export const COMPARE_ROWS: readonly CompareRow[] = [
  {
    capability: 'Providers',
    typical: {
      status: 'typical',
      note: 'Usually a short cloud list. DeepSeek, Azure, and custom endpoints are not a given.',
    },
    aicommit: {
      status: 'ships',
      note: 'OpenAI, Azure OpenAI, Claude, Gemini, DeepSeek, Ollama, and OpenAI-compatible custom endpoints.',
      sourceLabel: 'CHANGELOG v3.6.1',
      sourceUrl: changelogHref('3.6.1'),
    },
  },
  {
    capability: 'Thinking isolation',
    typical: {
      status: 'missing',
      note: 'Model reasoning often lands in the commit text.',
    },
    aicommit: {
      status: 'ships',
      note: 'DeepSeek Thinking Mode keeps reasoning out of the commit, history, and telemetry.',
      sourceLabel: 'CHANGELOG v3.7.0',
      sourceUrl: changelogHref('3.7.0'),
    },
  },
  {
    capability: 'Local Ollama',
    typical: {
      status: 'rare',
      note: 'Host and port are usually typed in by hand, if local is supported at all.',
    },
    aicommit: {
      status: 'ships',
      note: 'One-click local setup from first-run. Staged diffs stay on the machine.',
      sourceLabel: 'CHANGELOG v3.6.1',
      sourceUrl: changelogHref('3.6.1'),
    },
  },
  {
    capability: 'Commit history',
    typical: {
      status: 'rare',
      note: 'Session-only, or none.',
    },
    aicommit: {
      status: 'ships',
      note: 'Commit-message history is persisted per project.',
      sourceLabel: 'CHANGELOG v3.6.1',
      sourceUrl: changelogHref('3.6.1'),
    },
  },
  {
    capability: 'Large changesets',
    typical: {
      status: 'typical',
      note: 'One pass over the diff. Long contexts time out or get truncated.',
    },
    aicommit: {
      status: 'ships',
      note: 'Parallel processing for changesets with many files.',
      sourceLabel: 'Plugin description',
      sourceUrl: PLUGIN_DESCRIPTION_URL,
    },
  },
  {
    capability: 'Interface language',
    typical: {
      status: 'typical',
      note: 'English-first. East-Asian copy is a frequent bug report.',
    },
    aicommit: {
      status: 'ships',
      note: 'English, 简体中文, 日本語, and 한국어.',
      sourceLabel: 'Plugin description',
      sourceUrl: PLUGIN_DESCRIPTION_URL,
    },
  },
  {
    capability: 'Telemetry',
    typical: {
      status: 'missing',
      note: 'Undisclosed, or none. Hard to audit what leaves the IDE.',
    },
    aicommit: {
      status: 'ships',
      note: 'Opt-out, with a full disclosure in Settings → About.',
      sourceLabel: 'Plugin description',
      sourceUrl: PLUGIN_DESCRIPTION_URL,
    },
  },
  {
    capability: 'Maintenance',
    typical: {
      status: 'typical',
      note: 'Category listings often go quiet after the first year. Open issues pile up without triage.',
    },
    aicommit: {
      status: 'ships',
      note: 'Still shipping: Thinking Mode landed in v3.7.0, providers through v3.6.1.',
      sourceLabel: 'CHANGELOG v3.7.0',
      sourceUrl: changelogHref('3.7.0'),
    },
  },
  {
    capability: 'Publisher',
    typical: {
      status: 'typical',
      note: 'Personal listing. No verified-vendor badge.',
    },
    aicommit: {
      status: 'ships',
      note: 'JetBrains Marketplace verified vendor (vendor.isVerified is true).',
      sourceLabel: 'Marketplace API /api/plugins/21289',
      sourceUrl: 'https://plugins.jetbrains.com/api/plugins/21289',
    },
  },
];

export const STATUS_LABEL: Record<CompareStatus, string> = {
  ships: 'Ships',
  typical: 'Typical',
  rare: 'Rare',
  missing: 'Usually not',
};
