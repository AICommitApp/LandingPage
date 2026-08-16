import changelogData from '@/lib/changelog-data.json';
import { MARKETPLACE_URL } from '@/lib/seo';

export type ChangelogGroup = {
  title: string;
  items: string[];
};

export type ChangelogRelease = {
  version: string;
  date: string | null;
  anchor: string;
  groups: ChangelogGroup[];
};

export const CHANGELOG_RELEASES = changelogData.releases as ChangelogRelease[];

export const PLUGIN_DESCRIPTION_URL = MARKETPLACE_URL;

export const changelogHref = (version: string) =>
  `/changelog#${version === 'Unreleased' ? 'unreleased' : `v${version}`}`;

export function releaseSummary(release: ChangelogRelease): string {
  const added = release.groups.find((group) => group.title === 'Added');
  const improved = release.groups.find((group) => group.title === 'Improved');
  return added?.items[0] ?? improved?.items[0] ?? release.groups[0]?.items[0] ?? '';
}

export const RECENT_RELEASES = CHANGELOG_RELEASES.slice(0, 2).map((release) => ({
  version: release.version,
  date: release.date ?? '',
  summary: releaseSummary(release),
  href: changelogHref(release.version),
}));
