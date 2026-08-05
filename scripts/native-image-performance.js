'use strict';

const { existsSync, readFileSync } = require('node:fs');
const { join, normalize, resolve, sep } = require('node:path');

function readImageDimensions(filePath) {
  const buffer = readFileSync(filePath);

  if (buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  }

  if (buffer.length >= 10 && buffer.toString('ascii', 0, 3) === 'GIF') {
    return {
      width: buffer.readUInt16LE(6),
      height: buffer.readUInt16LE(8)
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const startOfFrameMarkers = new Set([
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
      0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf
    ]);
    let offset = 2;

    while (offset + 8 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      if (startOfFrameMarkers.has(marker)) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5)
        };
      }

      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }

      const segmentLength = buffer.readUInt16BE(offset + 2);
      if (segmentLength < 2) break;
      offset += segmentLength + 2;
    }
  }

  return null;
}

function appendAttribute(tag, name, value) {
  const closing = tag.endsWith('/>') ? '/>' : '>';
  return `${tag.slice(0, -closing.length).trimEnd()} ${name}="${value}"${closing}`;
}

function localSourcePath(rawSource) {
  const source = rawSource.split(/[?#]/, 1)[0];
  if (!source.startsWith('/') || source.startsWith('//')) return null;

  let decodedSource;
  try {
    decodedSource = decodeURIComponent(source);
  } catch {
    return null;
  }

  const sourceRoot = resolve(hexo.source_dir);
  const relativePath = decodedSource.replace(/^\/+/, '').replaceAll('/', sep);
  const candidate = normalize(join(sourceRoot, relativePath));
  if (!candidate.startsWith(sourceRoot + sep)) return null;
  return existsSync(candidate) ? candidate : null;
}

hexo.extend.filter.register('after_post_render', data => {
  data.content = data.content.replace(/<img\b[^>]*>/gi, originalTag => {
    let tag = originalTag;

    if (!/\bloading\s*=/i.test(tag)) tag = appendAttribute(tag, 'loading', 'lazy');
    if (!/\bdecoding\s*=/i.test(tag)) tag = appendAttribute(tag, 'decoding', 'async');

    if (!/\bwidth\s*=/i.test(tag) && !/\bheight\s*=/i.test(tag)) {
      const sourceMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
      const filePath = sourceMatch ? localSourcePath(sourceMatch[1]) : null;
      const dimensions = filePath ? readImageDimensions(filePath) : null;

      if (dimensions?.width > 0 && dimensions?.height > 0) {
        tag = appendAttribute(tag, 'width', dimensions.width);
        tag = appendAttribute(tag, 'height', dimensions.height);
      }
    }

    return tag;
  });

  return data;
});
