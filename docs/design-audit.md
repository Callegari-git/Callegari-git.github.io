# Design audit — reference sites

Read-only audit, run on 2026-11-13 with headless Chrome at 1280×800 (desktop) and 375×812 (mobile).
Values come from computed styles (`getComputedStyle`), not from the sites' source code.
No code, copy text, images or logos were taken. This file records **principles only**.

Legend: ✅ **Take** (matches CLAUDE.md "Take") · ⛔ **Leave** (matches "Leave" or a global ban) · ℹ️ observation only

---

## 1. ashwingupta.dev: base of the site (structure + tone)

### Typography
| Role | Family (free?) | Desktop | Mobile | Line-height | Weight / tracking |
|---|---|---|---|---|---|
| Display (name, h1) | Playfair Display (free, Google) | 66.5px | 40px | 1.2 | 400, −0.035em |
| Section heading (h2) | Playfair Display | 33px | 29px | 1.2 | 400, −0.035em |
| Card / role title (h3) | Playfair Display | 25px | 25px | 1.2 | 400, −0.035em |
| Expertise block title | Playfair Display | 22px | 22px | 1.6 | 400 |
| Body | DM Sans (free, Google) | 16px | 15px | 1.7–1.8 | 400 (600 for emphasis) |
| Secondary body | DM Sans | 13–14px | 13–14px | 1.7–1.8 | 400 |
| Labels (ROLE, ABOUT…) | DM Mono (free, Google) | 9–11px | 9–10px | 1.6–1.8 | 400, uppercase, +0.06–0.08em |

- ✅ The trio "serif display / humanist sans body / mono uppercase labels" is the core of the editorial look.
- ✅ Headings use **one weight (400)** with negative tracking. Hierarchy comes from size and family, not from bold.
- ⛔ 9–10px mono labels are too small to read comfortably. We use ≥ 11px.

### Colors (approx.)
| Token | Hex | Note |
|---|---|---|
| Background | `#F4F0E7` | warm paper, single flat color |
| Ink (headings) | `#1D293B` | blue-black, not pure black |
| Secondary text (body!) | `#536176` | most paragraph text is in this gray (5.5:1 on bg) |
| Hairline rules | `#CCD2DD` | 1px, used as section separators |
| Accent | `#244AC0` | blue, used very sparingly (active nav index, links, tabs) |
| Tint surface | `#E9EDF6` | light accent tint for a few highlighted blocks |

- ✅ One accent used in under 1% of the text. Dividers and whitespace do the work, not color.
- ✅ Ink is reserved for headings and key numbers; body sits one step lighter → the eye lands on titles first.

### Spacing and grid
- Masthead: 64px side margins, 28px vertical padding, closed by a **2px ink rule**.
- Desktop layout: **sticky left sidebar** (196px) + 1px vertical rule + main column starting at x≈305px (951px wide, max page width 1440px). Paragraphs capped at **760px**.
- Section rhythm: 35px top / 45px bottom padding + 1px hairline between sections → ~80px between sections. Compact and readable.
- Two-column inside sections: narrative left, expertise blocks right (each topped by a hairline).
- Mobile: single column, sidebar removed, 44px side gutters (too wide: 23% of a 375px screen is lost).

### Structure (section order)
1. Masthead: monogram + publication-style name; topic labels on the right
2. Hero: one-line mono kicker stating a point of view → name (h1) → **ROLE / COMPANY** label-value pairs
3. About: POV headline (h2) + one-line subline + narrative + 2–3 **expertise blocks**
4. Experience timeline: serif title, mono dates aligned right, bulleted outcomes **with numbers in each bullet**
5. Results by domain: tabbed list of metrics (bold number + short description + mono source label)
6. Featured work: 2-col cards: mono category → serif title → one-line summary → **PROBLEM / METHOD / SYSTEM DESIGN / INSIGHT** label grid
7. More projects → recommendations → stack → contact → footer

**Above the fold (1280×800):** kicker, name, role, company, start of About headline.
⚠️ On desktop, the email / GitHub / LinkedIn icons and **Download CV** sit at the bottom of the sticky sidebar (y≈850px), so they are **just below the fold** at 800px height. On mobile they are in the header, above the fold. We must do better: links + CV visible at 1280×800.

### Motion
- ℹ️ No CSS transitions or animations detected. No animation library. Only a JS **scrollspy** that highlights the current section in the sidebar nav (color change).
- ✅ Content is readable immediately. Nothing waits for motion.

### Retained principles
- ✅ Editorial "technical review" layout on warm paper; large serif headings, sans body, small uppercase mono labels.
- ✅ Header: name in large type + role + company as label/value pairs.
- ✅ A single headline that states a technical point of view, right after the name.
- ✅ Expertise as 2–3 short blocks (serif title + 2–3 line paragraph), separated by hairlines.
- ✅ **Every project and role line carries a number** (latency, cost, scale, accuracy).
- ✅ Case-study card grid with labelled rows (problem / method / design / result). This maps directly to our `/projects/[slug]` structure.
- ✅ Mono dates right-aligned in the timeline; hairline rules instead of boxes/shadows.
- ✅ Numbered section index (00, 01, 02…) in the accent color: a cheap, zero-JS way to signal structure.
- ⛔ **Justified paragraphs**: visible "rivers" on mobile (a 3-word headline stretched across the full width). We use left-aligned text everywhere.
- ⛔ **Long biographical paragraphs** (About runs ~10 lines at 760px). We cap paragraphs at 3–4 lines.
- ⛔ Very long single page (13,900px desktop, 24,100px mobile). Too long for a 60-second reader. We keep the home page short and move depth into case studies.
- ⛔ Sticky sidebar navigation: adds complexity and hides links on mobile. Not needed for our shorter page.
- ⛔ Wide 44px mobile gutters. We use 20px.

---

## 2. elliott.mangham.dev: compactness + credentials

### Typography
| Role | Family | Free equivalent | Desktop | Mobile | Line-height | Weight |
|---|---|---|---|---|---|---|
| Intro statement | Neue Montreal (commercial) | Inter / Geist | 30px | 24px | 1.2 | 500 |
| Credentials, labels, links | Roobert Mono (commercial) | JetBrains Mono / Geist Mono | 11px | 12–13px | 1.2 | 400 (700 for name) |
| Tag chips ("Highlights"…) | Roobert Mono on 10% white chip | same | 11px | 12px | 1.2 | 400 |
| UI pills (Projects / Awards) | Neue Montreal | Inter | 11px | 11px | 1.0 | 400, capitalized |

- ℹ️ Only two families, no serif. Almost everything except the intro is 11–13px mono: dense, "terminal" feel.
- ✅ Mono for factual data (dates, numbers, lists) reads as "data", which builds credibility.

### Colors (approx.)
| Token | Hex |
|---|---|
| Background | `#121212` |
| Text | `#FFFFFF`, with 80% / 60% / 40% opacity for secondary levels |
| Chips / surfaces | white at 10–20% opacity |
| Accent | `#5E2BFF` violet (status dot, tiny highlights only) |

- ⛔ Full dark theme. We keep the light base.
- ✅ Secondary levels via one ink at several opacities: simple, consistent. We use fixed hex values instead (more predictable contrast).

### Spacing and grid
- Desktop: **5 equal columns** (216px each, 40px gutters, 20px outer margins) holding all credentials in the top 250px of the screen.
- Intro statement spans full width (1240px) below. Too long per line (~110 characters).
- Mobile: 12px outer margins; credentials collapse behind a header toggle (`CREDENTIALS OPEN[+]`).

### Structure
1. Credentials band (5 columns): identity + location; current role & dates; awards & highlights; client list; contact links + booking CTA
2. Intro statement (2 short paragraphs)
3. Horizontal row of project previews (screenshot cards) with a Projects / Awards toggle
4. Mobile only: **CONNECT** block (dot + label, list of links, booking line, full-width "Schedule a call" button)

**Above the fold:** everything. Identity, numbers, awards, contact, CTA and the first project previews all fit in one 1280×800 screen. That is the main lesson of this site.

### Motion
- Intro: staggered clip/opacity reveals of the credential columns (0.3–0.4s each, `cubic-bezier(0.75,0,0.25,1)`). At 6s after load some columns were still mid-reveal.
- **Smooth-scroll library (Lenis)** + vertical scroll converted into **horizontal motion** of the project row (page is 3,200px tall for 800px of content).
- Hover transitions 0.2–0.3s on links, buttons and images (image scale 0.6s).
- Infinite CSS animations: blinking live clock, ticker, spinner.
- ℹ️ 4 `prefers-reduced-motion` rules present.

### Retained principles
- ✅ **Everything essential in one screen**: name, role, key numbers, credentials, contact, first projects.
- ✅ Credentials as a **dense, scannable block** of short facts (degrees, awards, numbers), collapsible on small screens. We implement it as `<details>/<summary>` (zero JS), open by default on desktop if space allows.
- ✅ Small tag chips as **group labels** inside the credentials block (e.g. EDUCATION, PUBLICATIONS).
- ✅ Row of horizontal project preview cards linking to case studies. We use a normal grid that scrolls normally, not scroll-driven.
- ✅ Clear **CONNECT** block at the end: label, 3–4 links, one primary CTA ("Book a call" / email).
- ✅ Hover feedback at 200–300ms, opacity/translate only.
- ⛔ Full dark theme.
- ⛔ **Pricing / project budgets** in the credentials band.
- ⛔ Scroll-jacking (vertical scroll → horizontal carousel, smooth-scroll library sitewide).
- ⛔ Intro reveal animations: content waits several seconds before it is readable.
- ⛔ Decorative infinite animations (blinking clock, ticker).
- ⛔ Personal-life details in the intro (family, hobbies). Off-target for a recruiter skim.
- ⛔ 11px body-level text and ~110-character lines. Fails our readability bar.

---

## 3. justus-john.com: one signature AI animation

### Typography
| Role | Family (free?) | Desktop | Mobile | Line-height | Weight / tracking |
|---|---|---|---|---|---|
| Display (h1, act titles) | Instrument Serif (free, Google) | 90–102px | 42px | 1.0–1.04 | 400, −0.01 to −0.015em |
| Section headings (h2/h3) | Instrument Serif | 34–58px | 34–42px | 1.03–1.1 | 400 |
| Body | Inter (free, Google) | 15px (lead 21.6px) | 15px | 1.5–1.65 | 400 |
| Kicker / nav labels | Inter | 10–12.5px | — | 1.5 | 600, uppercase, +0.15–0.2em |
| Tokens, IDs, code | JetBrains Mono (free, Google) | 10–13px (24px hero subline) | — | 1.5 | 400–700 |

- ✅ Mono is used **inside the animation** for tokens and their numeric IDs. That's the right "this is real data" signal.
- ✅ Same serif/sans/mono trio logic as Ashwin, which confirms the trio works for both the editorial pages and the animation.

### Colors (approx.)
| Token | Hex |
|---|---|
| Background | `#FAF9F7` (near-white, barely warm) |
| Ink | `#161513` |
| Secondary text | `#6F6A62` (warm gray, 4.7:1) |
| Hairlines | ink at 9% / 16% opacity |
| Accent | `#B5470B` burnt orange (cursor, highlighted token, links, CTA) |
| Animation palette | muted ochre / terracotta / gray chips for embedding values |

- ✅ The animation uses a **restricted palette derived from the accent** (tints of one hue + grays), so it stays consistent with the site.

### Spacing and grid
- Generous whitespace: hero padding 96px top/bottom; content capped at 736px (hero), 760–900px (text), 1000–1280px (wide).
- Pinned scenes are 100vh with a single element centered. Lots of empty space around each visual.
- Top progress bar (2px) shows scroll progress.

### Structure
1. Header: wordmark, language switch, menu, "start a project" CTA
2. Hero: serif headline + mono subline with typing cursor + mascot
3. Four pinned **"acts"** (services): software layers, **AI/LLM**, websites, another service. Each 5,000–8,800px of scroll
4. Mini-game → process steps → contact → footer

**Above the fold:** headline, subline, mascot, header CTA. No proof (no projects, no numbers) on the first screen.

### The LLM sequence (act 2, ~7,200px of scroll)
Observed in order, all driven by scroll position:
1. A prompt is **typed** into a minimal input card (blinking cursor).
2. The sentence splits into **token chips**, each with its **numeric ID** below, in mono.
3. Each token becomes a **column of colored squares** (embedding vector) on a horizontal baseline.
4. **Attention arcs** connect token columns.
5. A stacked card shows a small network with a **"layer N/12"** counter flipping through layers, labelled *feed-forward*.
6. The next token is predicted and appended (**autoregressive**) with a probability readout, then the sequence loops into the next step.

Implementation signals: GSAP + ScrollTrigger + Lenis + SplitType, three `<canvas>` elements, one `<video>`. Transitions 0.35–0.6s with `cubic-bezier(0.16,1,0.3,1)` (expo-out). 4 reduced-motion rules present.

### Retained principles
- ✅ **One** scroll-driven section that tells the LLM story in clear steps: sentence → tokens (with IDs) → embeddings → attention, layer by layer → next token.
- ✅ Each step shows **one idea at a time**, centered, with a short mono caption (e.g. "tokens", "feed-forward", "layer 7/12").
- ✅ Minimal style: white cards, hairline borders, soft shadow, palette = accent tints + grays, lots of whitespace.
- ✅ Real-looking data (token IDs, vector values, layer counter) makes the animation credible to engineers.
- ✅ Expo-out easing for entering elements.
- ✅ Our version: pinned for at most ~3 viewport heights, with a **static fallback** (a labelled diagram of the 5 steps) for `prefers-reduced-motion` and no-JS. The text explanation must be readable without the animation.
- ⛔ Agency / services narrative ("start a project", service acts, client website mockups).
- ⛔ **Mascot**, mini-game, typing-cursor hero.
- ⛔ **Multiple** pinned scroll sections (four acts, ~27,000px of pinned scroll) and sitewide smooth-scroll (Lenis). Only the LLM section scrolls specially on our site.
- ⛔ Hero with no proof above the fold. Ours shows role, company, POV, links and CV immediately.
- ⛔ Language-switch toast overlapping content.

---

## Proposed design system

### Palette
Contrast ratios computed against the background `#F3F0E8` (WCAG AA: ≥ 4.5 for text, ≥ 3 for large text and UI).

| Token | Hex | Contrast on bg | Use |
|---|---|---|---|
| `--bg` | `#F3F0E8` | — | page background (warm paper) |
| `--surface` | `#FBF9F4` | — | cards, animation panels, `<details>` body |
| `--ink` | `#1E2430` | 13.7 | headings, key numbers, primary text |
| `--ink-2` | `#4A5262` | 6.9 | body text |
| `--muted` | `#636B7A` | 4.7 | labels, dates, captions (AA at any size) |
| `--rule` | `#D9D4C8` | 1.3 | 1px hairlines and borders (decorative only) |

**Accent: pick one.**

| Option | Accent | Hover / pressed | Tint (bg for highlights) | Contrast on bg | White text on accent |
|---|---|---|---|---|---|
| **A: Deep blue** | `#1C3F8F` | `#163478` | `#E8EDF7` | 8.6 | 9.7 |
| **B: Burnt orange** | `#A3401A` | `#82320F` | `#F6E7DC` | 5.6 | 6.4 |

- **A (deep blue)** reads as "engineering / research", gives very high contrast, and pairs naturally with the blue-black ink. Safest and clearest. It's deeper and less saturated than Ashwin's blue, so it doesn't copy it.
- **B (burnt orange)** is warmer and more distinctive on paper, and makes the LLM animation pop (token highlights, attention arcs). It needs more care: AA for body links, but don't use it for long text. It's redder and darker than Justus John's orange.
- Either way: accent appears only on links, the active/focus state, section index numbers, the primary CTA and highlighted elements in the animation. Embedding squares in the animation use tints of the accent + `--muted` / `--rule` grays.

### Type trio (free, Google Fonts, loaded via Astro's Fonts API)
| Role | Font | Why |
|---|---|---|
| Display / headings | **Fraunces** (variable, `opsz` + `wght`) | Editorial serif like the references, but not Playfair (Ashwin) or Instrument Serif (Justus). The optical-size axis keeps it crisp at 24px and elegant at 64px. Use weight 400–500 with a mid-range `opsz`; skip the "wonky"/soft axes for a sober look. |
| Body / UI | **Inter** (variable) | Very legible at 16–17px, tabular figures for metrics (`font-variant-numeric: tabular-nums`). |
| Labels / data / tokens | **JetBrains Mono** | Uppercase labels, dates, metrics sources, token IDs in the animation. |

Fallback: Playfair Display / DM Sans / DM Mono are the closest alternatives if you prefer a softer body face. All are OFL.

### Type scale
Fluid between 375px and 1280px; ratio ≈ 1.25 for small steps, larger jumps for display.

| Token | Size (mobile → desktop) | Line-height | Font / weight / tracking |
|---|---|---|---|
| `--text-label` | 11px → 12px | 1.4 | Mono 500, uppercase, +0.08em |
| `--text-sm` | 14px → 15px | 1.5 | Inter 400 |
| `--text-base` | 16px → 17px | 1.6 | Inter 400 |
| `--text-lead` | 18px → 20px | 1.5 | Inter 400 |
| `--text-h3` | 20px → 24px | 1.25 | Fraunces 500, −0.01em |
| `--text-h2` | 28px → 36px | 1.15 | Fraunces 400, −0.02em |
| `--text-h1` (name / display) | 40px → 64px | 1.05 | Fraunces 400, −0.03em |
| `--text-metric` | 24px → 32px | 1.1 | Inter 600, tabular-nums |

Rules: left-aligned everywhere, paragraphs ≤ 3–4 lines, body line length 60–75 characters (≈ 720px column at 17px).

### Spacing scale (4px base)
| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | icon gaps, chip padding (vertical) |
| `--space-2` | 8 | label → value |
| `--space-3` | 12 | list items |
| `--space-4` | 16 | paragraph spacing, card padding (mobile) |
| `--space-5` | 24 | card padding (desktop), grid gap |
| `--space-6` | 32 | heading → content |
| `--space-7` | 48 | block separation inside a section |
| `--space-8` | 64 | section padding (mobile) |
| `--space-9` | 96 | section padding (desktop) |
| `--space-10` | 128 | before/after the animation section |

### Layout
- Containers: text column `max-width: 720px`; project grids `max-width: 1100px`; full-bleed only for the animation section.
- Side gutters: 20px (375) · 32px (768) · 48–64px (1280).
- Sections separated by a 1px `--rule` hairline + `--space-8`/`--space-9` padding. No boxes, no heavy shadows.
- Section header pattern: mono label (with optional `01`-style index in accent) → serif h2 → content.
- Grid: 1 column (375) → 2 columns (768) → 3 columns for featured projects (1280).
- Above the fold at 1280×800: name, role, company, POV headline, email / GitHub / LinkedIn, **Download CV** button. At 375px: same items in the first ~1.5 screens, links + CV before the headline paragraph.

### Motion
| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | color / underline on hover, focus ring |
| `--dur-base` | 200ms | buttons, `<details>` chevron |
| `--dur-slow` | 300ms | card hover (translateY −2px), optional fade-in |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | elements entering |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | state changes |

- Opacity and transform only; nothing longer than 300ms outside the animation island.
- No load/intro animation, no smooth-scroll library, no scroll-jacking outside the LLM section.
- `@media (prefers-reduced-motion: reduce)`: all transitions set to ~0ms; the LLM section renders its static, labelled diagram.
