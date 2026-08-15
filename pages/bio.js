import { Box, Container, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { BioSection, BioYear } from '../components/bio'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'
import { useLanguage } from '../components/language-context'
import SeoHead from '../components/seo-head'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const BioPage = () => {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <>
      <SeoHead title={t.meta.bioTitle} description={t.meta.bioDescription} />
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
              <Stack spacing={2} mt={0}>
              {t.bio.items.map(item => (
                <BioSection key={item.year}>
                  <BioYear>{item.year}</BioYear>
                  {item.text}
                </BioSection>
              ))}
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
