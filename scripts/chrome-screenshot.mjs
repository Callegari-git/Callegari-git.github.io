// Shared helper: render an HTML string to a PNG with the local headless Chrome.
// No npm dependency. Override the browser path with CHROME_PATH=…
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chrome =
  process.env.CHROME_PATH ??
  {
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }[process.platform] ??
  'google-chrome';

/** Screenshot `html` at width × height CSS px (device scale 1) into `out`. */
export function screenshot(html, out, width, height) {
  const dir = mkdtempSync(join(tmpdir(), 'shot-'));
  const page = join(dir, 'page.html');
  writeFileSync(page, html);
  try {
    execFileSync(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--default-background-color=00000000',
      `--window-size=${width},${height}`,
      '--virtual-time-budget=8000', // let web fonts load before the screenshot
      `--screenshot=${out}`,
      `file://${page}`,
    ], { stdio: 'ignore' });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
}
