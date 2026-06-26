import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const site = 'https://tayeebislam.com';
  const staticPages = ['', 'about', 'contact', 'experience', 'projects'];
  const projects = await getCollection('projects');
  const projectPages = projects.map((project) => `projects/${project.id}`);

  const urls = [...staticPages, ...projectPages].map((path) => {
    const loc = path ? `${site}/${path}/` : `${site}/`;
    return `<url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
