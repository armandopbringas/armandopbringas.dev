import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      {/*
        THESIS: A focused independent software studio that turns web work into a credible business system, not a generic agency showroom.
        OWN-WORLD: Ink and cool-paper surfaces, graphite signals, precise rules, compact utility controls, and editorial Grotesk typography.
        STORY: Visitors understand the offer, evaluate real project evidence, then contact Armando through familiar actions.
        FIRST VIEWPORT: A full-bleed project image introduces the value proposition with direct actions and contact utilities centered in the field.
        FORM: Indie tech enterprise service portfolio; seed 3f702d34.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Armando's homepage" />
        <meta name="author" content="Armando Bringas" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:site_name" content="Armando Bringas" />
        <meta name="og:title" content="Armando Bringas" />
        <meta property="og:type" content="website" />
        <title>Armando Bringas - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={4}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
