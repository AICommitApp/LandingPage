import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from '@/lib/seo';

export type SitePage = {
  path: string;
  loc: string;
  title: string;
  description: string;
};

const page = (path: string, title: string, description: string): SitePage => ({
  path,
  loc: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  title,
  description,
});

export const COMPARE_TITLE = 'AICommit vs typical open-source plugins';
export const COMPARE_DESCRIPTION =
  'Category comparison of AI commit plugins for JetBrains IDEs. No project is named. Every AICommit cell traces to the changelog or the plugin description.';

export const CAPABILITIES_TITLE = 'What AICommit ships | Sourced capabilities';
export const CAPABILITIES_DESCRIPTION =
  'Sourced list of what AICommit actually does — providers, Thinking Mode isolation, local Ollama, history, and privacy. Each item links to the changelog or the plugin description.';

export const DEEPSEEK_TITLE = 'DeepSeek commit messages in JetBrains IDEs | AICommit';
export const DEEPSEEK_DESCRIPTION =
  'Use DeepSeek as a first-class provider in AICommit, including Thinking Mode. Reasoning stays out of the commit, history, and telemetry.';

export const OLLAMA_TITLE = 'Local AI commit messages with Ollama | AICommit';
export const OLLAMA_DESCRIPTION =
  'Generate commit messages locally with Ollama in JetBrains IDEs. One-click local setup — staged diffs never leave your machine.';

export const INTELLIJ_TITLE = 'AI commit message generator for IntelliJ IDEA | AICommit';
export const INTELLIJ_DESCRIPTION =
  'Generate an AI commit message from your staged diff inside the IntelliJ IDEA Commit tool window. One click, your provider, editable draft.';

export const CHANGELOG_TITLE = 'AICommit changelog | What shipped';
export const CHANGELOG_DESCRIPTION =
  'Public changelog for the AICommit JetBrains plugin. Each release is parsed from CHANGELOG.md so sourced claims on this site have a page visitors can open.';

export const SITE_PAGES: readonly SitePage[] = [
  page('/', HOME_TITLE, HOME_DESCRIPTION),
  page('/changelog', CHANGELOG_TITLE, CHANGELOG_DESCRIPTION),
  page('/capabilities', CAPABILITIES_TITLE, CAPABILITIES_DESCRIPTION),
  page('/deepseek', DEEPSEEK_TITLE, DEEPSEEK_DESCRIPTION),
  page('/ollama', OLLAMA_TITLE, OLLAMA_DESCRIPTION),
  page('/ai-commit-message-intellij', INTELLIJ_TITLE, INTELLIJ_DESCRIPTION),
];

export const INNER_PAGE_LINKS = [
  { label: 'Compare', href: '/compare' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'DeepSeek', href: '/deepseek' },
  { label: 'Ollama', href: '/ollama' },
  { label: 'IntelliJ', href: '/ai-commit-message-intellij' },
] as const;
