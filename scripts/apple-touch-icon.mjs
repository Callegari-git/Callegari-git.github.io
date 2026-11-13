// Generates public/apple-touch-icon.png (180×180) from public/favicon.svg.
// Usage: npm run icons   (needs a local Chrome; see scripts/chrome-screenshot.mjs)
// iOS fills transparency with black and applies its own rounded mask, so the icon is
// rendered full-bleed on the favicon's background color (no transparent corners).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { screenshot } from './chrome-screenshot.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'), 'utf8');
const SIZE = 180;
// Background = the favicon's own fill, so the rounded corners blend into a solid square.
const bg = svg.match(/<rect[^>]*fill="(#[0-9a-fA-F]{3,8})"/)?.[1] ?? '#1E2430';

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html, body { margin: 0; width: ${SIZE}px; height: ${SIZE}px; background: ${bg}; }
  svg { display: block; width: ${SIZE}px; height: ${SIZE}px; }
</style></head>
<body>${svg.replace(/<svg([^>]*)\swidth="[^"]*"\s*height="[^"]*"/, '<svg$1')}</body></html>`;

screenshot(html, join(root, 'public', 'apple-touch-icon.png'), SIZE, SIZE);
