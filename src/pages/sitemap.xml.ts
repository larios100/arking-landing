import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

/**
 * Sitemap generado a mano: @astrojs/sitemap no es compatible con la versión
 * de Astro de este proyecto. Al agregar páginas nuevas, añádelas a `staticPages`.
 */
const staticPages = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/projects/', changefreq: 'monthly', priority: '0.8' },
];

export const GET: APIRoute = async () => {
    const projects = await getCollection('projects');
    const lastmod = new Date().toISOString().split('T')[0];

    const urls = [
        ...staticPages,
        ...projects.map((project) => ({
            path: `/projects/${project.slug}/`,
            changefreq: 'yearly',
            priority: '0.6',
        })),
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (url) => `  <url>
    <loc>${SITE.url}${url.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>
`;

    return new Response(body, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
};
