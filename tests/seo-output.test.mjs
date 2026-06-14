import test from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testDir, '..');
const buildMarker = path.join(root, '.next', 'server', 'pages', 'index.html');
const robotsPath = path.join(root, 'public', 'robots.txt');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const llmsPath = path.join(root, 'public', 'llms.txt');
const llmsFullPath = path.join(root, 'public', 'llms-full.txt');
const indexMarkdownPath = path.join(root, 'public', 'index.md');
const aiAgentManifestPath = path.join(root, 'public', '.well-known', 'ai-agent.json');
const screenshotsDir = path.join(root, 'public', 'screenshots');
let hasBuilt = false;

function ensureProductionBuild() {
  if (hasBuilt) return;
  execSync('npm run build', {
    cwd: root,
    stdio: 'pipe',
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: 'https://aicommit.app' },
  });
  hasBuilt = true;
}

test('homepage build output contains SSR SEO content and metadata', () => {
  ensureProductionBuild();

  const html = readFileSync(buildMarker, 'utf8');

  assert.match(html, /AI Commit Message Generator for JetBrains IDEs/);
  assert.match(html, /Built into your JetBrains workflow/);
  assert.match(html, /Watch AICommit in action/);
  assert.match(html, /What developers ask before installing/);
  assert.doesNotMatch(html, /animate-pulse/);

  assert.match(html, /<link rel="canonical" href="https:\/\/aicommit\.app\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/aicommit\.app\/"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/aicommit\.app\/og-image\.jpg"/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/aicommit\.app\/og-image\.jpg"/);
  assert.match(html, /<link rel="alternate" type="text\/plain" title="AICommit for LLMs" href="https:\/\/aicommit\.app\/llms\.txt"/);
  assert.match(html, /<link rel="alternate" type="text\/markdown" title="AICommit Markdown Snapshot" href="https:\/\/aicommit\.app\/index\.md"/);

  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"SoftwareApplication"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"applicationCategory":"DeveloperApplication"/);
  assert.match(html, /"operatingSystem":"JetBrains IDEs"/);
  assert.match(html, /"@type":"AggregateRating"/);
  assert.match(html, /"@type":"Offer"/);
  assert.match(html, /"priceCurrency":"USD"/);
  assert.match(html, /"@type":"InteractionCounter"/);

  const screenshotPreloads = [...html.matchAll(/<link rel="preload" as="image"[^>]*imageSrcSet="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((srcset) => srcset.includes('s_0_action_icon'));

  assert.equal(
    screenshotPreloads.length,
    1,
    `expected a single preload for the hero screenshot, got ${screenshotPreloads.length}`
  );
});

test('robots.txt and sitemap.xml are published with absolute canonical URLs', () => {
  assert.ok(existsSync(robotsPath), 'robots.txt should exist');
  assert.ok(existsSync(sitemapPath), 'sitemap.xml should exist');

  const robots = readFileSync(robotsPath, 'utf8');
  const sitemap = readFileSync(sitemapPath, 'utf8');

  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Allow:\s*\//);
  assert.match(robots, /User-agent:\s*GPTBot/);
  assert.match(robots, /User-agent:\s*ClaudeBot/);
  assert.match(robots, /User-agent:\s*PerplexityBot/);
  assert.match(robots, /User-agent:\s*Google-Extended/);
  assert.match(robots, /Sitemap:\s*https:\/\/aicommit\.app\/sitemap\.xml/);
  assert.match(robots, /LLMs:\s*https:\/\/aicommit\.app\/llms\.txt/);

  assert.match(sitemap, /<loc>https:\/\/aicommit\.app\/<\/loc>/);
});

test('agent-readable markdown and manifest files are published', () => {
  for (const file of [llmsPath, llmsFullPath, indexMarkdownPath, aiAgentManifestPath]) {
    assert.ok(existsSync(file), `${path.basename(file)} should exist`);
  }

  const llms = readFileSync(llmsPath, 'utf8');
  const llmsFull = readFileSync(llmsFullPath, 'utf8');
  const indexMarkdown = readFileSync(indexMarkdownPath, 'utf8');
  const manifest = JSON.parse(readFileSync(aiAgentManifestPath, 'utf8'));

  assert.match(llms, /^# AICommit/m);
  assert.match(llms, /> AICommit is a JetBrains plugin/);
  assert.match(llms, /\[Full agent context\]\(https:\/\/aicommit\.app\/llms-full\.txt\)/);
  assert.match(llms, /\[JetBrains Marketplace\]\(https:\/\/plugins\.jetbrains\.com\/plugin\/21289-aicommit\/\)/);

  assert.match(llmsFull, /## Agent and API surface/);
  assert.match(llmsFull, /AICommit does not operate a public HTTP API, OAuth authorization server, MCP server, or A2A task endpoint/);
  assert.match(llmsFull, /OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, and Ollama/);

  assert.match(indexMarkdown, /^# AI Commit Message Generator for JetBrains IDEs/m);
  assert.match(indexMarkdown, /\[Install AICommit on JetBrains Marketplace\]\(https:\/\/plugins\.jetbrains\.com\/plugin\/21289-aicommit\/\)/);

  assert.equal(manifest.name, 'AICommit');
  assert.equal(manifest.homepage, 'https://aicommit.app/');
  assert.equal(manifest.capabilities.generateCommitMessages.surface, 'JetBrains IDE plugin');
});

test('root response advertises agent-readable alternates with Link headers', async () => {
  const { default: nextConfig } = await import(pathToFileURL(path.join(root, 'next.config.js')).href);
  const routes = await nextConfig.headers();
  const rootHeaders = routes.find((route) => route.source === '/');

  assert.ok(rootHeaders, 'root route headers should be configured');

  const linkHeaderValues = rootHeaders.headers
    .filter((header) => header.key.toLowerCase() === 'link')
    .map((header) => header.value);
  assert.equal(linkHeaderValues.length, 1, 'root route should publish a single combined Link header');

  const linkHeaders = linkHeaderValues[0];
  assert.match(linkHeaders, /<https:\/\/aicommit\.app\/llms\.txt>;\s*rel="describedby"/);
  assert.match(linkHeaders, /<https:\/\/aicommit\.app\/index\.md>;\s*rel="alternate"/);
  assert.match(linkHeaders, /<https:\/\/aicommit\.app\/\.well-known\/ai-agent\.json>;\s*rel="service-desc"/);
});

test('canonical host redirects and non-page agent resources are not search-index candidates', async () => {
  const { default: nextConfig } = await import(pathToFileURL(path.join(root, 'next.config.js')).href);
  const redirects = await nextConfig.redirects();
  const headers = await nextConfig.headers();

  assert.deepEqual(redirects, [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.aicommit.app',
        },
      ],
      destination: 'https://aicommit.app/:path*',
      permanent: true,
    },
  ]);

  for (const source of ['/index.md', '/llms.txt', '/llms-full.txt', '/.well-known/ai-agent.json']) {
    const routeHeaders = headers.find((route) => route.source === source)?.headers ?? [];
    assert.ok(
      routeHeaders.some(
        (header) =>
          header.key === 'X-Robots-Tag' &&
          header.value === 'noindex, follow'
      ),
      `${source} should be crawlable but explicitly excluded from search indexing`
    );
  }
});

test('screenshot source assets are webp and kept compact', () => {
  const files = readdirSync(screenshotsDir).sort();
  const totalBytes = files.reduce((sum, file) => sum + statSync(path.join(screenshotsDir, file)).size, 0);

  assert.deepEqual(files, ['s_0_action_icon.webp', 's_1_commit_panel.webp', 's_2_template.webp']);
  assert.ok(totalBytes < 400 * 1024, `expected screenshots under 400KB total, got ${totalBytes}`);
});
