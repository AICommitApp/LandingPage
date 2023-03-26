require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided. Received: " +
      JSON.stringify(contentfulConfig)
  );
}

// starter config
module.exports = {
  siteMetadata: {
    title: "AICommit",
    description:
      "AICommit automates commit messages and streamlines the development process for developers.",
  },
  plugins: [
    {
      resolve: `gatsby-theme-landing-page`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AICommit`,
        short_name: `AICommit automates commit messages and streamlines the development process for developers.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        display: `browser`,
        icon: `src/assets/gatsby-monogram.png`,
      },
    },
  ],
};
