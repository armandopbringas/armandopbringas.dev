import Head from 'next/head'
import { useRouter } from 'next/router'

const siteUrl = 'https://armandopbringas.dev'

const getPathWithoutLocale = path => {
  const pathname = path.split(/[?#]/)[0] || '/'
  const withoutLocale = pathname.replace(/^\/(?:es|en)(?=\/|$)/, '')

  return withoutLocale || '/'
}

const getLocalizedPath = (path, locale) =>
  locale === 'en' ? `/en${path === '/' ? '' : path}` : path

const getAbsoluteUrl = path => `${siteUrl}${path}`

const SeoHead = ({ title, description, children, schema }) => {
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'es'
  const path = getPathWithoutLocale(router.asPath)
  const canonicalUrl = getAbsoluteUrl(getLocalizedPath(path, locale))
  const spanishUrl = getAbsoluteUrl(getLocalizedPath(path, 'es'))
  const englishUrl = getAbsoluteUrl(getLocalizedPath(path, 'en'))
  const imageUrl = `${siteUrl}/card.png`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Armando Bringas" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es" href={spanishUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="x-default" href={spanishUrl} />
      <meta property="og:site_name" content="Armando Bringas" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale === 'es' ? 'es_MX' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'es' ? 'en_US' : 'es_MX'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      {children}
    </Head>
  )
}

export const getHomeSchema = language => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#armando-bringas`,
      name: 'Armando P. Bringas',
      url: siteUrl,
      image: `${siteUrl}/images/armando.jpg`,
      email: 'mailto:bringas.armandop@gmail.com',
      jobTitle:
        language === 'es'
          ? 'Desarrollador de sitios y aplicaciones web'
          : 'Website and web application developer'
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Armando Bringas',
      inLanguage: language
    },
    {
      '@type': 'Service',
      name:
        language === 'es'
          ? 'Desarrollo web y automatización para negocios'
          : 'Web development and automation for businesses',
      provider: { '@id': `${siteUrl}/#armando-bringas` },
      serviceType:
        language === 'es'
          ? 'Desarrollo de sitios web, aplicaciones web y automatización'
          : 'Website development, web applications, and automation',
      inLanguage: language
    }
  ]
})

export default SeoHead
