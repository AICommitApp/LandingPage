import Head from 'next/head';
import {
  OG_IMAGE_URL,
  SITE_NAME,
  pageStructuredData,
  pageUrl,
} from '@/lib/seo';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
};

export const SeoHead = ({ title, description, path }: SeoHeadProps) => {
  const url = pageUrl(path);
  const structuredData = pageStructuredData({ title, description, path });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />
      <meta name="application-name" content={SITE_NAME} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:alt" content="AICommit landing page preview" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="theme-color" content="#21252f" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};
