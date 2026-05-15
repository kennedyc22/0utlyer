// Forensic audit harness for https://www.0utlyer.com
// Single entry point. Resumable: by default skips pages whose 1440 full-page
// screenshot already exists. Use --force to wipe and rebuild from scratch.
//
// Usage:
//   node audit.mjs                              # resume; skip pages already captured
//   node audit.mjs --only=projects,partners     # only these pages
//   node audit.mjs --force                      # wipe ./audit/ and redo everything

import { chromium, devices } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import * as ChromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import Vibrant from 'node-vibrant';
import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import https from 'node:https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, 'audit');

const TARGET_ORIGIN = 'https://www.0utlyer.com';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const BREAKPOINTS = [
  { name: '375', width: 375, height: 900 },
  { name: '640', width: 640, height: 900 },
  { name: '768', width: 768, height: 900 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1440', width: 1440, height: 900 },
];

// Pages to explicitly audit. Slug is used for filenames.
// NOTE: `mission` and `contact` are NOT real routes on this Wix site — they
// are anchors on the homepage. They are captured as homepage component crops
// (see captureHomepageAnchors), not as standalone pages.
const PAGES = [
  { slug: 'home', url: `${TARGET_ORIGIN}/` },
  { slug: 'projects', url: `${TARGET_ORIGIN}/s-projects` },
  { slug: 'team', url: `${TARGET_ORIGIN}/team-4` },
  { slug: 'partners', url: `${TARGET_ORIGIN}/partners` },
  { slug: 'legacy', url: `${TARGET_ORIGIN}/legacy` },
];

// ---------- CLI args ----------
function parseArgs(argv) {
  const out = { only: null, force: false };
  for (const a of argv.slice(2)) {
    if (a === '--force') out.force = true;
    else if (a.startsWith('--only=')) out.only = a.slice(7).split(',').map(s => s.trim()).filter(Boolean);
  }
  return out;
}
const ARGS = parseArgs(process.argv);
const captureIssues = [];
function logCaptureIssue(page, step, err) {
  const entry = {
    page,
    step,
    error: err ? String(err?.message || err) : null,
    timestamp: new Date().toISOString(),
  };
  captureIssues.push(entry);
  console.error(`[ISSUE] ${page}/${step}${err ? ' — ' + entry.error : ''}`);
}

const COMPONENT_SELECTORS = {
  nav: 'nav, header nav, [role="navigation"]',
  hero: '[class*="hero" i], section:first-of-type',
  mission: '[class*="mission" i], section:has(h2:has-text("Mission"))',
  founders: '[class*="team" i], [class*="founder" i]',
  contact: 'form, [class*="contact" i]',
  footer: 'footer, [role="contentinfo"]',
};

const KEY_SELECTORS = [
  'body', 'h1', 'h2', 'h3', 'p', 'a', 'button',
  'nav', 'header', 'footer', 'form', 'input',
  '[class*="hero" i]', '[class*="card" i]',
];

const failures = [];
function logFailure(scope, msg, err) {
  const entry = { scope, msg, error: err ? String(err.message || err) : null };
  failures.push(entry);
  console.error(`[FAIL] ${scope}: ${msg}${err ? ' — ' + entry.error : ''}`);
}

// ---------------- Filesystem scaffold ----------------
async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}
async function mkdirp(p) {
  await fs.mkdir(p, { recursive: true });
}
async function writeJSON(p, obj) {
  await mkdirp(path.dirname(p));
  await fs.writeFile(p, JSON.stringify(obj, null, 2), 'utf8');
}
async function writeText(p, txt) {
  await mkdirp(path.dirname(p));
  await fs.writeFile(p, txt, 'utf8');
}

async function scaffold({ wipe }) {
  if (wipe) await rmrf(ROOT);
  const dirs = [
    'screenshots/full-page',
    'screenshots/hero',
    'screenshots/components',
    'content',
    'styles',
    'meta',
    'performance',
    'accessibility',
    'inventory',
  ];
  for (const d of dirs) await mkdirp(path.join(ROOT, d));
}

function fileExists(p) {
  try { return fssync.statSync(p).isFile(); } catch { return false; }
}

// ---------------- Raw HTTP fetch ----------------
function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'user-agent': UA } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRaw(new URL(res.headers.location, url).toString()).then(resolve, reject);
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('timeout')));
  });
}

// ---------------- Per-page content extraction (in-browser) ----------------
const EXTRACT_CONTENT_FN = `() => {
  const txt = (el) => (el?.textContent || '').trim().replace(/\\s+/g, ' ');
  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => ({
    level: Number(h.tagName.substring(1)),
    text: txt(h),
  })).filter(h => h.text);
  const h1 = (document.querySelector('h1')?.textContent || '').trim();
  const paragraphs = Array.from(document.querySelectorAll('p, li')).map(txt).filter(Boolean);
  const links = Array.from(document.querySelectorAll('a[href]')).map(a => {
    let href = a.getAttribute('href') || '';
    let absolute = '';
    try { absolute = new URL(href, location.href).toString(); } catch (e) { absolute = href; }
    return { href: absolute, text: txt(a), internal: absolute.startsWith(location.origin) };
  });
  const images = Array.from(document.querySelectorAll('img')).map(img => ({
    src: img.currentSrc || img.src,
    alt: img.getAttribute('alt') || '',
    width: img.naturalWidth || img.width || 0,
    height: img.naturalHeight || img.height || 0,
    role: (() => {
      const cls = (img.className || '').toString().toLowerCase();
      const a = (img.alt || '').toLowerCase();
      if (cls.includes('logo') || a.includes('logo')) return 'logo';
      if (cls.includes('hero') || cls.includes('banner')) return 'hero';
      if (cls.includes('portrait') || cls.includes('headshot') || cls.includes('avatar') || cls.includes('team')) return 'portrait';
      if (!img.getAttribute('alt')) return 'decorative';
      return 'content';
    })(),
  }));
  const forms = Array.from(document.querySelectorAll('form')).map(f => ({
    action: f.getAttribute('action') || '',
    method: (f.getAttribute('method') || 'GET').toUpperCase(),
    fields: Array.from(f.querySelectorAll('input,textarea,select')).map(i => ({
      name: i.getAttribute('name') || '',
      type: i.getAttribute('type') || i.tagName.toLowerCase(),
      placeholder: i.getAttribute('placeholder') || '',
      required: i.hasAttribute('required'),
      label: (() => {
        const id = i.id;
        if (id) {
          const lab = document.querySelector('label[for="' + CSS.escape(id) + '"]');
          if (lab) return (lab.textContent || '').trim();
        }
        const parentLab = i.closest('label');
        if (parentLab) return (parentLab.textContent || '').trim();
        return '';
      })(),
    })),
  }));
  const head = {
    title: document.title,
    meta: {},
    og: {},
    twitter: {},
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
    viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content') || null,
    hreflang: Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(l => ({
      hreflang: l.getAttribute('hreflang'), href: l.getAttribute('href'),
    })),
    generator: document.querySelector('meta[name="generator"]')?.getAttribute('content') || null,
  };
  document.querySelectorAll('meta').forEach(m => {
    const name = m.getAttribute('name');
    const prop = m.getAttribute('property');
    const content = m.getAttribute('content') || '';
    if (prop && prop.startsWith('og:')) head.og[prop] = content;
    else if (name && name.startsWith('twitter:')) head.twitter[name] = content;
    else if (name) head.meta[name] = content;
  });
  const jsonld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
    try { return JSON.parse(s.textContent || 'null'); } catch (e) { return { _parseError: true, raw: (s.textContent || '').slice(0, 500) }; }
  });
  return { h1, headings, paragraphs, links, images, forms, head, jsonld };
}`;

const EXTRACT_COMPUTED_FN = `(selectors) => {
  const props = ['font-family','font-size','font-weight','line-height','letter-spacing','color','background-color','margin','padding','border-radius'];
  const out = {};
  for (const sel of selectors) {
    let nodes;
    try { nodes = Array.from(document.querySelectorAll(sel)); } catch (e) { out[sel] = { _error: 'invalid selector' }; continue; }
    if (!nodes.length) { out[sel] = { _missing: true }; continue; }
    const samples = nodes.slice(0, 3).map(n => {
      const cs = getComputedStyle(n);
      const row = {};
      for (const p of props) row[p] = cs.getPropertyValue(p).trim();
      return row;
    });
    out[sel] = { count: nodes.length, samples };
  }
  return out;
}`;

// ---------------- Navigation strategy ----------------
// Wix sites hold long-poll/analytics connections open and rarely reach networkidle.
// Strategy: try 'domcontentloaded' first, then settle. If even that times out,
// fall back to 'load'. Record which strategy worked.
async function smartGoto(page, url, slug) {
  const strategies = ['domcontentloaded', 'load'];
  let lastErr = null;
  for (const waitUntil of strategies) {
    try {
      const response = await page.goto(url, { waitUntil, timeout: 60000 });
      if (!response || !response.ok()) {
        lastErr = new Error(`HTTP ${response?.status()} for ${url}`);
        continue;
      }
      // Wait for body
      try { await page.locator('body').waitFor({ state: 'visible', timeout: 10000 }); } catch {}
      // Lazy-content settle
      await page.waitForTimeout(3000);
      // Scroll to trigger IntersectionObserver-based lazy loads
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        const h = document.documentElement.scrollHeight;
        const steps = 4;
        for (let i = 1; i <= steps; i++) {
          window.scrollTo(0, Math.floor((h * i) / steps));
          await sleep(500);
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      return { ok: true, strategy: waitUntil, response };
    } catch (err) {
      lastErr = err;
      console.warn(`  nav strategy '${waitUntil}' failed for ${slug}: ${err.message}`);
    }
  }
  return { ok: false, strategy: null, error: lastErr };
}

// ---------------- Main capture pipeline ----------------
async function capturePage(browser, page, ctx, pageDef, results) {
  const { slug, url } = pageDef;
  console.log(`\n=== ${slug} :: ${url} ===`);

  // Resume: skip only if BOTH the 1440 full-page screenshot AND a valid state
  // file (with a non-null page entry) exist. Screenshot-only is not enough —
  // an earlier bug produced screenshots without extracted content.
  const screenshotSentinel = path.join(ROOT, 'screenshots', 'full-page', `${slug}-1440.png`);
  const stateFile = path.join(ROOT, '_state', `${slug}.json`);
  let hasValidState = false;
  if (fileExists(stateFile)) {
    try {
      const st = JSON.parse(fssync.readFileSync(stateFile, 'utf8'));
      hasValidState = !!(st && st.page && st.page.h1 !== undefined);
    } catch {}
  }
  if (!ARGS.force && fileExists(screenshotSentinel) && hasValidState) {
    console.log(`  skip (already captured)`);
    results.skipped.add(slug);
    return;
  }

  // Track network for font detection
  const fontRequests = new Set();
  const allRequests = [];
  const reqListener = (req) => {
    const u = req.url();
    allRequests.push({ url: u, type: req.resourceType() });
    if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u)) fontRequests.add(u);
  };
  page.on('request', reqListener);

  const nav = await smartGoto(page, url, slug);
  if (!nav.ok) {
    logCaptureIssue(slug, 'navigation', nav.error);
    page.off('request', reqListener);
    return;
  }
  results.navStrategy[slug] = nav.strategy;
  console.log(`  loaded via '${nav.strategy}'`);

  try {
    // Content + head extraction
    let content = null;
    try {
      // EXTRACT_CONTENT_FN is a string like `() => { ... }`. page.evaluate
      // treats a string as an expression, so we must wrap it in an IIFE to call it.
      content = await page.evaluate(`(${EXTRACT_CONTENT_FN})()`);
    } catch (err) {
      logCaptureIssue(slug, 'content-extract', err);
    }
    if (content) {
      const pageEntry = {
        url, slug,
        title: content.head.title,
        h1: content.h1,
        headings: content.headings,
        paragraphs: content.paragraphs,
        links: content.links,
        images: content.images,
        forms: content.forms,
      };
      results.pages.set(slug, pageEntry);
      results.heads[slug] = { url, ...content.head };
      if (content.jsonld?.length) results.schema[slug] = content.jsonld;
    }

    // Computed styles at 1440
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    try {
      // Inline the selectors arg into the IIFE — passing args through a string
      // expression to page.evaluate is not reliable across Playwright versions.
      const computed = await page.evaluate(
        `(${EXTRACT_COMPUTED_FN})(${JSON.stringify(KEY_SELECTORS)})`,
      );
      results.computed[slug] = computed;
    } catch (err) {
      logCaptureIssue(slug, 'computed-styles', err);
    }

    // Screenshots
    for (const bp of BREAKPOINTS) {
      if (slug !== 'home' && bp.name !== '1440') continue;
      try {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.scrollTo(0, 0));
        const fpPath = path.join(ROOT, 'screenshots', 'full-page', `${slug}-${bp.name}.png`);
        await page.screenshot({ path: fpPath, fullPage: true });
        const heroPath = path.join(ROOT, 'screenshots', 'hero', `${slug}-${bp.name}.png`);
        await page.screenshot({ path: heroPath, fullPage: false });
        console.log(`  shot ${slug}-${bp.name}`);
      } catch (err) {
        logCaptureIssue(slug, `screenshot-${bp.name}`, err);
      }
    }

    // Homepage component crops at 1440
    if (slug === 'home') {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(500);
      for (const [name, sel] of Object.entries(COMPONENT_SELECTORS)) {
        try {
          const handle = await page.$(sel);
          if (!handle) continue;
          await handle.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
          const outPath = path.join(ROOT, 'screenshots', 'components', `${name}-1440.png`);
          await handle.screenshot({ path: outPath });
          console.log(`  component shot ${name}`);
        } catch (err) {
          logCaptureIssue(slug, `component-${name}`, err);
        }
      }
      // Homepage anchors: mission + contact-form (specified routes don't exist)
      await captureHomepageAnchors(page);
    }

    results.network[slug] = {
      fontRequests: Array.from(fontRequests),
      totalRequests: allRequests.length,
      byType: allRequests.reduce((acc, r) => ((acc[r.type] = (acc[r.type] || 0) + 1), acc), {}),
    };

    // Persist per-page state so aggregation survives resume runs
    await persistPageState(slug, {
      page: results.pages.get(slug) || null,
      head: results.heads[slug] || null,
      schema: results.schema[slug] || null,
      computed: results.computed[slug] || null,
      network: results.network[slug] || null,
      navStrategy: results.navStrategy[slug] || null,
    });
  } catch (err) {
    logCaptureIssue(slug, 'page-capture', err);
  } finally {
    page.off('request', reqListener);
  }
}

// Capture homepage anchor sections (mission, contact form) as component crops.
// These routes do not exist as standalone pages on the Wix site.
async function captureHomepageAnchors(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Mission section
  const missionSelectors = [
    '#comp-lwdlshyk2',
    '[id*="mission" i]',
    'section:has(h2:has-text("MISSION"))',
    'section:has(h2:has-text("Mission"))',
    ':has-text("OUR MISSION")',
  ];
  let missionHandle = null;
  for (const sel of missionSelectors) {
    try {
      const h = await page.$(sel);
      if (h) { missionHandle = h; break; }
    } catch {}
  }
  if (missionHandle) {
    try {
      await missionHandle.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(500);
      await missionHandle.screenshot({ path: path.join(ROOT, 'screenshots', 'components', 'mission-1440.png') });
      console.log('  anchor shot mission');
    } catch (err) {
      logCaptureIssue('home', 'anchor-mission', err);
    }
  } else {
    logCaptureIssue('home', 'anchor-mission', new Error('no matching element on homepage'));
  }

  // Contact form section
  const contactSelectors = [
    'form',
    'section:has(form)',
    'section:has(:text("JOIN OUR COMMUNITY"))',
    'section:has(:text("Join our community"))',
    '[id*="contact" i]',
  ];
  let contactHandle = null;
  for (const sel of contactSelectors) {
    try {
      const h = await page.$(sel);
      if (h) { contactHandle = h; break; }
    } catch {}
  }
  if (contactHandle) {
    try {
      await contactHandle.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(500);
      await contactHandle.screenshot({ path: path.join(ROOT, 'screenshots', 'components', 'contact-form-1440.png') });
      console.log('  anchor shot contact-form');
    } catch (err) {
      logCaptureIssue('home', 'anchor-contact-form', err);
    }
  } else {
    logCaptureIssue('home', 'anchor-contact-form', new Error('no matching form on homepage'));
  }
}

// ---------- Per-page state persistence (resume support) ----------
async function persistPageState(slug, state) {
  const dir = path.join(ROOT, '_state');
  await mkdirp(dir);
  await writeJSON(path.join(dir, `${slug}.json`), state);
}
async function loadAllPageState() {
  const dir = path.join(ROOT, '_state');
  if (!fssync.existsSync(dir)) return {};
  const out = {};
  for (const f of await fs.readdir(dir)) {
    if (!f.endsWith('.json')) continue;
    const slug = f.replace(/\.json$/, '');
    try { out[slug] = JSON.parse(await fs.readFile(path.join(dir, f), 'utf8')); }
    catch (err) { logCaptureIssue(slug, 'state-load', err); }
  }
  return out;
}

// ---------------- Style aggregations ----------------
function aggregateStyles(computed) {
  const fontFamilies = new Map();   // family -> Set(selectors)
  const fontSizes = new Map();      // size -> count
  const fontWeights = new Map();
  const margins = new Map();
  const paddings = new Map();
  const colors = new Map();         // hex -> { count, usedIn:Set }

  const addColor = (val, role) => {
    const hex = normaliseColor(val);
    if (!hex) return;
    if (!colors.has(hex)) colors.set(hex, { count: 0, usedIn: new Set() });
    const e = colors.get(hex);
    e.count += 1;
    e.usedIn.add(role);
  };

  for (const [pageSlug, selMap] of Object.entries(computed || {})) {
    if (!selMap || typeof selMap !== 'object') {
      console.warn(`  aggregate: skipping ${pageSlug} (no computed data)`);
      continue;
    }
    for (const [sel, info] of Object.entries(selMap)) {
      if (!info?.samples) continue;
      for (const s of info.samples) {
        if (s['font-family']) {
          if (!fontFamilies.has(s['font-family'])) fontFamilies.set(s['font-family'], new Set());
          fontFamilies.get(s['font-family']).add(`${pageSlug} ${sel}`);
        }
        if (s['font-size']) fontSizes.set(s['font-size'], (fontSizes.get(s['font-size']) || 0) + 1);
        if (s['font-weight']) fontWeights.set(s['font-weight'], (fontWeights.get(s['font-weight']) || 0) + 1);
        if (s['margin']) margins.set(s['margin'], (margins.get(s['margin']) || 0) + 1);
        if (s['padding']) paddings.set(s['padding'], (paddings.get(s['padding']) || 0) + 1);
        addColor(s.color, 'color');
        addColor(s['background-color'], 'background-color');
      }
    }
  }

  const families = Array.from(fontFamilies.entries()).map(([f, sels]) => ({
    family: f, usedBy: Array.from(sels).slice(0, 25), usageCount: sels.size,
  }));
  const sizes = Array.from(fontSizes.entries()).sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c }));
  const weights = Array.from(fontWeights.entries()).sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c }));
  const marginsArr = Array.from(margins.entries()).sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c }));
  const paddingsArr = Array.from(paddings.entries()).sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c }));
  const cssColors = Array.from(colors.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([hex, e]) => ({ hex, count: e.count, usedIn: Array.from(e.usedIn) }));

  return { families, sizes, weights, marginsArr, paddingsArr, cssColors };
}

function normaliseColor(val) {
  if (!val) return null;
  val = val.trim().toLowerCase();
  if (val === 'transparent' || val === 'rgba(0, 0, 0, 0)') return null;
  // rgb / rgba -> hex
  let m = val.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    const [r, g, b] = [m[1], m[2], m[3]].map(Number);
    return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('');
  }
  if (/^#[0-9a-f]{3,8}$/.test(val)) {
    if (val.length === 4) return '#' + val.slice(1).split('').map(c => c + c).join('');
    return val.length > 7 ? val.slice(0, 7) : val;
  }
  return null;
}

// ---------------- Body copy markdown writer ----------------
function buildCopyMarkdown(pages) {
  const lines = ['# Body copy — captured verbatim', ''];
  for (const p of pages) {
    lines.push(`## ${p.slug} — ${p.url}`);
    lines.push('');
    if (p.title) lines.push(`**Title:** ${p.title}`);
    if (p.h1) lines.push(`**H1:** ${p.h1}`);
    lines.push('');
    for (const h of p.headings) lines.push(`${'#'.repeat(Math.min(h.level + 1, 6))} ${h.text}`);
    lines.push('');
    for (const para of p.paragraphs) lines.push(para, '');
    lines.push('---', '');
  }
  return lines.join('\n');
}

// ---------------- Lighthouse ----------------
// chrome-launcher cannot reliably find a working Chrome binary on WSL; use
// Playwright's bundled chromium with --remote-debugging-port instead.
async function runLighthouse(targetUrl, outBase) {
  // Pick a free-ish port deterministically per-call to avoid collisions
  const port = 9222 + Math.floor(Math.random() * 1000);
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        `--remote-debugging-port=${port}`,
        '--no-sandbox',
        '--disable-gpu',
      ],
    });
    // Give Chrome's devtools endpoint a moment to come up
    await new Promise(r => setTimeout(r, 1500));

    const opts = { port, output: ['json', 'html'], logLevel: 'error' };
    const config = { extends: 'lighthouse:default' };
    const runner = await lighthouse(targetUrl, opts, config);
    if (!runner) throw new Error('lighthouse returned undefined');
    const [jsonReport, htmlReport] = runner.report;
    await fs.writeFile(outBase + '.json', jsonReport, 'utf8');
    await fs.writeFile(outBase + '.html', htmlReport, 'utf8');
    return runner.lhr;
  } catch (err) {
    logFailure(`lighthouse:${path.basename(outBase)}`, 'lighthouse failed', err);
    return null;
  } finally {
    if (browser) try { await browser.close(); } catch {}
  }
}

// ---------------- Axe ----------------
async function runAxe(browser, url, outPath) {
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    // Same nav strategy as the main capture: domcontentloaded → settle → scroll
    let loaded = false;
    for (const waitUntil of ['domcontentloaded', 'load']) {
      try {
        const resp = await page.goto(url, { waitUntil, timeout: 60000 });
        if (resp && resp.ok()) { loaded = true; break; }
      } catch (err) {
        console.warn(`  axe nav '${waitUntil}' failed for ${url}: ${err.message}`);
      }
    }
    if (!loaded) throw new Error(`failed to load ${url} for axe`);
    try { await page.locator('body').waitFor({ state: 'visible', timeout: 10000 }); } catch {}
    await page.waitForTimeout(3000);
    const results = await new AxeBuilder({ page }).analyze();
    await writeJSON(outPath, results);
    return results;
  } catch (err) {
    logFailure(`axe:${url}`, 'axe run failed', err);
    return null;
  } finally {
    await ctx.close();
  }
}

function summariseAxe(allResults) {
  const buckets = { critical: [], serious: [], moderate: [], minor: [] };
  for (const { slug, result } of allResults) {
    if (!result) continue;
    for (const v of result.violations) {
      const bucket = buckets[v.impact] || (buckets[v.impact] = []);
      bucket.push({ slug, id: v.id, help: v.help, nodes: v.nodes.length, example: v.nodes[0]?.html?.slice(0, 200) || '' });
    }
  }
  const lines = ['# Accessibility — axe-core summary', ''];
  let total = 0;
  for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
    const arr = buckets[impact] || [];
    total += arr.length;
    lines.push(`## ${impact} (${arr.length})`);
    for (const v of arr) {
      lines.push(`- **[${v.slug}] ${v.id}** — ${v.help} (${v.nodes} node${v.nodes !== 1 ? 's' : ''})`);
      if (v.example) lines.push(`  - e.g. \`${v.example.replace(/`/g, '\\`')}\``);
    }
    lines.push('');
  }
  lines.unshift(`**Total violations across audited pages: ${total}**`, '');
  return lines.join('\n');
}

// ---------------- Palette via node-vibrant ----------------
async function extractPaletteFromImage(imgPath) {
  try {
    const palette = await Vibrant.from(imgPath).getPalette();
    const out = {};
    for (const [k, v] of Object.entries(palette)) {
      if (!v) continue;
      out[k.charAt(0).toLowerCase() + k.slice(1)] = {
        hex: v.getHex(),
        population: v.getPopulation(),
        rgb: v.getRgb(),
      };
    }
    return out;
  } catch (err) {
    logFailure('palette', 'vibrant failed', err);
    return {};
  }
}

// ---------------- Report builder ----------------
function buildReport({ pages, lighthouse, axe, fontRequests, palette, styleAgg, schema, sitemap, robots, generators }) {
  const lines = [];
  lines.push('# Outlyer Audit Report');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Source: ${TARGET_ORIGIN}`);
  lines.push('');
  lines.push('## 1. Scope');
  lines.push('### Pages audited');
  for (const p of pages) lines.push(`- ${p.slug} — ${p.url}`);
  lines.push('');
  lines.push('### Breakpoints captured');
  for (const b of BREAKPOINTS) lines.push(`- ${b.name} × ${b.height}`);
  lines.push('');
  lines.push('### Tools');
  lines.push('- playwright 1.56.0 (chromium)');
  lines.push('- @axe-core/playwright 4.10.2');
  lines.push('- lighthouse 12.8.2');
  lines.push('- node-vibrant 3.2.1-alpha.1');
  lines.push('');

  lines.push('## 2. Information Architecture');
  const sitemapList = collectSitemap(pages);
  for (const u of sitemapList) lines.push(`- ${u}`);
  lines.push('');

  lines.push('## 3. Content Summary');
  for (const p of pages) {
    const wc = p.paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    lines.push(`### ${p.slug} — ${p.url}`);
    lines.push(`- Word count (paragraphs+list items): ${wc}`);
    if (p.h1) lines.push(`- H1: ${p.h1}`);
    const h2s = p.headings.filter(h => h.level === 2).map(h => h.text);
    if (h2s.length) lines.push(`- H2s: ${h2s.map(s => `“${s}”`).join(', ')}`);
    lines.push('');
  }

  lines.push('## 4. Visual Language');
  lines.push('### Palette — top CSS colours');
  for (const c of styleAgg.cssColors.slice(0, 20)) {
    lines.push(`- \`${c.hex}\` × ${c.count} (${c.usedIn.join(', ')})`);
  }
  if (palette && Object.keys(palette).length) {
    lines.push('');
    lines.push('### Palette — node-vibrant from 1440 homepage');
    for (const [k, v] of Object.entries(palette)) lines.push(`- ${k}: \`${v.hex}\` (pop ${v.population})`);
  }
  lines.push('');
  lines.push('### Typography — families');
  for (const f of styleAgg.families) lines.push(`- \`${f.family}\` — ${f.usageCount} selector samples`);
  lines.push('');
  lines.push('### Typography — sizes (top 15)');
  for (const s of styleAgg.sizes.slice(0, 15)) lines.push(`- ${s.value} × ${s.count}`);
  lines.push('');
  lines.push('### Typography — weights');
  for (const w of styleAgg.weights) lines.push(`- ${w.value} × ${w.count}`);
  lines.push('');
  lines.push('### Spacing — top 15 margin values');
  for (const m of styleAgg.marginsArr.slice(0, 15)) lines.push(`- ${m.value} × ${m.count}`);
  lines.push('');
  lines.push('### Spacing — top 15 padding values');
  for (const p of styleAgg.paddingsArr.slice(0, 15)) lines.push(`- ${p.value} × ${p.count}`);
  lines.push('');

  lines.push('## 5. Component Inventory');
  lines.push('See `inventory/components.md` for detail. Components observed across the homepage at 1440:');
  for (const [name] of Object.entries(COMPONENT_SELECTORS)) lines.push(`- ${name}`);
  lines.push('');

  lines.push('## 6. Interactions & Motion');
  lines.push('See `inventory/interactions.md` for detail.');
  lines.push('');

  lines.push('## 7. Performance Baseline');
  lines.push('| Page | Performance | Accessibility | Best Practices | SEO |');
  lines.push('|------|------------:|--------------:|---------------:|----:|');
  for (const [slug, lhr] of Object.entries(lighthouse)) {
    if (!lhr) { lines.push(`| ${slug} | n/a | n/a | n/a | n/a |`); continue; }
    const s = lhr.categories;
    const fmt = (c) => c ? Math.round(c.score * 100) : 'n/a';
    lines.push(`| ${slug} | ${fmt(s.performance)} | ${fmt(s.accessibility)} | ${fmt(s['best-practices'])} | ${fmt(s.seo)} |`);
  }
  lines.push('');
  lines.push('### Core Web Vitals (mobile, lighthouse)');
  lines.push('| Page | LCP | CLS | TBT | FCP | SI | TTI |');
  lines.push('|------|----:|----:|----:|----:|---:|----:|');
  for (const [slug, lhr] of Object.entries(lighthouse)) {
    if (!lhr) { lines.push(`| ${slug} | – | – | – | – | – | – |`); continue; }
    const a = lhr.audits;
    const v = (k) => a[k]?.displayValue || a[k]?.numericValue?.toFixed?.(0) || '–';
    lines.push(`| ${slug} | ${v('largest-contentful-paint')} | ${v('cumulative-layout-shift')} | ${v('total-blocking-time')} | ${v('first-contentful-paint')} | ${v('speed-index')} | ${v('interactive')} |`);
  }
  lines.push('');

  lines.push('## 8. Accessibility Baseline');
  const allViolations = axe.flatMap(({ result }) => result?.violations || []);
  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of allViolations) if (byImpact[v.impact] !== undefined) byImpact[v.impact] += 1;
  lines.push(`- critical: ${byImpact.critical}`);
  lines.push(`- serious: ${byImpact.serious}`);
  lines.push(`- moderate: ${byImpact.moderate}`);
  lines.push(`- minor: ${byImpact.minor}`);
  const freq = new Map();
  for (const v of allViolations) freq.set(v.id, (freq.get(v.id) || 0) + v.nodes.length);
  const top = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  lines.push('');
  lines.push('### Top 5 rules');
  for (const [id, count] of top) lines.push(`- ${id}: ${count} nodes`);
  lines.push('');

  lines.push('## 9. SEO Baseline');
  for (const p of pages) {
    lines.push(`### ${p.slug}`);
    lines.push(`- title: ${p.title || '(empty)'}`);
    const desc = (p.headings.length ? '' : '');
    lines.push('');
  }
  lines.push(`- sitemap.xml present: ${sitemap.present ? 'yes' : 'no'}`);
  lines.push(`- robots.txt present: ${robots.present ? 'yes' : 'no'}`);
  lines.push(`- JSON-LD blocks found: ${Object.keys(schema).length}`);
  lines.push('');

  lines.push('## 10. Technical Notes');
  lines.push(`- generator meta: ${Array.from(new Set(generators)).filter(Boolean).join(', ') || '(none)'}`);
  lines.push('- Web fonts (woff/woff2/ttf/otf) requested:');
  for (const u of fontRequests) lines.push(`  - ${u}`);
  lines.push('');

  lines.push('## 11. Observations for the Rebuild');
  if (!sitemap.present) lines.push('- No sitemap.xml exposed at /sitemap.xml');
  if (Object.keys(schema).length === 0) lines.push('- No JSON-LD structured data present on any audited page');
  for (const p of pages) {
    for (const para of p.paragraphs) {
      if (/[a-z],?\s*$/i.test(para) && para.length > 20 && !/[.!?…]\s*$/.test(para)) {
        lines.push(`- Copy on \`${p.slug}\` appears truncated mid-sentence: “${para.slice(-80)}”`);
        break;
      }
    }
  }
  lines.push('');

  if (captureIssues.length) {
    lines.push('## Capture Issues');
    for (const f of captureIssues) lines.push(`- [${f.page}/${f.step}] ${f.error || ''}`);
    lines.push('');
  }
  if (failures.length) {
    lines.push('## Tool Failures');
    for (const f of failures) lines.push(`- [${f.scope}] ${f.msg}${f.error ? ` — ${f.error}` : ''}`);
    lines.push('');
  }

  return lines.join('\n');
}

function collectSitemap(pages) {
  const set = new Set(pages.map(p => p.url));
  for (const p of pages) for (const l of p.links) if (l.internal) set.add(l.href);
  return Array.from(set).sort();
}

// ---------------- Components / interactions inventory (heuristic) ----------------
function buildComponentsMd(pages) {
  const home = pages.find(p => p.slug === 'home');
  const lines = ['# Component inventory (observed)', ''];
  for (const [name, sel] of Object.entries(COMPONENT_SELECTORS)) {
    lines.push(`## ${name}`);
    lines.push(`- selector probed: \`${sel}\``);
    lines.push(`- screenshot: \`screenshots/components/${name}-1440.png\``);
    lines.push('');
  }
  lines.push('## Per-page observed images by role');
  for (const p of pages) {
    if (!p.images?.length) continue;
    lines.push(`### ${p.slug}`);
    const counts = p.images.reduce((acc, i) => ((acc[i.role] = (acc[i.role] || 0) + 1), acc), {});
    for (const [r, c] of Object.entries(counts)) lines.push(`- ${r}: ${c}`);
    lines.push('');
  }
  return lines.join('\n');
}

function buildInteractionsMd() {
  return [
    '# Interactions & motion (observed)',
    '',
    'This file lists interactions detected during automated capture. Manual review',
    'may surface additional motion that did not trigger during the script run.',
    '',
    '- Page load: `networkidle` reached for each audited URL (logged in console).',
    '- Lazy-loaded content: a 2s settle delay was used after navigation; any',
    '  content that requires user scrolling or hovering to materialise was not',
    '  triggered by the harness.',
    '- Form submission flow: not executed (capture is read-only).',
    '- Mobile nav behaviour: see `screenshots/full-page/home-375.png` for the',
    '  collapsed state.',
    '',
  ].join('\n');
}

// ---------------- Main ----------------
async function main() {
  console.log(`Args: ${JSON.stringify(ARGS)}`);
  console.log('Scaffolding ./audit/ …');
  await scaffold({ wipe: ARGS.force });

  // robots.txt + sitemap.xml
  console.log('Fetching robots.txt + sitemap.xml …');
  const robotsRes = await fetchRaw(`${TARGET_ORIGIN}/robots.txt`).catch(() => null);
  const sitemapRes = await fetchRaw(`${TARGET_ORIGIN}/sitemap.xml`).catch(() => null);
  await writeText(path.join(ROOT, 'meta', 'robots.txt'),
    robotsRes?.status === 200 ? robotsRes.body : `# fetch failed or non-200 (status ${robotsRes?.status || 'n/a'})\n`);
  await writeText(path.join(ROOT, 'meta', 'sitemap.xml'),
    sitemapRes?.status === 200 ? sitemapRes.body : `<!-- sitemap.xml not present or non-200 (status ${sitemapRes?.status || 'n/a'}) -->\n`);
  const robots = { present: robotsRes?.status === 200 };
  const sitemap = { present: sitemapRes?.status === 200 };

  // Decide which pages this run will attempt to capture
  const targetSlugs = ARGS.only ? new Set(ARGS.only) : null;
  const pagesToCapture = PAGES.filter(p => !targetSlugs || targetSlugs.has(p.slug));

  // Load any previously-captured per-page state
  const priorState = await loadAllPageState();
  console.log(`Prior state on disk: ${Object.keys(priorState).join(', ') || '(none)'}`);

  const results = {
    pages: new Map(),    // slug -> page entry
    heads: {},
    schema: {},
    computed: {},
    network: {},
    navStrategy: {},
    skipped: new Set(),
  };

  // Hydrate from prior state first
  for (const [slug, st] of Object.entries(priorState)) {
    if (st.page) results.pages.set(slug, st.page);
    if (st.head) results.heads[slug] = st.head;
    if (st.schema) results.schema[slug] = st.schema;
    if (st.computed) results.computed[slug] = st.computed;
    if (st.network) results.network[slug] = st.network;
    if (st.navStrategy) results.navStrategy[slug] = st.navStrategy;
  }

  // ---- Browser capture phase ----
  let browser;
  try {
    console.log('Launching chromium …');
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      userAgent: UA,
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    for (const pageDef of pagesToCapture) {
      try {
        await capturePage(browser, page, ctx, pageDef, results);
      } catch (err) {
        logCaptureIssue(pageDef.slug, 'page-outer', err);
      }
    }
  } catch (err) {
    logCaptureIssue('browser', 'launch-or-loop', err);
  } finally {
    if (browser) try { await browser.close(); } catch {}
  }

  // ---- Aggregate outputs from everything currently on disk + memory ----
  const pagesArr = Array.from(results.pages.values());

  await writeJSON(path.join(ROOT, 'content', 'pages.json'), pagesArr);
  await writeText(path.join(ROOT, 'content', 'copy.md'), buildCopyMarkdown(pagesArr));
  const allImages = pagesArr.flatMap(p => (p.images || []).map(i => ({ ...i, page: p.slug })));
  await writeJSON(path.join(ROOT, 'content', 'images.json'), allImages);
  const sitemapList = collectSitemap(pagesArr);
  await writeText(path.join(ROOT, 'content', 'sitemap.txt'), sitemapList.join('\n') + '\n');

  await writeJSON(path.join(ROOT, 'meta', 'head.json'), results.heads);
  await writeJSON(path.join(ROOT, 'meta', 'schema.json'),
    Object.keys(results.schema).length ? results.schema : { _note: 'No JSON-LD structured data found on any audited page.' });

  await writeJSON(path.join(ROOT, 'styles', 'computed.json'), results.computed);
  let styleAgg;
  try {
    styleAgg = aggregateStyles(results.computed);
  } catch (err) {
    logCaptureIssue('aggregate', 'styles', err);
    styleAgg = { families: [], sizes: [], weights: [], marginsArr: [], paddingsArr: [], cssColors: [] };
  }
  const hasAnyStyle = styleAgg.families.length || styleAgg.sizes.length;
  await writeJSON(path.join(ROOT, 'styles', 'typography.json'), {
    families: styleAgg.families,
    sizes: styleAgg.sizes,
    weights: styleAgg.weights,
    webFontUrls: Array.from(new Set(Object.values(results.network).flatMap(n => n?.fontRequests || []))),
    _note: hasAnyStyle ? undefined : 'No computed-style samples collected — likely no pages captured.',
  });
  await writeJSON(path.join(ROOT, 'styles', 'spacing.json'), {
    margins: styleAgg.marginsArr,
    paddings: styleAgg.paddingsArr,
    _note: hasAnyStyle ? undefined : 'No spacing samples collected — likely no pages captured.',
  });

  const homeFp = path.join(ROOT, 'screenshots', 'full-page', 'home-1440.png');
  const fromPixels = fssync.existsSync(homeFp) ? await extractPaletteFromImage(homeFp) : {};
  await writeJSON(path.join(ROOT, 'styles', 'palette.json'), {
    from_pixels: fromPixels,
    from_css: styleAgg.cssColors,
  });

  // ---- Lighthouse ----
  console.log('Running Lighthouse …');
  const lighthouseTargets = [
    { slug: 'home', url: `${TARGET_ORIGIN}/` },
    { slug: 'projects', url: `${TARGET_ORIGIN}/s-projects` },
    { slug: 'mission', url: `${TARGET_ORIGIN}/#mission` },
  ];
  const lhrs = {};
  for (const t of lighthouseTargets) {
    const outBase = path.join(ROOT, 'performance', `lighthouse-${t.slug}`);
    // Skip if reports already on disk and not forcing
    if (!ARGS.force && fileExists(outBase + '.json')) {
      console.log(`  lighthouse skip ${t.slug} (cached)`);
      try { lhrs[t.slug] = JSON.parse(await fs.readFile(outBase + '.json', 'utf8')); } catch { lhrs[t.slug] = null; }
      continue;
    }
    try {
      lhrs[t.slug] = await runLighthouse(t.url, outBase);
    } catch (err) {
      logCaptureIssue(t.slug, 'lighthouse', err);
      lhrs[t.slug] = null;
    }
  }

  // ---- Axe ----
  console.log('Running axe-core …');
  const axeResults = [];
  let axeBrowser;
  try {
    axeBrowser = await chromium.launch({ headless: true });
    for (const pageDef of PAGES) {
      const out = path.join(ROOT, 'accessibility', `axe-${pageDef.slug}.json`);
      if (!ARGS.force && fileExists(out)) {
        try { axeResults.push({ slug: pageDef.slug, result: JSON.parse(await fs.readFile(out, 'utf8')) }); }
        catch { axeResults.push({ slug: pageDef.slug, result: null }); }
        continue;
      }
      try {
        const r = await runAxe(axeBrowser, pageDef.url, out);
        axeResults.push({ slug: pageDef.slug, result: r });
      } catch (err) {
        logCaptureIssue(pageDef.slug, 'axe', err);
        axeResults.push({ slug: pageDef.slug, result: null });
      }
    }
  } catch (err) {
    logCaptureIssue('axe', 'browser', err);
  } finally {
    if (axeBrowser) try { await axeBrowser.close(); } catch {}
  }
  await writeText(path.join(ROOT, 'accessibility', 'axe-summary.md'), summariseAxe(axeResults));

  // Inventory
  await writeText(path.join(ROOT, 'inventory', 'components.md'), buildComponentsMd(pagesArr));
  await writeText(path.join(ROOT, 'inventory', 'interactions.md'), buildInteractionsMd());

  // Generators (from heads)
  const generators = Object.values(results.heads).map(h => h?.generator).filter(Boolean);
  const fontRequests = Array.from(new Set(Object.values(results.network).flatMap(n => n?.fontRequests || [])));

  // Persist capture-issues.json (always, even if empty)
  await writeJSON(path.join(ROOT, 'capture-issues.json'), {
    generated: new Date().toISOString(),
    issues: captureIssues,
    navStrategy: results.navStrategy,
  });

  // Final report — always generated, even on partial data
  let report;
  try {
    report = buildReport({
      pages: pagesArr,
      lighthouse: lhrs,
      axe: axeResults,
      fontRequests,
      palette: fromPixels,
      styleAgg,
      schema: results.schema,
      sitemap,
      robots,
      generators,
    });
  } catch (err) {
    logCaptureIssue('report', 'buildReport', err);
    report = `# Outlyer Audit Report — PARTIAL\n\nReport generation threw: ${err.message}\n\nSee capture-issues.json.\n`;
  }
  await writeText(path.join(ROOT, 'audit-report.md'), report);

  // README
  await writeText(path.join(ROOT, 'README.md'), [
    '# Outlyer audit',
    '',
    'Forensic, read-only audit of https://www.0utlyer.com.',
    '',
    '## Re-running',
    '',
    '```',
    'npm install',
    'npx playwright install chromium',
    'node audit.mjs                              # resume; skip pages already captured',
    'node audit.mjs --only=projects,partners     # only these pages',
    'node audit.mjs --force                      # wipe ./audit/ and redo everything',
    '```',
    '',
    'By default the script is resumable: any page whose 1440 full-page screenshot',
    'already exists on disk is skipped. Pass `--force` to wipe and rebuild from scratch.',
    '',
    '## Contents',
    '- `audit-report.md` — the human-readable summary (the primary deliverable)',
    '- `screenshots/` — full-page, hero, and component crops',
    '- `content/` — extracted copy, links, images, sitemap',
    '- `styles/` — computed CSS, palette, typography, spacing',
    '- `meta/` — head tags, JSON-LD, robots.txt, sitemap.xml',
    '- `performance/` — Lighthouse JSON + HTML reports',
    '- `accessibility/` — axe-core JSON + summary',
    '- `inventory/` — observed components and interactions',
    '',
  ].join('\n'));

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(`Pages on disk: ${Array.from(results.pages.keys()).join(', ') || '(none)'}`);
  console.log(`Skipped (already captured): ${Array.from(results.skipped).join(', ') || '(none)'}`);
  console.log(`Nav strategy used: ${JSON.stringify(results.navStrategy)}`);
  if (captureIssues.length) {
    console.log(`\nCapture issues (${captureIssues.length}):`);
    for (const f of captureIssues) console.log(`  - [${f.page}/${f.step}] ${f.error || ''}`);
  } else {
    console.log('\nNo capture issues.');
  }
  if (failures.length) {
    console.log(`\nTool failures (${failures.length}):`);
    for (const f of failures) console.log(`  - [${f.scope}] ${f.msg}`);
  }
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
