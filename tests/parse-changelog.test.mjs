import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChangelog, releaseSummary } from '../scripts/parse-changelog.mjs';

const sample = `<!-- Keep a Changelog guide -> https://keepachangelog.com -->

# AICommit Changelog

## [Unreleased]

## [3.7.0] - 2026-07-11

### Added

- DeepSeek: Added a dedicated Thinking Mode experience.
- Diagnostics: Added a Copy diagnostic info action.

### Improved

- Settings: Redesigned provider configuration.

### Fixed

- Streaming: Incomplete responses now report an error.

## [3.6.1] - 2026-05-26

### Added

- DeepSeek: first-class provider with inline first-run setup.
`;

test('parseChangelog skips empty Unreleased and keeps Keep a Changelog groups', () => {
  const releases = parseChangelog(sample);
  assert.equal(releases.length, 2);
  assert.equal(releases[0].version, '3.7.0');
  assert.equal(releases[0].date, '2026-07-11');
  assert.equal(releases[0].anchor, 'v3.7.0');
  assert.deepEqual(
    releases[0].groups.map((g) => g.title),
    ['Added', 'Improved', 'Fixed']
  );
  assert.equal(releases[0].groups[0].items.length, 2);
  assert.equal(releases[1].version, '3.6.1');
});

test('releaseSummary prefers the first Added item', () => {
  const [latest] = parseChangelog(sample);
  assert.match(releaseSummary(latest), /Thinking Mode/);
});
