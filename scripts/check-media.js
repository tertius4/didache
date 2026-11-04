#!/usr/bin/env node
/**
 * Checks every file in static/media before a deploy, and fails if one is the
 * wrong size, or if the content points at a file that isn't there.
 *
 *   npm run check:media        (also runs as the first step of npm run deploy)
 *
 * The sizes come from lesson 1, which is the model for every lesson. To allow
 * a new kind of file, add a rule to RULES. No dependencies: it reads the
 * sizes straight from the WebP, PNG, JPEG and MP4 headers.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const media = join(root, 'static', 'media');
const content = join(root, 'src', 'lib', 'content');

/** First matching rule wins. Paths are relative to static/media, with / separators. */
const RULES = [
	{ what: 'lesson video', match: /^[^/]+\/[^/]+\/[^/]+\/video\.mp4$/, size: [720, 1280] },
	{ what: 'video poster', match: /^[^/]+\/[^/]+\/[^/]+\/poster\.webp$/, size: [900, 1600] },
	{ what: 'story card', match: /^[^/]+\/[^/]+\/[^/]+\/[a-z0-9-]+\.webp$/, size: [1200, 900] },
	{ what: 'unit icon', match: /^[^/]+\/[^/]+\/icon\.webp$/, square: true },
	{ what: 'about picture', match: /^about\/[a-z0-9-]+\.webp$/, size: [1200, 900] },
	{ what: 'interface art', match: /^ui\//, any: true }
];

// ---------------------------------------------------------------- reading sizes

function webpSize(b) {
	if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
	const chunk = b.toString('ascii', 12, 16);
	if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
	if (chunk === 'VP8L') {
		const [b0, b1, b2, b3] = [b[21], b[22], b[23], b[24]];
		return [
			1 + (((b1 & 0x3f) << 8) | b0),
			1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6))
		];
	}
	if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
	return null;
}

function pngSize(b) {
	if (b.readUInt32BE(0) !== 0x89504e47) return null;
	return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function jpegSize(b) {
	if (b[0] !== 0xff || b[1] !== 0xd8) return null;
	let i = 2;
	while (i + 9 < b.length) {
		if (b[i] !== 0xff) return null;
		const marker = b[i + 1];
		const len = b.readUInt16BE(i + 2);
		if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
			return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
		i += 2 + len;
	}
	return null;
}

/** Width and height of the first video track, from its tkhd box. */
function mp4Size(b) {
	const walk = (start, end) => {
		for (let i = start; i + 8 <= end; ) {
			let size = b.readUInt32BE(i);
			const type = b.toString('ascii', i + 4, i + 8);
			let head = 8;
			if (size === 1) {
				size = Number(b.readBigUInt64BE(i + 8));
				head = 16;
			} else if (size === 0) size = end - i;
			if (size < head) return null;
			if (type === 'moov' || type === 'trak') {
				const found = walk(i + head, i + size);
				if (found) return found;
			} else if (type === 'tkhd') {
				const w = b.readUInt32BE(i + size - 8) / 65536;
				const h = b.readUInt32BE(i + size - 4) / 65536;
				if (w && h) return [Math.round(w), Math.round(h)];
			}
			i += size;
		}
		return null;
	};
	return walk(0, b.length);
}

function sizeOf(path) {
	const b = readFileSync(path);
	return webpSize(b) ?? pngSize(b) ?? jpegSize(b) ?? (/\.mp4$/i.test(path) ? mp4Size(b) : null);
}

// ---------------------------------------------------------------- the checks

function files(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir).flatMap((name) => {
		const p = join(dir, name);
		return statSync(p).isDirectory() ? files(p) : [p];
	});
}

const problems = [];
let checked = 0;

for (const path of files(media)) {
	const rel = relative(media, path).split(sep).join('/');
	if (rel.split('/').pop().startsWith('.')) continue;
	const rule = RULES.find((r) => r.match.test(rel));
	if (!rule) {
		problems.push(`${rel}: no rule for this file (add one to RULES in scripts/check-media.js)`);
		continue;
	}
	checked++;
	if (rule.any) continue;
	const size = sizeOf(path);
	if (!size) {
		problems.push(`${rel}: can't read its size (is it a real ${rel.split('.').pop()} file?)`);
		continue;
	}
	const [w, h] = size;
	if (rule.square && w !== h) problems.push(`${rel}: ${rule.what} is ${w}×${h}, must be square`);
	if (rule.size && (w !== rule.size[0] || h !== rule.size[1]))
		problems.push(`${rel}: ${rule.what} is ${w}×${h}, must be ${rule.size[0]}×${rule.size[1]}`);
}

for (const path of files(content).filter(
	(p) => /\.(ts|js|svelte)$/.test(p) && !/\.spec\./.test(p)
)) {
	const text = readFileSync(path, 'utf8');
	for (const m of text.matchAll(/['"`](\/media\/[\w\-/.]+\.\w+)['"`]/g)) {
		if (!existsSync(join(root, 'static', m[1])))
			problems.push(`${relative(root, path)}: points at ${m[1]}, which doesn't exist`);
	}
}

if (problems.length) {
	console.error(
		`check-media: ${problems.length} problem(s), not deploying:\n  ` + problems.join('\n  ')
	);
	process.exit(1);
}
console.log(`check-media: ${checked} media files, all the right size`);
