/**
 * Parse Keep a Changelog markdown into structured releases.
 * Shared by ingest and tests. No runtime filesystem.
 */

/**
 * @typedef {{ title: string, items: string[] }} ChangelogGroup
 * @typedef {{ version: string, date: string | null, anchor: string, groups: ChangelogGroup[] }} ChangelogRelease
 */

/**
 * @param {string} markdown
 * @returns {ChangelogRelease[]}
 */
export function parseChangelog(markdown) {
  const text = markdown.replace(/<!--[\s\S]*?-->/g, '').trim();
  const heading = /^## \[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?\s*$/gm;
  /** @type {{ version: string, date: string | null, start: number, headingLen: number }[]} */
  const found = [];
  let match;
  while ((match = heading.exec(text)) !== null) {
    found.push({
      version: match[1],
      date: match[2] ?? null,
      start: match.index,
      headingLen: match[0].length,
    });
  }

  /** @type {ChangelogRelease[]} */
  const releases = [];
  for (let i = 0; i < found.length; i++) {
    const current = found[i];
    const bodyStart = current.start + current.headingLen;
    const bodyEnd = i + 1 < found.length ? found[i + 1].start : text.length;
    const body = text.slice(bodyStart, bodyEnd).trim();
    const groups = parseGroups(body);
    if (current.version === 'Unreleased' && groups.length === 0) continue;
    releases.push({
      version: current.version,
      date: current.date,
      anchor: current.version === 'Unreleased' ? 'unreleased' : `v${current.version}`,
      groups,
    });
  }
  return releases;
}

function sanitizeItem(item) {
  return item
    .replace(/https:\/\/github\.com\/rosuH\/AICommit\/\S+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * @param {string} body
 * @returns {ChangelogGroup[]}
 */
function parseGroups(body) {
  const parts = body.split(/^### /m);
  /** @type {ChangelogGroup[]} */
  const groups = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const nl = trimmed.indexOf('\n');
    const title = (nl === -1 ? trimmed : trimmed.slice(0, nl)).trim();
    const rest = nl === -1 ? '' : trimmed.slice(nl + 1);
    if (!/^(Added|Changed|Deprecated|Removed|Fixed|Security|Improved)$/.test(title)) {
      continue;
    }
    const items = [];
    for (const line of rest.split('\n')) {
      const item = line.match(/^\s*-\s+(.+)$/);
      if (item) items.push(sanitizeItem(item[1].trim()));
    }
    if (items.length > 0) groups.push({ title, items });
  }
  return groups;
}

/**
 * One-line summary for previews: first Added/Improved item, else first item.
 * @param {ChangelogRelease} release
 */
export function releaseSummary(release) {
  const added = release.groups.find((g) => g.title === 'Added');
  const improved = release.groups.find((g) => g.title === 'Improved');
  const first = added?.items[0] ?? improved?.items[0] ?? release.groups[0]?.items[0];
  return first ?? '';
}
