export const BRAND_COLOR = '#ded14f';
export const BRAND_COLOR_RGB = '222, 209, 79';
export const DOWNLOAD_COUNT = 22490;

// JetBrains Marketplace rating for plugin 21289. Keep in sync with the listing
// (https://plugins.jetbrains.com/api/plugins/21289/rating) and the visible
// rating rendered in Reviews.tsx, since the aggregateRating JSON-LD must match
// what users see on the page.
export const MARKETPLACE_RATING = 4.1;
export const MARKETPLACE_RATING_COUNT = 15;

// Bump when the page's substantive content changes. Feeds the JSON-LD
// `dateModified`. The "Last updated" lines in the agent files (llms.txt,
// llms-full.txt, index.md, ai-agent.json) are hand-maintained, not derived
// from this constant — bump them to match when content changes.
export const LAST_UPDATED = '2026-06-14';
