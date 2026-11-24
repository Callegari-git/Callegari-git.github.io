// Generates the case-study charts as static SVG files in src/assets/charts/.
// Usage: npm run charts
// No npm dependency. Every number below comes from the project Markdown (src/content/projects/*.md);
// update both together. Colors mirror the tokens in src/styles/global.css.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const outDir = join(root, 'src', 'assets', 'charts');
mkdirSync(outDir, { recursive: true });

const C = {
  ink: '#1e2430',
  ink2: '#4a5262',
  muted: '#636b7a',
  rule: '#d9d4c8',
  accent: '#1c3f8f',
  tint: '#e8edf7',
  surface: '#fbf9f4',
};

const r = (n) => Math.round(n * 10) / 10;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = (w, h, body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<style>
  text { font-family: Helvetica, Arial, sans-serif; font-size: 12px; fill: ${C.ink2}; }
  .mono { font-family: Menlo, Consolas, 'Courier New', monospace; font-size: 10px; letter-spacing: 0.08em; fill: ${C.muted}; }
  .b { font-weight: bold; fill: ${C.ink}; }
  .s { font-size: 11px; fill: ${C.muted}; }
  .a { fill: ${C.accent}; font-weight: bold; }
</style>
<defs>
  <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="6" height="6" fill="${C.surface}"/>
    <line x1="0" y1="0" x2="0" y2="6" stroke="${C.muted}" stroke-width="1.5" opacity="0.55"/>
  </pattern>${defs}
</defs>
${body}
</svg>
`;

const text = (x, y, s, cls = '', anchor = 'start') =>
  `<text x="${r(x)}" y="${r(y)}"${cls ? ` class="${cls}"` : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>${esc(s)}</text>`;
const line = (x1, y1, x2, y2, stroke, extra = '') =>
  `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${stroke}"${extra ? ' ' + extra : ''}/>`;
const rect = (x, y, w, h, fill, extra = '') =>
  `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="${fill}"${extra ? ' ' + extra : ''}/>`;

function write(name, content) {
  writeFileSync(join(outDir, name), content);
  console.log(`src/assets/charts/${name}`);
}

/* ------------------------------------------------------------------ 1. EV network automation
 * Manual duration (estimated from team-declared unit times) vs with automation, in months.
 * "< 1 month" is drawn at its upper bound (1 month); 2 weeks = 0.5 month.
 */
{
  const W = 720, H = 246;
  const x0 = 230, x1 = 690, max = 4;
  const sx = (m) => x0 + (m / max) * (x1 - x0);
  const groups = [
    {
      title: 'HPC network campaign',
      sub: '15,000+ config changes',
      manual: { v: 4, label: '~4 months' },
      auto: { v: 1, label: '< 1 month' },
    },
    {
      title: 'Joint-venture migration',
      sub: '~10,000 chargers, 5 operators',
      manual: { v: 4, label: '~4 months' },
      auto: { v: 0.5, label: '2 weeks to build the scripts' },
    },
  ];
  let b = '';
  // Legend
  b += rect(x0, 8, 14, 10, 'url(#hatch)', `stroke="${C.muted}" stroke-width="0.75"`);
  b += text(x0 + 20, 17, 'By hand (est.)', 's');
  b += rect(x0 + 130, 8, 14, 10, C.accent);
  b += text(x0 + 150, 17, 'With automation', 's');
  // Grid
  const gy0 = 34, gy1 = 222;
  for (let m = 0; m <= max; m++) {
    b += line(sx(m), gy0, sx(m), gy1, m === 0 ? C.ink2 : C.rule, m === 0 ? '' : 'stroke-dasharray="3 3"');
    b += text(sx(m), gy1 + 16, m === 0 ? '0' : `${m} mo`, 's', 'middle');
  }
  groups.forEach((g, i) => {
    const top = 48 + i * 92;
    b += text(0, top + 18, g.title, 'b');
    b += text(0, top + 34, g.sub, 's');
    const bh = 22;
    b += rect(x0, top, sx(g.manual.v) - x0, bh, 'url(#hatch)', `stroke="${C.muted}" stroke-width="0.75"`);
    b += text(sx(g.manual.v) - 8, top + 15, g.manual.label, 'b', 'end');
    b += rect(x0, top + bh + 6, sx(g.auto.v) - x0, bh, C.accent);
    b += text(sx(g.auto.v) + 8, top + bh + 6 + 15, g.auto.label, 'a');
  });
  write('ev-automation-time.svg', svg(W, H, b));
}

/* ------------------------------------------------------------------ 2. Physical Loop: calibration
 * Step response of a first-order RC system, y = 1 - exp(-t/τ), on the simulated bench.
 * Bench τ = 1.0 s (dots), initial model τ = 0.5 s, fitted model τ = 1.0006 s.
 * Validation NRMSE 0.0067 and 0.0041 vs a 0.02 pass threshold.
 */
{
  const W = 720, H = 300;
  const step = (tau) => (t) => 1 - Math.exp(-t / tau);
  // Left panel: step response
  const px0 = 46, px1 = 410, py0 = 52, py1 = 246, tMax = 5;
  const X = (t) => px0 + (t / tMax) * (px1 - px0);
  const Y = (v) => py1 - v * (py1 - py0);
  const path = (f) => {
    const pts = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * tMax;
      pts.push(`${i ? 'L' : 'M'}${r(X(t))},${r(Y(f(t)))}`);
    }
    return pts.join(' ');
  };
  let b = '';
  b += text(0, 12, 'STEP RESPONSE · SIMULATED RC BENCH', 'mono');
  // Legend
  b += `<circle cx="6" cy="31" r="3" fill="${C.ink}"/>` + text(14, 35, 'bench, τ = 1.0 s', 's');
  b += line(120, 31, 140, 31, C.muted, 'stroke-width="1.5" stroke-dasharray="4 3"') + text(146, 35, 'initial model, τ = 0.5 s', 's');
  b += line(282, 31, 302, 31, C.accent, 'stroke-width="2"') + text(308, 35, 'fitted, τ = 1.0006 s', 'a');
  // Axes + grid
  for (const v of [0, 0.5, 1]) {
    b += line(px0, Y(v), px1, Y(v), v === 0 ? C.ink2 : C.rule, v === 0 ? '' : 'stroke-dasharray="3 3"');
    b += text(px0 - 8, Y(v) + 4, v.toFixed(1), 's', 'end');
  }
  for (let t = 0; t <= tMax; t++) {
    b += line(X(t), py1, X(t), py1 + 4, C.ink2);
    b += text(X(t), py1 + 18, String(t), 's', 'middle');
  }
  b += text(px1, py1 + 34, 'time (s)', 's', 'end');
  b += `<path d="${path(step(0.5))}" fill="none" stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  b += `<path d="${path(step(1.0006))}" fill="none" stroke="${C.accent}" stroke-width="2"/>`;
  for (let i = 0; i <= 20; i++) {
    const t = (i / 20) * tMax;
    b += `<circle cx="${r(X(t))}" cy="${r(Y(step(1)(t)))}" r="2.6" fill="${C.ink}"/>`;
  }
  // Right panel: validation NRMSE vs threshold
  const qx0 = 490, qx1 = 714, qy0 = 52, qy1 = 246, max = 0.025;
  const QY = (v) => qy1 - (v / max) * (qy1 - qy0);
  b += text(qx0, 12, 'VALIDATION NRMSE', 'mono');
  b += line(qx0, qy1, qx1, qy1, C.ink2);
  b += line(qx0, QY(0.02), qx1, QY(0.02), C.ink, 'stroke-width="1.25" stroke-dasharray="5 3"');
  b += text(qx1, QY(0.02) - 7, 'pass threshold 0.02', 'b', 'end');
  [
    { label: 'Validation 1', v: 0.0067 },
    { label: 'Validation 2', v: 0.0041 },
  ].forEach((d, i) => {
    const cx = qx0 + 56 + i * 104, bw = 48;
    b += rect(cx - bw / 2, QY(d.v), bw, qy1 - QY(d.v), C.accent);
    b += text(cx, QY(d.v) - 7, d.v.toFixed(4), 'a', 'middle');
    b += text(cx, qy1 + 18, d.label, 's', 'middle');
  });
  b += text(qx1, qy1 + 34, 'lower is better', 's', 'end');
  write('physical-loop-calibration.svg', svg(W, H, b));
}

/* ------------------------------------------------------------------ 3. Physical Loop: run cost
 * Live desk-lamp run (2026-10-28): $6.05 of model cost against a $35 run cap.
 */
{
  const W = 720, H = 120;
  const x0 = 0, x1 = 700, cap = 35, spent = 6.05;
  const X = (d) => x0 + (d / cap) * (x1 - x0);
  let b = '';
  b += text(0, 12, 'MODEL COST · LIVE DESK-LAMP RUN', 'mono');
  const y = 40, h = 26;
  b += rect(x0, y, x1 - x0, h, C.surface, `stroke="${C.muted}" stroke-width="0.75"`);
  b += rect(x0, y, X(spent) - x0, h, C.accent);
  b += text(X(spent) + 8, y + 17, '$6.05 spent (11.5 min)', 'a');
  b += text(x1 - 8, y + 17, '$35 run cap', 'b', 'end');
  for (const d of [0, 10, 20, 30, 35]) {
    b += line(X(d), y + h, X(d), y + h + 4, C.ink2);
    b += text(X(d), y + h + 18, `$${d}`, 's', d === 0 ? 'start' : d === 35 ? 'end' : 'middle');
  }
  b += text(0, y + h + 44, 'Per-stage caps: $1 / $3 / $10 / $20. 17% of the run cap used.', 's');
  write('physical-loop-cost.svg', svg(W, H, b));
}
