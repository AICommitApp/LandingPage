import test from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = '/Users/rosu/Coding/AI-COMMIT/LandingPage';
const buildMarker = path.join(root, '.next', 'server', 'pages', 'index.html');
const robotsPath = path.join(root, 'public', 'robots.txt');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
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

  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"Organization"/);

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
  assert.match(robots, /Sitemap:\s*https:\/\/aicommit\.app\/sitemap\.xml/);

  assert.match(sitemap, /<loc>https:\/\/aicommit\.app\/<\/loc>/);
});

test('screenshot source assets are webp and kept compact', () => {
  const files = readdirSync(screenshotsDir).sort();
  const totalBytes = files.reduce((sum, file) => sum + statSync(path.join(screenshotsDir, file)).size, 0);

  assert.deepEqual(files, ['s_0_action_icon.webp', 's_1_commit_panel.webp', 's_2_template.webp']);
  assert.ok(totalBytes < 400 * 1024, `expected screenshots under 400KB total, got ${totalBytes}`);
});
