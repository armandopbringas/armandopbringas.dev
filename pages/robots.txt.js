const siteUrl = 'https://armandopbringas.dev'

export const getServerSideProps = ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
  res.end()

  return { props: {} }
}

const Robots = () => null

export default Robots
