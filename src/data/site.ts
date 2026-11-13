/**
 * Home page content. Source: docs/content-brief.md (the only content source).
 * "[CONFIRM …]" values are intentional, visible placeholders: they are shown as
 * plain text (never as links) until confirmed.
 * Projects live in src/content/projects (Content Collections).
 */

export interface Metric {
  value: string;
  label: string;
  /** true when the value itself is an estimate; shows an "est." tag. */
  estimated?: boolean;
}

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
  roleLine: 'Software / AI Engineer · LLM agents, MCP & tool use',
  role: 'AI Engineer, Industry Capstone',
  company: 'UC Berkeley × Celedon',
  location: 'San Francisco Bay Area',
  openTo: 'Full-time roles in 2027 · on-site, hybrid, remote',
  headline: 'An agent should never grade its own work. I build the guardrails that let AI act on real systems.',
  subline: 'AI engineer working where agents meet production: MCP tools, hardware, and the checks around them.',
  availability: 'Open to full-time roles in 2027 (MEng ends May 2027) · on-site, hybrid, remote.',
  email: 'sebastien_callegari@berkeley.edu',
  cvHref: '/cv.pdf',
} as const;

export const isPlaceholder = (href: string) => href.startsWith('[CONFIRM');

export const links: ProfileLink[] = [
  { label: 'Email', href: isPlaceholder(person.email) ? person.email : `mailto:${person.email}` },
  { label: 'GitHub', href: 'https://github.com/Callegari-git' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastiencallegari/' },
];

export const metrics: Metric[] = [
  {
    value: '11.5 min',
    label: 'text request to a checked, printable object with a circuit inside — $6.05 of model cost',
  },
  {
    value: '15,000+',
    label: 'config changes pushed to ~4,000 EV chargers in < 1 month (vs ~4 months manual, est.)',
  },
  {
    value: '10,000',
    label: 'chargers migrated across 5 operators, scripts built in 2 weeks',
  },
  {
    value: '600,000+',
    label: 'support tickets unarchived and converted, external vendor avoided',
  },
];

/** Shown wherever an estimate appears. */
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

/** Credentials → key numbers: only facts not shown elsewhere on the home page. */
export const keyNumbers: Metric[] = [
  { value: '61,000', label: 'EVSEs mined to build firmware-level reference configs' },
  { value: '150+', label: 'tariff grids updated in 2 days of dev' },
  { value: '1,100+', label: 'automated tests across the capstone repo (team, CI on every PR)' },
];

export interface StackGroup {
  label: string;
  items: string[];
}

/** Credentials → stack groups. */
export const stackGroups: StackGroup[] = [
  { label: 'Languages', items: ['Python', 'SQL'] },
  { label: 'AI / agents', items: ['LLM agents & tool use', 'MCP', 'Claude (Anthropic API)', 'Claude Code'] },
  { label: 'Backend', items: ['FastAPI', 'Pydantic', 'Temporal', 'REST APIs'] },
  { label: 'Data', items: ['Databricks', 'PySpark', 'NumPy/SciPy'] },
  { label: 'Infra', items: ['AWS', 'Docker', 'GitHub Actions', 'pytest'] },
  { label: 'Hardware & CAD', items: ['CadQuery', 'PrusaSlicer', 'Marlin G-code', 'Creality CR-10 V2'] },
];
