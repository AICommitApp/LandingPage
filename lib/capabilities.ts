import { changelogHref, PLUGIN_DESCRIPTION_URL } from '@/lib/changelog';

export type AicommitCapability = {
  statement: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const AICOMMIT_CAPABILITIES: readonly AicommitCapability[] = [
  {
    statement:
      'Providers: OpenAI, Azure OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Ollama, and OpenAI-compatible custom endpoint profiles.',
    sourceLabel: 'CHANGELOG v3.6.1',
    sourceUrl: changelogHref('3.6.1'),
  },
  {
    statement:
      'DeepSeek Thinking Mode: reasoning is not inserted into the commit, stored in history, or sent in telemetry.',
    sourceLabel: 'CHANGELOG v3.7.0',
    sourceUrl: changelogHref('3.7.0'),
  },
  {
    statement: 'Ollama one-click local setup from first-run.',
    sourceLabel: 'CHANGELOG v3.6.1',
    sourceUrl: changelogHref('3.6.1'),
  },
  {
    statement: 'Commit-message history is persisted per project.',
    sourceLabel: 'CHANGELOG v3.6.1',
    sourceUrl: changelogHref('3.6.1'),
  },
  {
    statement: 'Parallel processing for changesets with many files.',
    sourceLabel: 'Plugin description',
    sourceUrl: PLUGIN_DESCRIPTION_URL,
  },
  {
    statement: 'Interface in English, 简体中文, 日本語, and 한국어.',
    sourceLabel: 'Plugin description',
    sourceUrl: PLUGIN_DESCRIPTION_URL,
  },
  {
    statement: 'Telemetry is opt-out, with a full disclosure in Settings → About.',
    sourceLabel: 'Plugin description',
    sourceUrl: PLUGIN_DESCRIPTION_URL,
  },
  {
    statement: 'Published by a JetBrains Marketplace verified vendor (vendor.isVerified is true).',
    sourceLabel: 'Marketplace API /api/plugins/21289',
    sourceUrl: 'https://plugins.jetbrains.com/api/plugins/21289',
  },
];
