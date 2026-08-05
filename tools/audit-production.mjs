import { appendFileSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const productionOrigin = 'https://viewu.github.io';
const skipPageSpeed = process.argv.includes('--skip-pagespeed');
const failures = [];
const warnings = [];

async function fetchWithTimeout(url, options = {}, timeoutMs = 30_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'user-agent': 'viewu-blog-health-audit/1.0',
        ...options.headers
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function auditCriticalEndpoints() {
  const checks = [
    {
      name: 'Homepage',
      path: '/',
      contentType: 'text/html',
      validate: body => body.includes('rel="manifest"') && body.includes('application/atom+xml')
    },
    {
      name: 'Robots',
      path: '/robots.txt',
      contentType: 'text/plain',
      validate: body => body.includes('Sitemap: https://viewu.github.io/sitemap.xml')
    },
    {
      name: 'Sitemap',
      path: '/sitemap.xml',
      contentType: 'xml',
      validate: body => body.includes('<loc>https://viewu.github.io/</loc>')
    },
    {
      name: 'Atom feed',
      path: '/atom.xml',
      contentType: 'xml',
      validate: body => body.includes('<feed') && body.includes('https://viewu.github.io/')
    },
    {
      name: 'Web manifest',
      path: '/manifest.webmanifest',
      contentType: 'json',
      validate: body => {
        try {
          const manifest = JSON.parse(body);
          return manifest.start_url === '/' && manifest.scope === '/';
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Representative article',
      path: '/2026/06/30/resume-overwritten-learning-codex/',
      contentType: 'text/html',
      validate: body => body.includes('.webp') && body.includes('loading="lazy"') && body.includes('decoding="async"')
    }
  ];

  const results = [];
  for (const check of checks) {
    try {
      const response = await fetchWithTimeout(`${productionOrigin}${check.path}`);
      const body = await response.text();
      const contentType = response.headers.get('content-type') || '';
      const valid = response.status === 200 && contentType.includes(check.contentType) && check.validate(body);
      results.push({ ...check, status: response.status, contentType, valid });
      if (!valid) failures.push(`${check.name} failed its production response contract.`);
    } catch (error) {
      results.push({ ...check, status: 'error', contentType: '', valid: false });
      failures.push(`${check.name} request failed: ${error.message}`);
    }
  }

  const imagePath = '/images/resume-overwritten-learning-codex/verification-loop.webp';
  try {
    const response = await fetchWithTimeout(`${productionOrigin}${imagePath}`, { method: 'HEAD' });
    const contentType = response.headers.get('content-type') || '';
    const contentLength = Number(response.headers.get('content-length'));
    const valid = response.status === 200 && contentType.includes('image/webp') && contentLength === 1_727_186;
    results.push({ name: 'Representative WebP', path: imagePath, status: response.status, contentType, valid });
    if (!valid) failures.push('Representative WebP failed its status, MIME, or content-length contract.');
  } catch (error) {
    results.push({ name: 'Representative WebP', path: imagePath, status: 'error', contentType: '', valid: false });
    failures.push(`Representative WebP request failed: ${error.message}`);
  }

  return results;
}

function collectMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return collectMarkdownFiles(absolutePath);
    return entry.isFile() && extname(entry.name).toLowerCase() === '.md' ? [absolutePath] : [];
  });
}

function collectExternalLinks() {
  const sourceRoot = join(projectRoot, 'source');
  const links = new Set();
  for (const file of collectMarkdownFiles(sourceRoot)) {
    const markdown = readFileSync(file, 'utf8');
    for (const match of markdown.matchAll(/https?:\/\/[^\s<>"']+/g)) {
      const url = match[0].replace(/[\])},.;，。]+$/u, '');
      try {
        const parsed = new URL(url);
        if (parsed.origin !== productionOrigin) links.add(parsed.href);
      } catch {
        warnings.push(`Could not parse external URL found in ${file}: ${url}`);
      }
    }
  }
  return [...links].sort();
}

async function checkExternalLink(url) {
  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { range: 'bytes=0-0' }
    }, 25_000);
    await response.body?.cancel();
    if (response.status === 404 || response.status === 410) return { url, status: response.status, result: 'broken' };
    if (response.status >= 200 && response.status < 400) return { url, status: response.status, result: 'ok' };
    return { url, status: response.status, result: 'warning' };
  } catch (error) {
    return { url, status: 'error', result: 'warning', message: error.message };
  }
}

async function auditExternalLinks() {
  const links = collectExternalLinks();
  const results = [];
  const queue = [...links];
  const workers = Array.from({ length: Math.min(4, links.length) }, async () => {
    while (queue.length > 0) {
      const url = queue.shift();
      results.push(await checkExternalLink(url));
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => a.url.localeCompare(b.url));

  for (const result of results) {
    if (result.result === 'broken') failures.push(`Broken external link (${result.status}): ${result.url}`);
    if (result.result === 'warning') warnings.push(`External link could not be confirmed (${result.status}): ${result.url}`);
  }
  return results;
}

async function auditPageSpeed() {
  if (skipPageSpeed) return { skipped: true };

  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', `${productionOrigin}/`);
  endpoint.searchParams.set('strategy', 'MOBILE');
  for (const category of ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO']) {
    endpoint.searchParams.append('category', category);
  }
  if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set('key', process.env.PAGESPEED_API_KEY);

  try {
    const response = await fetchWithTimeout(endpoint, {}, 180_000);
    if (!response.ok) {
      warnings.push(`PageSpeed API returned HTTP ${response.status}; scores were not recorded.`);
      return { error: `HTTP ${response.status}` };
    }
    const data = await response.json();
    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};
    return {
      fetchedAt: data.lighthouseResult?.fetchTime,
      lighthouseVersion: data.lighthouseResult?.lighthouseVersion,
      scores: Object.fromEntries(['performance', 'accessibility', 'best-practices', 'seo'].map(name => [
        name,
        categories[name]?.score == null ? null : Math.round(categories[name].score * 100)
      ])),
      metrics: {
        FCP: audits['first-contentful-paint']?.displayValue,
        LCP: audits['largest-contentful-paint']?.displayValue,
        TBT: audits['total-blocking-time']?.displayValue,
        CLS: audits['cumulative-layout-shift']?.displayValue,
        SI: audits['speed-index']?.displayValue
      }
    };
  } catch (error) {
    warnings.push(`PageSpeed API request failed: ${error.message}`);
    return { error: error.message };
  }
}

function escapeCell(value) {
  return String(value ?? 'n/a').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function renderSummary(critical, external, pageSpeed) {
  const lines = [
    '# Production health audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Critical endpoints',
    '',
    '| Check | Status | Content type | Result |',
    '| --- | ---: | --- | --- |',
    ...critical.map(result => `| ${escapeCell(result.name)} | ${escapeCell(result.status)} | ${escapeCell(result.contentType)} | ${result.valid ? 'pass' : 'fail'} |`),
    '',
    '## External links',
    '',
    `Checked ${external.length} unique published external URLs.`,
    '',
    '| URL | Status | Result |',
    '| --- | ---: | --- |',
    ...external.map(result => `| ${escapeCell(result.url)} | ${escapeCell(result.status)} | ${escapeCell(result.result)} |`),
    '',
    '## Mobile PageSpeed baseline',
    ''
  ];

  if (pageSpeed.skipped) {
    lines.push('Skipped by command-line option.');
  } else if (pageSpeed.error) {
    lines.push(`Unavailable: ${escapeCell(pageSpeed.error)}`);
  } else {
    lines.push('| Performance | Accessibility | Best Practices | SEO |');
    lines.push('| ---: | ---: | ---: | ---: |');
    lines.push(`| ${escapeCell(pageSpeed.scores.performance)} | ${escapeCell(pageSpeed.scores.accessibility)} | ${escapeCell(pageSpeed.scores['best-practices'])} | ${escapeCell(pageSpeed.scores.seo)} |`);
    lines.push('');
    lines.push('| FCP | LCP | TBT | CLS | Speed Index |');
    lines.push('| --- | --- | --- | --- | --- |');
    lines.push(`| ${escapeCell(pageSpeed.metrics.FCP)} | ${escapeCell(pageSpeed.metrics.LCP)} | ${escapeCell(pageSpeed.metrics.TBT)} | ${escapeCell(pageSpeed.metrics.CLS)} | ${escapeCell(pageSpeed.metrics.SI)} |`);
    lines.push('');
    lines.push(`Lighthouse ${escapeCell(pageSpeed.lighthouseVersion)}, fetched ${escapeCell(pageSpeed.fetchedAt)}.`);
  }

  lines.push('', '## Outcome', '');
  lines.push(`- Failures: ${failures.length}`);
  lines.push(`- Warnings: ${warnings.length}`);
  for (const failure of failures) lines.push(`- ❌ ${failure}`);
  for (const warning of warnings) lines.push(`- ⚠️ ${warning}`);
  return `${lines.join('\n')}\n`;
}

const criticalResults = await auditCriticalEndpoints();
const externalResults = await auditExternalLinks();
const pageSpeedResult = await auditPageSpeed();
const summary = renderSummary(criticalResults, externalResults, pageSpeedResult);

console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary, 'utf8');
if (failures.length > 0) process.exitCode = 1;
