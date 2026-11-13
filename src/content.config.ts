import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * A link is either a real URL or a visible "[CONFIRM …]" placeholder,
 * which the site renders as plain text (never as a link).
 */
const linkOrConfirm = z.union([
  z.url(),
  z.string().startsWith('[CONFIRM'),
]);

const metric = z.object({
  value: z.string(),
  label: z.string(),
  /** true when the value itself is an estimate; the site shows an "est." tag. */
  estimated: z.boolean().optional(),
});

// Files starting with "_" (e.g. _template.md) are ignored.
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Must match the filename; used as the URL: /projects/<slug> */
    slug: z.string(),
    summary: z.string(),
    category: z.string(),
    /** Start date (used for the period line). */
    date: z.coerce.date(),
    /** End date; omit for "present". */
    end: z.coerce.date().optional(),
    role: z.string(),
    status: z.enum(['production', 'prototype', 'ongoing']),
    /** Visible "[CONFIRM …]" text shown instead of the status badge. */
    statusConfirm: z.string().startsWith('[CONFIRM').optional(),
    /** Set for team projects, e.g. "Team of 4 · I led …". */
    team: z.string().optional(),
    /** Academic advisor, for school projects. */
    advisor: z.string().optional(),
    /** Page-level "[CONFIRM …]" notes shown under the case-study header. */
    confirm: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** Sort order across all projects (home page and previous/next). */
    order: z.number().int(),
    /** false = listed as a card with no link and no case-study page. */
    page: z.boolean().default(true),
    stack: z.array(z.string()),
    /** The first metric is the card's highlight. */
    metrics: z.array(metric).default([]),
    links: z
      .object({
        repo: linkOrConfirm.optional(),
        demo: linkOrConfirm.optional(),
        slides: linkOrConfirm.optional(),
        project: linkOrConfirm.optional(),
      })
      .default({}),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    /** 2–3 highlights, numbers kept. */
    highlights: z.array(z.string()).max(3).default([]),
    /** Related case study (project slug), shown as a "Case study →" link. */
    project: reference('projects').optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/education' }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    details: z.string().optional(),
  }),
});

export const collections = { projects, experience, education };
