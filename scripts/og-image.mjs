// Generates public/og.png (1200×630) for Open Graph / Twitter cards.
// Usage: npm run og   (needs a local Chrome; override the path with CHROME_PATH=…)
// No npm dependency: text comes from src/data/site.ts (Node 24 strips TS types natively),
// rendering is done by headless Chrome. Commit the resulting public/og.png.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { person } from '../src/data/site.ts';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const out = join(root, 'public', 'og.png');
const chrome =
  process.env.CHROME_PATH ??
  {
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }[process.platform] ??
  'google-chrome';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Colors mirror the tokens in src/styles/global.css.
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400..600&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body { background: #f3f0e8; color: #4a5262; font-family: Inter, sans-serif; padding: 72px 80px;
         display: flex; flex-direction: column; border-top: 12px solid #1c3f8f; }
  .label { font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 20px; letter-spacing: .08em;
           text-transform: uppercase; color: #636b7a; }
  h1 { font-family: Fraunces, serif; font-weight: 400; font-size: 92px; line-height: 1.05; letter-spacing: -.03em;
       color: #1e2430; margin-top: 20px; font-optical-sizing: auto; }
  .headline { font-family: Fraunces, serif; font-size: 40px; line-height: 1.2; letter-spacing: -.01em; color: #1e2430;
              margin-top: 36px; max-width: 980px; }
  .foot { margin-top: auto; display: flex; gap: 28px; font-size: 24px; padding-top: 24px; border-top: 2px solid #d9d4c8; }
  .foot b { color: #1c3f8f; font-weight: 600; }
</style></head>
<body>
  <p class="label">${esc(person.roleLine)}</p>
  <h1>${esc(person.name)}</h1>
  <p class="headline">${esc(person.headline)}</p>
  <p class="foot"><b>${esc(person.location)}</b><span>${esc(person.openTo)}</span></p>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const page = join(dir, 'og.html');
writeFileSync(page, html);
try {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=8000', // let web fonts load before the screenshot
    `--screenshot=${out}`,
    `file://${page}`,
  ], { stdio: 'ignore' });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
