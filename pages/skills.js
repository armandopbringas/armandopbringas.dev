import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { frontendSkills } from '../content'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'
import { FlexBox, ListBox } from '../components/layouts/Boxes'
import { useLanguage } from '../components/language-context'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const SkillsPage = () => {
  const router = useRouter()
  const skillsIconColor = useColorModeValue('ink.700', 'sand.400')
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t.meta.skillsTitle}</title>
        <meta name="twitter:title" content={t.meta.skillsTitle} />
        <meta property="og:title" content={t.meta.skillsTitle} />
      </Head>
      <Container>
        <div style={{ position: 'relative', margin: '4rem 0' }}>
        <ProfileFixedLayout currentPath={router.pathname} />

        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.35, type: 'easeInOut' }}
        >
          <Section delay={0.05}>
            <FlexBox>
              {frontendSkills.map((skill, i) => (
                <ListBox key={i}>
                  <Box color={skillsIconColor}>{skill.logoSkill}</Box>
                  <span>{skill.skill}</span>
                </ListBox>
              ))}
            </FlexBox>
          </Section>
        </motion.div>
        </div>
      </Container>
    </>
  )
}

export default SkillsPage
export { getServerSideProps } from '../components/chakra'
