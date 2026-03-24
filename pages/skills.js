import { Container, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { frontendSkills } from '../content'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'
import { FlexBox, ListBox } from '../components/layouts/Boxes'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const SkillsPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Skills - Armando Bringas</title>
        <meta name="twitter:title" content="Skills - Armando Bringas" />
        <meta property="og:title" content="Skills - Armando Bringas" />
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
            <Heading as="h3" variant="section-title" mt={0}>
              Skills
            </Heading>
            <FlexBox>
              {frontendSkills.map((skill, i) => (
                <ListBox key={i}>
                  <div>{skill.logoSkill}</div>
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
