#!/usr/bin/env node
/**
 * Copy CHANGELOG.md from the plugin repo when it is available locally,
 * then write the parsed snapshot used by the public /changelog page.
 *
 * The plugin GitHub repo is private. JetBrains Marketplace update `notes`
 * are empty. The landing site is the public source of truth.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseChangelog } from './parse-changelog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const snapshotPath = path.join(contentDir, 'CHANGELOG.md');
const jsonPath = path.join(root, 'lib', 'changelog-data.json');

const siblingCandidates = [
  process.env.AICOMMIT_CHANGELOG,
  path.resolve(root, '..', '..', 'AICommit', 'CHANGELOG.md'),
  path.resolve(root, '..', 'AICommit', 'CHANGELOG.md'),
].filter(Boolean);

const source = siblingCandidates.find((candidate) => existsSync(candidate));
mkdirSync(contentDir, { recursive: true });

if (source) {
  copyFileSync(source, snapshotPath);
  console.log(`ingest-changelog: copied ${source}`);
} else if (existsSync(snapshotPath)) {
  console.log('ingest-changelog: sibling CHANGELOG.md not found, using existing snapshot');
} else {
  console.error(
    'ingest-changelog: no CHANGELOG.md. Set AICOMMIT_CHANGELOG or clone the plugin repo next to LandingPage.'
  );
  process.exit(1);
}

const markdown = readFileSync(snapshotPath, 'utf8');
const releases = parseChangelog(markdown);
if (releases.length === 0) {
  console.error('ingest-changelog: parser produced zero releases');
  process.exit(1);
}

writeFileSync(jsonPath, `${JSON.stringify({ releases }, null, 2)}\n`);
console.log(`ingest-changelog: wrote ${releases.length} releases to lib/changelog-data.json`);
