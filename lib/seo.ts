import {
  DOWNLOAD_COUNT,
  LAST_UPDATED,
  MARKETPLACE_RATING,
  MARKETPLACE_RATING_COUNT,
} from '@/lib/constants';

export const SITE_NAME = 'AICommit';
export const SITE_URL = 'https://aicommit.app';
export const HOME_URL = `${SITE_URL}/`;
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;
export const MARKETPLACE_URL = 'https://plugins.jetbrains.com/plugin/21289-aicommit/';
export const MARKETPLACE_REVIEWS_URL = `${MARKETPLACE_URL}reviews`;
export const COMMUNITY_URL = 'https://github.com/AICommitApp/community/';

export const HOME_TITLE = 'AI Commit Message Generator for JetBrains IDEs | AICommit';
export const HOME_DESCRIPTION =
  'AICommit is a JetBrains IDE plugin for AI commit messages — works with OpenAI, Azure OpenAI, Gemini, Claude, and Ollama, with privacy-first provider controls.';

export const HOME_FAQ = [
  {
    question: 'Which JetBrains IDEs does AICommit work with?',
    answer:
      'AICommit is built for JetBrains IDEs and fits directly into the Commit tool window in IntelliJ-platform IDEs, including IntelliJ IDEA, PyCharm, WebStorm, GoLand, Rider, PhpStorm, RubyMine, CLion, Android Studio, DataGrip, and RustRover.',
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
    question: 'Is AICommit free, and how much does it cost?',
    answer:
      'AICommit is a paid JetBrains Marketplace plugin with a 30-day free trial. Personal plans start at $1/month (or $10/year) and commercial plans at $3/month (or $30/year), billed through JetBrains Marketplace.',
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
      dateModified: LAST_UPDATED,
      publisher: {
        '@id': `${HOME_URL}#organization`,
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${HOME_URL}#software`,
      name: SITE_NAME,
      url: HOME_URL,
      description: HOME_DESCRIPTION,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'JetBrains IDE plugin',
      operatingSystem: 'JetBrains IDEs',
      installUrl: MARKETPLACE_URL,
      downloadUrl: MARKETPLACE_URL,
      softwareRequirements: 'IntelliJ-platform IDE with the JetBrains Commit tool window',
      featureList: [
        'Generate commit messages from staged changes inside JetBrains IDEs',
        'Use OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, or Ollama',
        'Edit generated commit messages before committing',
        'Keep cloud usage controlled by the provider and model configured by the user',
      ],
      screenshot: [
        `${SITE_URL}/screenshots/s_0_action_icon.webp`,
        `${SITE_URL}/screenshots/s_1_commit_panel.webp`,
        `${SITE_URL}/screenshots/s_2_template.webp`,
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Personal',
          price: '1.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: MARKETPLACE_URL,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1.00',
            priceCurrency: 'USD',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          },
        },
        {
          '@type': 'Offer',
          name: 'Commercial',
          price: '3.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: MARKETPLACE_URL,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '3.00',
            priceCurrency: 'USD',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          },
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: MARKETPLACE_RATING,
        ratingCount: MARKETPLACE_RATING_COUNT,
        bestRating: 5,
        worstRating: 1,
      },
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'DownloadAction' },
        userInteractionCount: DOWNLOAD_COUNT,
      },
      dateModified: LAST_UPDATED,
      publisher: {
        '@id': `${HOME_URL}#organization`,
      },
      sameAs: [MARKETPLACE_URL, COMMUNITY_URL],
    },
    {
      '@type': 'FAQPage',
      '@id': `${HOME_URL}#faq`,
      mainEntity: HOME_FAQ.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
  ],
} as const;
