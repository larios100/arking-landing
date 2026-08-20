/**
 * Devuelve la miniatura de 900px de una foto de proyecto (ver scripts/generate-thumbs.mjs).
 * Si la ruta no es de /img/projects, se devuelve tal cual.
 */
export function thumb(src: string): string {
    if (!src.startsWith('/img/projects/')) return src;
    const name = src.slice('/img/projects/'.length).replace(/\.(jpe?g|png)$/i, '.webp');
    return `/img/projects/thumb/${name}`;
}
