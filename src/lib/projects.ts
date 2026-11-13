import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

/** All projects, sorted by `order`. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort(byOrder);
}

/** Featured projects (home page cards). */
export async function getFeatured(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

/** Non-featured projects ("More projects" list). */
export async function getMore(): Promise<Project[]> {
  return (await getProjects()).filter((p) => !p.data.featured);
}

/** Projects that have a case-study page (previous/next navigation). */
export async function getPaged(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.page);
}

/** Trailing slash = the URL the static build serves (and the canonical URL). */
export const projectHref = (p: Project) => `/projects/${p.id}/`;

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "Mar 2026" */
export const formatMonth = (date: Date) => monthYear.format(date);

/** "Mar 2026 – Aug 2026" or "Sep 2026 – present". */
export function formatPeriod(start: Date, end?: Date): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'present'}`;
}

export const isUrl = (value: string) => /^https?:\/\//.test(value);

export const statusLabel: Record<Project['data']['status'], string> = {
  production: 'In production',
  prototype: 'Prototype',
  ongoing: 'Ongoing',
};

/** Trim to ~155 characters on a word boundary, for meta descriptions. */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
}
