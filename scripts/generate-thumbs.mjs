/**
 * Genera miniaturas de 900px para las tarjetas y vistas previas de proyectos.
 * Las fotos completas se siguen usando en el hero del detalle y en el lightbox.
 *
 *   npm run thumbs
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'public/img/projects';
const OUTPUT_DIR = 'public/img/projects/thumb';
const WIDTH = 900;

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.(webp|jpe?g|png)$/i.test(entry.name))
    .map((entry) => entry.name);

let before = 0;
let after = 0;

for (const name of files) {
    const input = path.join(SOURCE_DIR, name);
    const output = path.join(OUTPUT_DIR, name.replace(/\.(jpe?g|png)$/i, '.webp'));

    const info = await sharp(input)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(output);

    before += (await stat(input)).size;
    after += info.size;
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
console.log(`${files.length} miniaturas en ${OUTPUT_DIR}: ${kb(before)} -> ${kb(after)}`);
