const siteUrl = 'https://armandopbringas.dev'

const routes = [
  { path: '/', changeFrequency: 'weekly', priority: '1.0' },
  { path: '/bio', changeFrequency: 'monthly', priority: '0.6' },
  { path: '/skills', changeFrequency: 'monthly', priority: '0.5' }
]

const getLocalizedPath = (path, locale) =>
  locale === 'en' ? `/en${path === '/' ? '' : path}` : path

const createUrlEntry = ({ path, changeFrequency, priority }, locale) => {
  const localizedPath = getLocalizedPath(path, locale)
  const spanishPath = getLocalizedPath(path, 'es')
  const englishPath = getLocalizedPath(path, 'en')

  return `<url>
  <loc>${siteUrl}${localizedPath}</loc>
  <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}${spanishPath}" />
  <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${englishPath}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${spanishPath}" />
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`
}

export const getServerSideProps = ({ res }) => {
  const entries = routes
    .flatMap(route => ['es', 'en'].map(locale => createUrlEntry(route, locale)))
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

const Sitemap = () => null

export default Sitemap
