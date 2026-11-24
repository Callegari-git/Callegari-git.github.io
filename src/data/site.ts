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
  /** No longer shown on the page; still used by scripts/og-image.mjs. */
  headline: 'An agent should never grade its own work. I build the guardrails that let AI act on real systems.',
  /** Meta description of the home page (no longer shown in the hero). */
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

/** "About" section: short paragraphs (max 3–4 lines each). Sources: cv.pdf + content brief. */
export const about: string[] = [
  'MEng student at UC Berkeley (Applied Science and Technology). Trained as a mechanical engineer at Arts et Métiers, then a data analytics diploma at Paris 1 Panthéon-Sorbonne. I write software that acts on real systems: EV chargers, 3D printers, production APIs.',
  'At TotalEnergies, I turned manual operations on thousands of EV chargers into audited, resumable pipelines, and shipped a FastAPI + Temporal service on AWS that provisions a full charging site from one Excel file. In my Berkeley capstone with Celedon, I lead object design, circuit tools and printer safety for an AI design agent.',
  'I like problems where software meets physical hardware, and checks that do not take the model’s word for it. Off the keyboard: rugby, daily cycling, hapkido.',
];

export const quote = {
  text: 'The first principle is that you must not fool yourself, and you are the easiest person to fool.',
  author: 'Richard Feynman',
  source: '“Cargo Cult Science,” 1974',
} as const;

export const isPlaceholder =(href: string) => href.startsWith('[CONFIRM');

/** id of the email dialog (EmailPopover.astro); Email triggers use popovertarget={EMAIL_POPOVER_ID}. */
export const EMAIL_POPOVER_ID = 'email-popover';

export const links: ProfileLink[] = [
  { label: 'Email', href: isPlaceholder(person.email) ? person.email : `mailto:${person.email}` },
  { label: 'GitHub', href: 'https://github.com/Callegari-git' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastiencallegari/' },
];

/** Shown wherever an estimate appears (case-study pages). */
export const estimateNote = 'est. = estimated from team-declared unit times.';
