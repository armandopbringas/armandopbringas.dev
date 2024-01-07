import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Armando's homepage" />
        <meta name="author" content="Armando Bringas" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
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
