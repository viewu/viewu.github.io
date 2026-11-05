'use strict';

const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

function webpSize(file) {
  const bytes = readFileSync(file);
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = bytes.toString('ascii', 12, 16);
    if (chunk === 'VP8X' && bytes.length >= 30) {
      return { width: bytes.readUIntLE(24, 3) + 1, height: bytes.readUIntLE(27, 3) + 1 };
    }
    if (chunk === 'VP8L' && bytes.length >= 25 && bytes[20] === 0x2f) {
      const size = bytes.readUInt32LE(21);
      return { width: (size & 0x3fff) + 1, height: ((size >>> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8 ' && bytes.length >= 30 && bytes.toString('hex', 23, 26) === '9d012a') {
      return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
    }
  }
  throw new Error(`Cannot read photography WebP dimensions: ${file}`);
}

const naturalOrder = new Intl.Collator('en', { numeric: true });

hexo.extend.helper.register('photography_images', function() {
  const directory = join(hexo.source_dir, 'images', 'photography');
  if (!existsSync(directory)) return [];
  const descriptions = this.site.data.photography_alt || {};
  return readdirSync(directory, { withFileTypes: true })
    .filter(file => file.isFile() && /\.webp$/i.test(file.name))
    .map(file => file.name)
    .sort(naturalOrder.compare)
    .map(name => ({ image: `/images/photography/${name}`, ...webpSize(join(directory, name)), alt: descriptions[name] || '' }));
});
