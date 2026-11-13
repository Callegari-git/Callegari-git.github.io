/**
 * Home page content — PHASE 1 PLACEHOLDERS.
 *
 * Every value in this file is a placeholder. Brackets ([…]) and X-digits
 * ("XX%", "$X.XM") are intentional, so nothing fake can ship by mistake.
 * Featured projects move to Content Collections in phase 2.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ExpertiseBlock {
  title: string;
  body: string;
}

export interface FeaturedProject {
  slug: string;
  category: string;
  title: string;
  summary: string;
  metric: Metric;
  stack: string[];
}

// PLACEHOLDER — identity
export const person = {
  name: '[Your Name]',
  kicker: 'AI Engineer · San Francisco Bay Area',
  role: '[Senior AI Engineer]',
  company: '[Company]',
  location: '[City, CA]',
  headline: '[Your point of view on AI engineering — one or two lines]',
  email: 'hello@example.com',
  cvHref: '/cv.pdf',
} as const;

// PLACEHOLDER — profile links
export const links: Link[] = [
  { label: 'Email', href: `mailto:${person.email}` },
  { label: 'GitHub', href: 'https://github.com/your-handle' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
];

// PLACEHOLDER — booking link for the contact section
export const bookingHref = 'https://cal.com/your-handle';

// PLACEHOLDER — key metrics (3–4 numbers, each with a short source label)
export const metrics: Metric[] = [
  { value: '−XX%', label: 'p95 latency · [system]' },
  { value: '$X.XM/yr', label: 'inference cost saved' },
  { value: 'XXM', label: 'requests / day served' },
  { value: 'X', label: 'peer-reviewed papers' },
];

// PLACEHOLDER — expertise (3 blocks, 2–3 lines each)
export const expertise: ExpertiseBlock[] = [
  {
    title: 'LLM inference & serving',
    body: '[What you build here and the result it drives — latency, throughput or cost. Two to three lines, max.]',
  },
  {
    title: 'Retrieval & evaluation',
    body: '[How you make model outputs grounded and measurable — eval harnesses, RAG quality, regression gates.]',
  },
  {
    title: 'ML platform & reliability',
    body: '[The infrastructure side — deployment, observability, on-call — and the scale it runs at.]',
  },
];

// PLACEHOLDER — featured projects (moved to src/content/projects in phase 2)
export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'project-one',
    category: 'LLM serving',
    title: '[Project One]',
    summary: '[One line: the problem and what you shipped.]',
    metric: { value: '−XX%', label: 'p95 latency' },
    stack: ['Python', 'vLLM', 'Kubernetes'],
  },
  {
    slug: 'project-two',
    category: 'Retrieval',
    title: '[Project Two]',
    summary: '[One line: the problem and what you shipped.]',
    metric: { value: '+XX pts', label: 'answer accuracy' },
    stack: ['TypeScript', 'Postgres', 'pgvector'],
  },
  {
    slug: 'project-three',
    category: 'Evaluation',
    title: '[Project Three]',
    summary: '[One line: the problem and what you shipped.]',
    metric: { value: '$XXK/yr', label: 'compute saved' },
    stack: ['Python', 'PyTorch', 'Airflow'],
  },
];
