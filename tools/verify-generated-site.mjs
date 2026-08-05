import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, normalize, resolve, sep } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const publicRoot = join(projectRoot, 'public');
const failures = [];

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(absolutePath);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolutePath] : [];
  });
}

function localTargetExists(rawPath) {
  const withoutQuery = rawPath.split(/[?#]/, 1)[0];
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(withoutQuery);
  } catch {
    return false;
  }

  const relativePath = decodedPath.replace(/^\/+/, '').replaceAll('/', sep);
  const candidate = normalize(join(publicRoot, relativePath));
  if (!candidate.startsWith(publicRoot + sep) && candidate !== publicRoot) return false;
  if (existsSync(candidate)) return true;
  if (existsSync(join(candidate, 'index.html'))) return true;
  return existsSync(`${candidate}.html`);
}

if (!existsSync(publicRoot)) {
  failures.push('public/ does not exist; run the Hexo build first.');
} else {
  const requiredPages = [
    'index.html',
    'about/index.html',
    'archives/index.html',
    'categories/index.html',
    'tags/index.html',
    '2024/04/03/最后的终点/index.html',
    '2026/07/13/gpt-5-6-chatgpt-direction-workflow/index.html'
  ];
  for (const page of requiredPages) {
    if (!existsSync(join(publicRoot, ...page.split('/')))) failures.push(`Missing required page: /${page}`);
  }

  const htmlFiles = collectHtmlFiles(publicRoot);
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const page = file.slice(publicRoot.length).replaceAll('\\', '/');

    if (html.includes('pjax@0.2.8')) failures.push(`${page}: legacy duplicate PJAX script is present.`);
    if (/\b(?:src|href)=["'][A-Za-z]:\\/i.test(html)) failures.push(`${page}: contains a local Windows path.`);

    const attributePattern = /\b(?:src|href)=["'](\/(?!\/)[^"']*)["']/gi;
    for (const match of html.matchAll(attributePattern)) {
      if (!localTargetExists(match[1])) failures.push(`${page}: missing local target ${match[1]}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Generated-site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Generated-site verification passed.');
