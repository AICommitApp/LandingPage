import { DOWNLOAD_COUNT } from '@/lib/constants';

export const SITE_NAME = 'AICommit';
export const SITE_URL = 'https://aicommit.app';
export const HOME_URL = `${SITE_URL}/`;
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;
export const MARKETPLACE_URL = 'https://plugins.jetbrains.com/plugin/21289-aicommit/';
export const COMMUNITY_URL = 'https://github.com/AICommitApp/community/';

export const HOME_TITLE = 'AI Commit Message Generator for JetBrains IDEs | AICommit';
export const HOME_DESCRIPTION =
  'AICommit is a JetBrains plugin for AI commit messages in IntelliJ IDEA, WebStorm, and more. Works with OpenAI, Azure OpenAI, Gemini, Claude, and Ollama with privacy-first controls.';

export const HOME_FAQ = [
  {
    question: 'Which JetBrains IDEs does AICommit work with?',
    answer:
      'AICommit is built for JetBrains IDEs and fits directly into the Commit tool window in IntelliJ-platform IDEs, including IntelliJ IDEA and WebStorm.',
  },
  {
    question: 'Which AI providers are supported?',
    answer:
      'AICommit supports OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, and Ollama for local models.',
  },
  {
    question: 'Does AICommit collect my code or commit messages?',
    answer:
      'AICommit does not collect your code or commit messages. For cloud generation, content is sent only to the provider you configure.',
  },
  {
    question: 'Can I keep everything local?',
    answer:
      'Yes. Use Ollama with local models if you want a local-first workflow without sending staged diffs to a cloud provider.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Install the plugin from JetBrains Marketplace, configure a provider and model, verify credentials, choose a prompt template, and generate a commit message in one click.',
  },
  {
    question: 'How does licensing work?',
    answer:
      'AICommit is distributed through JetBrains Marketplace. Check the Marketplace listing and your IDE account for the current license or subscription status.',
  },
] as const;

export const marketplaceInstallsLabel = (value = DOWNLOAD_COUNT) =>
  `${value.toLocaleString()}+`;

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${HOME_URL}#organization`,
      name: SITE_NAME,
      url: HOME_URL,
      description: HOME_DESCRIPTION,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
      sameAs: [MARKETPLACE_URL, COMMUNITY_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: SITE_NAME,
      url: HOME_URL,
      description: HOME_DESCRIPTION,
      inLanguage: 'en',
      publisher: {
        '@id': `${HOME_URL}#organization`,
      },
    },
  ],
} as const;
