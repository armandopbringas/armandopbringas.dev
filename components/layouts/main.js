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
      <NavBar path={router.asPath} />

      <Container maxW={{ base: 'container.md', lg: 'container.lg' }} px={{ base: 4, md: 6 }} pt={4}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
