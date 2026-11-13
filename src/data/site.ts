/**
 * Home page content. Source: docs/content-brief.md (the only content source).
 * "[CONFIRM …]" values are intentional, visible placeholders: they are shown as
 * plain text (never as links) until confirmed.
 * Projects live in src/content/projects (Content Collections).
 */

export interface ProfileLink {
  label: string;
  /** A URL / mailto, or a "[CONFIRM …]" placeholder rendered as text. */
  href: string;
}

export interface ExpertiseBlock {
  title: string;
  body: string;
}

export const person = {
  name: 'Sébastien Callegari',
  /** Used by the OG image and its alt text. */
  roleLine: 'Software / AI Engineer · LLM agents, MCP & tool use',
  /** Hero kicker (mono label above the name). */
  kicker: 'Software / AI Engineer · San Francisco Bay Area · Open to full-time roles in 2027',
  /** Hero sub-line under the name. */
  tagline: 'Engineer · ML, LLM agents & automation in production',
  location: 'San Francisco Bay Area',
  openTo: 'Full-time roles in 2027 · on-site, hybrid, remote',
  headline: 'An agent should never grade its own work. I build the guardrails that let AI act on real systems.',
  subline: 'AI engineer working where agents meet production: MCP tools, hardware, and the checks around them.',
  availability: 'Open to full-time roles in 2027 (MEng ends May 2027) · on-site, hybrid, remote.',
  email: 'sebastien_callegari@berkeley.edu',
  cvHref: '/cv.pdf',
} as const;

/** Hero label/value list. No Celedon mention in the hero. */
export const heroFacts = {
  schools: ['UC Berkeley', 'Arts et Métiers', 'Paris 1 Panthéon-Sorbonne'],
  focus: ['ML', 'LLM agents', 'MCP', 'Backend', 'Data'],
  now: {
    title: 'Software / AI Engineer',
    org: 'UC Berkeley',
  },
} as const;

export const isPlaceholder = (href: string) => href.startsWith('[CONFIRM');

/** id of the email dialog (EmailPopover.astro); Email triggers use popovertarget={EMAIL_POPOVER_ID}. */
export const EMAIL_POPOVER_ID = 'email-popover';

export const links: ProfileLink[] = [
  { label: 'Email', href: isPlaceholder(person.email) ? person.email : `mailto:${person.email}` },
  { label: 'GitHub', href: 'https://github.com/Callegari-git' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastiencallegari/' },
];

/** Shown wherever an estimate appears (case-study pages). */
export const estimateNote = 'est. = estimated from team-declared unit times.';

export const expertise: ExpertiseBlock[] = [
  {
    title: 'Agentic systems with guardrails',
    body: 'MCP servers that expose campaign-level tools, never raw hardware; frozen specs, human approval before any build, independent verification from raw files.',
  },
  {
    title: 'Production automation at scale',
    body: 'API pipelines with pre-checks, staged rollout, per-object audit logs and selective replay; from scripts to services (FastAPI).',
  },
  {
    title: 'Data engineering for operations',
    body: 'Databricks / PySpark on fleet data: latest-snapshot joins, normalization, reconciliation across sources.',
  },
];

/** "How I work" — 5 principles from the brief. */
export const principles: string[] = [
  'Understand the process before automating it; run on a sample before the full scope.',
  'Every action leaves a trace; a failed run resumes without replaying what succeeded.',
  'The agent proposes, our code checks, a person approves. The agent never grades itself.',
  'A tool only one person can run is a new dependency, not a solved problem.',
  'Say what is simulated, estimated or not yet verified.',
];
