import type { APIRoute } from 'astro'

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /.*

# Allow specific important files
Allow: /favicon.svg
Allow: /opengraph.jpg
Allow: /sitemap-index.xml
Allow: /sitemap*.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${sitemapURL.href}

# Additional sitemaps (if any)
# Sitemap: ${sitemapURL.origin}/blog-sitemap.xml
`.trim()

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Site URL not configured', { status: 500 })
  }
  
  const sitemapURL = new URL('sitemap-index.xml', site)
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
