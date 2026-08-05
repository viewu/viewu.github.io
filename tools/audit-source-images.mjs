import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const imageRoot = join(projectRoot, 'source', 'images');
const failures = [];

function collectFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(absolutePath);
    return entry.isFile() ? [absolutePath] : [];
  });
}

if (!existsSync(imageRoot)) {
  failures.push('source/images/ does not exist.');
} else {
  const files = collectFiles(imageRoot);
  const articleRasterImages = files.filter(file => {
    const path = relative(imageRoot, file).replaceAll('\\', '/');
    return path.includes('/') && ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'].includes(extname(file).toLowerCase());
  });
  const legacyImages = articleRasterImages.filter(file => ['.png', '.jpg', '.jpeg', '.gif'].includes(extname(file).toLowerCase()));
  const modernImages = articleRasterImages.filter(file => ['.webp', '.avif'].includes(extname(file).toLowerCase()));
  const maximumImageBytes = 2 * 1024 * 1024;

  for (const file of legacyImages) {
    failures.push(`${relative(projectRoot, file)}: article images must use lossless WebP or AVIF.`);
  }

  for (const file of modernImages) {
    const size = statSync(file).size;
    if (size > maximumImageBytes) {
      failures.push(`${relative(projectRoot, file)}: source image exceeds the 2 MiB budget (${size} bytes).`);
    }
    if (extname(file).toLowerCase() === '.webp') {
      const header = readFileSync(file).subarray(0, 12);
      if (header.length < 12 || header.toString('ascii', 0, 4) !== 'RIFF' || header.toString('ascii', 8, 12) !== 'WEBP') {
        failures.push(`${relative(projectRoot, file)}: invalid WebP header.`);
      }
    }
  }

  if (modernImages.length === 0) failures.push('No modern article images were found.');

  if (failures.length === 0) {
    const totalBytes = modernImages.reduce((sum, file) => sum + statSync(file).size, 0);
    console.log(`Source-image audit passed: ${modernImages.length} modern article images, ${totalBytes} bytes.`);
  }
}

if (failures.length > 0) {
  console.error(`Source-image audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
