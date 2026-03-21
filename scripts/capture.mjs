#!/usr/bin/env node
/**
 * Capture a website as PNG screenshot and/or PDF using Playwright.
 *
 * Usage:
 *   node scripts/capture.mjs <url> [options]
 *   npm run capture -- https://example.com
 *   npm run capture -- https://example.com --pdf
 *   npm run capture -- https://example.com --out ./screenshots
 *
 * Options:
 *   --pdf       Also save as PDF
 *   --out DIR   Output directory (default: ./captures)
 *   --width N   Viewport width (default: 1280)
 *   --height N  Viewport height (default: 720)
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const wantPdf = args.includes('--pdf');
const outIdx = args.indexOf('--out');
const outDir = outIdx !== -1 && args[outIdx + 1] ? args[outIdx + 1] : join(projectRoot, 'captures');
const widthIdx = args.indexOf('--width');
const width = widthIdx !== -1 && args[widthIdx + 1] ? parseInt(args[widthIdx + 1], 10) : 1280;
const heightIdx = args.indexOf('--height');
const height = heightIdx !== -1 && args[heightIdx + 1] ? parseInt(args[heightIdx + 1], 10) : 720;

if (!url || !url.startsWith('http')) {
  console.error('Usage: node scripts/capture.mjs <url> [--pdf] [--out DIR] [--width N] [--height N]');
  console.error('Example: node scripts/capture.mjs https://example.com --pdf');
  process.exit(1);
}

const hostname = new URL(url).hostname.replace(/\./g, '-');
const slug = hostname + '-' + Date.now();

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.warn('Navigation timeout or error, capturing current state:', e.message);
  }

  const pngPath = join(outDir, `${slug}.png`);
  await page.screenshot({ path: pngPath, fullPage: false });
  console.log('Screenshot:', pngPath);

  if (wantPdf) {
    const pdfPath = join(outDir, `${slug}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });
    console.log('PDF:', pdfPath);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
