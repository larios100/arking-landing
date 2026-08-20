/**
 * Redimensiona y recomprime las imágenes de public/img que superen MAX_WIDTH.
 * Los originales se respaldan en img-originales/ (fuera de public/, así no se publican).
 *
 *   npm run optimize:images          -> aplica los cambios
 *   npm run optimize:images -- --dry -> solo reporta, no toca nada
 */
import { readdir, mkdir, copyFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'public/img';
const BACKUP_DIR = 'img-originales';
const MAX_WIDTH = 2000;
const QUALITY = { webp: 80, jpeg: 82, png: 90 };
const EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

const dryRun = process.argv.includes('--dry');

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full);
        else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
    }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

let before = 0;
let after = 0;
let touched = 0;

for await (const file of walk(SOURCE_DIR)) {
    const original = (await stat(file)).size;
    const image = sharp(file);
    const { width, height, format } = await image.metadata();

    before += original;

    if (!width || width <= MAX_WIDTH) {
        after += original;
        continue;
    }

    const quality = QUALITY[format] ?? 80;
    const buffer = await image
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .toFormat(format, { quality })
        .toBuffer();

    console.log(
        `${file}\n  ${width}x${height} ${kb(original)}  ->  ${MAX_WIDTH}px ${kb(buffer.length)}` +
            `  (-${Math.round((1 - buffer.length / original) * 100)}%)`
    );

    after += buffer.length;
    touched += 1;

    if (dryRun) continue;

    const backup = path.join(BACKUP_DIR, path.relative(SOURCE_DIR, file));
    if (!existsSync(backup)) {
        await mkdir(path.dirname(backup), { recursive: true });
        await copyFile(file, backup);
    }
    await writeFile(file, buffer);
}

console.log(
    `\n${touched} imagen(es) ${dryRun ? 'por optimizar' : 'optimizadas'}: ` +
        `${kb(before)} -> ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)` +
        (dryRun ? '\nEjecuta sin --dry para aplicarlo.' : `\nOriginales respaldados en ${BACKUP_DIR}/`)
);
