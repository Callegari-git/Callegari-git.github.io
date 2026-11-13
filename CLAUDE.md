@AGENTS.md

# Portfolio — AI Engineer (SF Bay Area)

## Goal
A professional personal portfolio to land an AI engineer role in the San Francisco Bay Area.
Target reader: a recruiter or engineer who spends **less than 60 seconds** on the site.
Top priority: **clarity and credibility first, "wow" second.**

## Language
- All site content, UI copy, metadata, alt text and code comments are in **English (US)**.
- Tone: confident, concise, concrete. No buzzwords, no filler. Prefer numbers over adjectives.

## Stack (do not change without asking me)
- Astro (version installed in package.json, currently 7.x) + TypeScript (strict)
- Tailwind CSS (or plain CSS) — no UI component library
- Content Collections in Markdown for projects and experience
- Svelte only for interactive islands (AI animation, chatbot)
- GSAP only inside the animation island
- Cloudflare (or Vercel) adapter added in phase 5 only; every page `prerender = true`, only `/api/chat` is `prerender = false`
- Do not add a dependency without a written justification in your message

## Design references — what we take, what we leave
We borrow **principles** from these sites. Never copy their code, copy text, images, logos or exact visual identity.

### 1. ashwingupta.dev → base of the site (structure + tone)
Take:
- Editorial "technical review" layout: warm light background, large serif headings, sans-serif body, small uppercase monospace labels (ROLE, COMPANY, ABOUT…)
- Header: name in large type + role + current company; email / GitHub / LinkedIn links and a **Download CV** button visible above the fold
- One headline that states a clear technical point of view
- "Expertise" as 2–3 short blocks (serif title + short paragraph)
- **Quantified results** in every project (latency, cost, savings, scale)
- A "What I don't do" / working principles block
Leave:
- Justified paragraphs (uneven word spacing) → left-aligned text
- Long biographical paragraphs → max 3–4 lines per paragraph

### 2. elliott.mangham.dev → compactness
Take:
- Everything essential understandable within one screen
- Row of project previews (horizontal cards) linking to case studies
- Clear CONNECT block at the end of the page + "Book a call" / email CTA
Leave:
- Full dark theme (we keep Ashwin's light base; dark mode is optional)
- Any mention of pricing / project budgets (I am not an agency)
- The Credentials panel (removed from the home page; do not re-add it)

### 3. justus-john.com → ONE signature AI animation
Take:
- A single scroll-driven section that visualizes how an LLM works: sentence → tokens (with IDs) → embeddings → self-attention layer by layer → next token
- Minimal style, lots of whitespace, consistent with the site's typography
Leave:
- Agency / services sales narrative and client website mockups
- Mascot, multiple scroll-jacked sections: **one** animated section only, the rest of the site scrolls normally

### Global bans (seen on other Awwwards sites)
- No "Click to enter" splash screen, no loader, no full-screen WebGL hero
- No scroll-jacking outside the animation section
- No custom cursor, no sound
- Content must never wait for an animation to become readable

## Design system
- Colors: warm light background (~#F3F0E8), ink text (~#1E2430), secondary gray, **one** accent only (deep blue or burnt orange — propose 2 options)
- Type: serif display for headings (e.g. Fraunces or Playfair Display), sans-serif for body (e.g. Inter or DM Sans), mono for labels (e.g. JetBrains Mono). Load via Astro's Fonts API.
- Grid: text column max ~720px, project grids max ~1100px
- Motion: subtle transitions (opacity/translate ≤ 300ms); respect `prefers-reduced-motion` everywhere

### Decisions (from docs/design-audit.md)
- Accent: Option A, deep blue `#1C3F8F` (hover `#163478`, tint `#E8EDF7`)
- Fonts: Fraunces (display), Inter (body), JetBrains Mono (labels/data)
- Use the palette, type scale, spacing and motion tokens from docs/design-audit.md as the source of truth
- Case-study labels: Problem / Approach / Architecture / Results (do not reuse reference sites' labels)
- LLM animation: pinned for at most ~3 viewport heights, with a static labelled diagram for reduced-motion and no-JS

## Site structure
- `/`: hero (name, role, headline, links, CV) → featured projects (3) → expertise (3 blocks) → LLM animation → experience (short timeline) → principles → contact
- `/projects/[slug]`: case study = problem → approach → architecture (diagram) → quantified results → stack → links (repo, demo, paper)
- `/cv.pdf` in `public/`
- Content in `src/content/projects/*.md` and `src/content/experience/*.md` with a Zod schema (title, date, role, stack[], metrics[], links, featured)
- SEO: title + description per page, Open Graph image, sitemap

## Chatbot (phase 5, not before the site is done)
- Route `src/pages/api/chat.ts` (`prerender = false`), streamed responses
- API key only in a server-side environment variable (`.env`, never committed)
- Context: system prompt built from Content Collections + CV (no RAG at first)
- Only answers questions about me and my work; otherwise points to my email
- Guardrails: per-IP rate limit, max message length, max tokens per response
- UI: discreet button bottom-right, closed by default — the site must be 100% usable without it

## Quality bar (check before saying "done")
- Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO
- JS shipped on `/` outside the animation island: close to zero
  - Only exception: the email **Copy** button (`src/components/CopyEmail.astro`), one tiny inline script, progressive enhancement: the button stays hidden without JS or Clipboard API, and the address is always written out in full (hero + Contact) as a selectable `mailto:` link
- Responsive at 375px, 768px, 1280px
- Full keyboard navigation, WCAG AA contrast, `alt` on every image
- Adding a project = creating one Markdown file, nothing else

## Git — hands off
- **Never run `git commit` or `git push`** (nor `git add`, `git tag`, `git merge`, `git rebase`, `git reset`). I handle all commits and pushes myself.
- Read-only Git commands are fine (`git status`, `git diff`, `git log`).
- At the end of each phase, suggest a commit message I can use — do not run it.

## Working method
- Work **phase by phase**, and stop at the end of each one for my review:
  1. Design system (colors, type, layout) + home page with placeholder content
  2. Content Collections + project pages
  3. Timeline + principles + contact
  4. LLM animation
  5. Chatbot
- Before each phase: explain the plan in a few lines, then code
- When torn between "prettier" and "clearer": choose **clearer**