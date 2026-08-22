import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, normalize, resolve, sep } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const publicRoot = join(projectRoot, 'public');
const failures = [];

function collectFiles(directory, predicate = () => true) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(absolutePath, predicate);
    return entry.isFile() && predicate(entry) ? [absolutePath] : [];
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
    'music/index.html',
    '404.html',
    '2024/04/03/最后的终点/index.html',
    '2026/07/13/gpt-5-6-chatgpt-direction-workflow/index.html'
  ];
  for (const page of requiredPages) {
    if (!existsSync(join(publicRoot, ...page.split('/')))) failures.push(`Missing required page: /${page}`);
  }

  const requiredFiles = ['robots.txt', 'sitemap.xml', 'atom.xml', 'manifest.webmanifest'];
  for (const file of requiredFiles) {
    if (!existsSync(join(publicRoot, file))) failures.push(`Missing required discovery file: /${file}`);
  }

  const indexHtml = readFileSync(join(publicRoot, 'index.html'), 'utf8');
  if (!indexHtml.includes('rel="manifest" href="/manifest.webmanifest"')) {
    failures.push('/index.html: web app manifest is not linked.');
  }
  if (!indexHtml.includes('type="application/atom+xml"')) {
    failures.push('/index.html: Atom feed autodiscovery link is missing.');
  }

  const musicHtml = readFileSync(join(publicRoot, 'music', 'index.html'), 'utf8');
  const albumCardCount = (musicHtml.match(/class="music-album-card"/g) || []).length;
  if (albumCardCount !== 12) failures.push(`/music/index.html: expected 12 album cards, found ${albumCardCount}.`);
  if (!musicHtml.includes('album-jay-chou-eight-dimensions')) {
    failures.push('/music/index.html: 八度空间 album card is missing.');
  }
  if (musicHtml.includes('james-blake-trying-times') || musicHtml.includes('Trying Times')) {
    failures.push('/music/index.html: replaced Trying Times content is still present.');
  }

  const robots = readFileSync(join(publicRoot, 'robots.txt'), 'utf8');
  if (!robots.includes('User-agent: *') || !robots.includes('Sitemap: https://viewu.github.io/sitemap.xml')) {
    failures.push('/robots.txt: crawler policy or sitemap declaration is missing.');
  }

  const sitemap = readFileSync(join(publicRoot, 'sitemap.xml'), 'utf8');
  if (!sitemap.includes('<urlset') || !sitemap.includes('<loc>https://viewu.github.io/</loc>')) {
    failures.push('/sitemap.xml: valid root URL entry is missing.');
  }

  const atom = readFileSync(join(publicRoot, 'atom.xml'), 'utf8');
  if (!atom.includes('<feed') || !atom.includes('https://viewu.github.io/')) {
    failures.push('/atom.xml: valid Atom feed content is missing.');
  }

  try {
    const manifest = JSON.parse(readFileSync(join(publicRoot, 'manifest.webmanifest'), 'utf8'));
    if (manifest.start_url !== '/' || manifest.scope !== '/' || manifest.icons?.[0]?.src !== '/images/avatar.png') {
      failures.push('/manifest.webmanifest: required start URL, scope, or icon is missing.');
    }
  } catch {
    failures.push('/manifest.webmanifest: invalid JSON.');
  }

  const htmlFiles = collectFiles(publicRoot, entry => entry.name.endsWith('.html'));
  let contentImagesWithDimensions = 0;
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const page = file.slice(publicRoot.length).replaceAll('\\', '/');

    if (html.includes('pjax@0.2.8')) failures.push(`${page}: legacy duplicate PJAX script is present.`);
    if (/\b(?:src|href)=["'][A-Za-z]:\\/i.test(html)) failures.push(`${page}: contains a local Windows path.`);
    if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) failures.push(`${page}: document language is missing.`);
    if (!/<meta\b[^>]*\bname=["']viewport["']/i.test(html)) failures.push(`${page}: viewport metadata is missing.`);
    if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${page}: page title is missing.`);
    if (!/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']https:\/\/viewu\.github\.io\//i.test(html)) {
      failures.push(`${page}: production canonical URL is missing.`);
    }

    for (const match of html.matchAll(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi)) {
      if (!/\brel=["'][^"']*\bnoopener\b[^"']*["']/i.test(match[0])) {
        failures.push(`${page}: target=_blank link is missing rel=noopener.`);
      }
    }

    for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']\/images\/(?!avatar\.png|social\/)[^"']+["'][^>]*>/gi)) {
      const image = match[0];
      if (!/\bloading=["']lazy["']/i.test(image)) failures.push(`${page}: content image is missing native lazy loading.`);
      if (!/\bdecoding=["']async["']/i.test(image)) failures.push(`${page}: content image is missing async decoding.`);
      if (/\bwidth=["']\d+["']/i.test(image) && /\bheight=["']\d+["']/i.test(image)) {
        contentImagesWithDimensions += 1;
      }
    }

    const attributePattern = /\b(?:src|href)=["'](\/(?!\/)[^"']*)["']/gi;
    for (const match of html.matchAll(attributePattern)) {
      if (!localTargetExists(match[1])) failures.push(`${page}: missing local target ${match[1]}`);
    }
  }

  if (contentImagesWithDimensions === 0) {
    failures.push('No content images include intrinsic width and height metadata.');
  }

  const generatedFiles = collectFiles(publicRoot);
  const totalBytes = generatedFiles.reduce((sum, file) => sum + statSync(file).size, 0);
  const maximumSiteBytes = 55 * 1024 * 1024;
  const maximumAssetBytes = 2 * 1024 * 1024;
  if (totalBytes > maximumSiteBytes) {
    failures.push(`Generated site exceeds the 55 MiB budget (${totalBytes} bytes).`);
  }
  for (const file of generatedFiles) {
    const size = statSync(file).size;
    if (size > maximumAssetBytes) {
      const page = file.slice(publicRoot.length).replaceAll('\\', '/');
      failures.push(`${page}: asset exceeds the 2 MiB budget (${size} bytes).`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Generated-site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Generated-site verification passed.');
