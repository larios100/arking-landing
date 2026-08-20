/**
 * Genera las imágenes para compartir en redes (1200x630 JPEG) a partir de la
 * foto principal de cada proyecto. Facebook y WhatsApp no muestran bien webp.
 *
 *   npm run og
 */
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CONTENT_DIR = 'src/content/projects';
const OUTPUT_DIR = 'public/img/og';

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(CONTENT_DIR)).filter((file) => file.endsWith('.md'));

for (const file of files) {
    const slug = path.basename(file, '.md');
    const source = await readFile(path.join(CONTENT_DIR, file), 'utf-8');
    const match = source.match(/^image:\s*'([^']+)'/m);

    if (!match) {
        console.warn(`- ${slug}: sin campo "image", se omite`);
        continue;
    }

    const input = path.join('public', match[1]);
    const output = path.join(OUTPUT_DIR, `${slug}.jpg`);

    const info = await sharp(input)
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82 })
        .toFile(output);

    console.log(`${output}  ${Math.round(info.size / 1024)} KB`);
}
