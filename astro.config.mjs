// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { SITE_URL, isPlaceholderSite } from './site.config.mjs';

if (isPlaceholderSite) {
  console.warn(`\n[site] SITE_URL is still the placeholder (${SITE_URL}). [CONFIRM: domain] in site.config.mjs\n`);
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Self-hosted fonts via Astro's Fonts API (see docs/design-audit.md → "Type trio").
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      // Optical-size axis: crisp at 24px, refined at 64px (font-optical-sizing: auto).
      options: { experimental: { variableAxis: { opsz: [['9', '144']] } } },
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  // No syntax highlighting: the only code blocks are plain-text architecture flows,
  // styled by .case-body pre in global.css.
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
