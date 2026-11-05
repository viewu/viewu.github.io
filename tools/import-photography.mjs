import { execFileSync } from 'node:child_process';
import { constants, copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, rmdirSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';

const input = process.argv[2];
if (!input) throw new Error('Usage: npm run photography:import -- <year-folder>');
const source = resolve(input);
const year = basename(source);
if (!/^\d{4}$/.test(year)) throw new Error('Use a year folder, for example 2026.');

const root = resolve(import.meta.dirname, '..');
const gallery = join(root, 'source', 'images', 'photography');
const formats = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const order = new Intl.Collator('en', { numeric: true });
const files = readdirSync(source, { withFileTypes: true })
  .filter(file => file.isFile() && formats.has(extname(file.name).toLowerCase()))
  .map(file => file.name)
  .sort(order.compare);
const planned = new Map();
for (const name of files) {
  const stem = basename(name, extname(name)).normalize('NFC');
  const slug = /^\d+$/.test(stem) ? stem.padStart(2, '0') : stem.toLowerCase().replace(/[^\p{L}\p{N}._-]+/gu, '-');
  const output = `${year}-${slug}.webp`;
  if (planned.has(output)) throw new Error(`Conflicting filenames: ${planned.get(output)} and ${name}`);
  planned.set(output, name);
}

const pending = [...planned].filter(([output]) => !existsSync(join(gallery, output)));
if (pending.length) {
  const cache = join(root, '.cache');
  mkdirSync(cache, { recursive: true });
  mkdirSync(gallery, { recursive: true });
  const temp = mkdtempSync(join(cache, 'photo-import-'));
  try {
    for (const [output, name] of pending) {
      const copy = join(temp, output);
      execFileSync('ffmpeg', [
        '-hide_banner', '-loglevel', 'error', '-n', '-i', join(source, name),
        '-map_metadata', '-1', '-frames:v', '1', '-vf', "scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease",
        '-c:v', 'libwebp', '-quality', '84', '-compression_level', '6', copy
      ], { stdio: 'inherit' });
      if (statSync(copy).size > 2 * 1024 * 1024) throw new Error(`${name}: web copy exceeds 2 MiB.`);
    }
    for (const [output] of pending) copyFileSync(join(temp, output), join(gallery, output), constants.COPYFILE_EXCL);
  } finally {
    for (const [output] of pending) rmSync(join(temp, output), { force: true });
    rmdirSync(temp);
  }
}
console.log(`Photography: ${pending.length} added, ${planned.size - pending.length} already present. Existing copies and originals were left intact.`);
