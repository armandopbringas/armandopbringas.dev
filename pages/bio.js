import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { BioSection, BioYear } from '../components/bio'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const BioPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Bio - Armando Bringas</title>
        <meta name="twitter:title" content="Bio - Armando Bringas" />
        <meta property="og:title" content="Bio - Armando Bringas" />
      </Head>
      <Container>
        <Box position="relative" my="4rem">
        <ProfileFixedLayout currentPath={router.pathname} />

        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.35, type: 'easeInOut' }}
        >
          <Section delay={0.05}>
            <Box>
              <Heading as="h3" variant="section-title" mt={0}>
                Bio
              </Heading>
              <Stack spacing={2} mt={3}>
              <BioSection>
                <BioYear>1991</BioYear>
                Born in Orizaba (Veracruz), Mexico.
              </BioSection>
              <BioSection>
                <BioYear>2018</BioYear>
                Completed Chemical Engineering degree at Universidad Veracruzana.
              </BioSection>
              <BioSection>
                <BioYear>2020</BioYear>
                Worked as Web Developer.
              </BioSection>
              <BioSection>
                <BioYear>2026</BioYear>
                Transitioning from Frontend to Digital Analytics
              </BioSection>
            </Stack>
          </Box>
          </Section>
        </motion.div>
        </Box>
      </Container>
    </>
  )
}

export default BioPage
export { getServerSideProps } from '../components/chakra'
