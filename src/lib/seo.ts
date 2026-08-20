/** Convierte el cuerpo markdown de un proyecto en un resumen apto para <meta description>. */
export function excerpt(markdown: string, max = 160): string {
    const clean = (block: string) =>
        block
            .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/[#*_>`~]/g, '')
            .replace(/\p{Extended_Pictographic}/gu, '')
            .replace(/\s+/g, ' ')
            .trim();

    const blocks = markdown.split(/\n\s*\n/).map(clean).filter(Boolean);
    if (blocks.length === 0) return '';

    // El primer párrafo suele ser el titular; si es muy corto, se le suma el siguiente.
    let text = blocks[0];
    if (text.length < 70 && blocks[1]) {
        text = `${text.replace(/[.\s]+$/, '')}. ${blocks[1]}`;
    }

    if (text.length <= max) return text;

    const cut = text.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\s]+$/, '')}\u2026`;
}
