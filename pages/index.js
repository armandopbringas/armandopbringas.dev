import {
  Link,
  Container,
  Heading,
  Box,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Image from 'next/image'
import { FaGithub, FaLinkedinIn, FaMobile } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import styled from '@emotion/styled'
import { skills } from '../content'
import { FlexBox, ListBox } from '../components/layouts/Boxes'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

export const HoverBox = styled.span`
  transition: 0.35s;
  cursor: pointer;
  :hover {
    color: #fb8500;
  }
`

const Home = () => {
  return (
    <Layout>
      <Container>
        <Box display={{ md: 'flex' }} alignItems="flex-end" gap="2rem">
          <Box
            order={1}
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/images/armando.jpg"
                alt="Profile image"
                borderRadius="full"
                width="100"
                height="100"
                objectFit="cover"
                objectPosition="top"
              />
            </Box>
          </Box>
          <Box
            order={2}
            display="flex"
            flexDir="column"
            gap="1rem"
            marginTop="1rem"
            alignItems="center"
          >
            <Heading as="h2" variant="page-title">
              Armando Bringas
            </Heading>
            <Box
              display="flex"
              justifyContent={{ md: 'space-between' }}
              gap="1rem"
              width={{ md: '100%' }}
              alignItems="center"
              flexDir={{ base: 'column', md: 'row' }}
            >
              <Box
                borderRadius="lg"
                p={3}
                bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                css={{ backdropFilter: 'blur(10px)' }}
                w="fit-content"
              >
                Frontend developer
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <a
                  href="https://github.com/armandopbringas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverBox>
                    <FaGithub />
                  </HoverBox>
                </a>
                <a
                  href="https://www.linkedin.com/in/armandopbringas/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverBox>
                    <FaLinkedinIn />
                  </HoverBox>
                </a>
                <a
                  href="mailto:bringas.armandop@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverBox>
                    <MdEmail />
                  </HoverBox>
                </a>
                <a
                  href="tel:+52 272 723 2016"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverBox>
                    <FaMobile />
                  </HoverBox>
                </a>
              </Box>
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" marginTop="2rem">
            Work
          </Heading>
          <Paragraph>
            Hi there, my name is Armando, I’m a self-taught Front-end developer
            with 2+ years of experience. My main focus is on creating intuitive
            and appealing web experiences using as tech stack HTML5, CSS3,
            JavaScript, React JS & TypeScript. I looking for professional
            improvement to learn, challenge and apply my skills.
          </Paragraph>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1991</BioYear>
            Born in Orizaba (Veracruz), Mexico.
          </BioSection>
          <BioSection>
            <BioYear>2018</BioYear>
            Completed chemichal engineering degree at Universidad Veracruzana.
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            Worked at Iceberg9 as junior frontend developer
          </BioSection>
          <BioSection>
            <BioYear>2021</BioYear>
            Worked with Noble as junior web developer
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            Worked at Rocket Code as React developer
          </BioSection>
          <BioSection>
            <BioYear>2023</BioYear>
            Currently working at HCL Tech as UI developer
          </BioSection>
        </Section>

        <Section>
          <Heading as="h3" variant="section-title">
            Skills
          </Heading>
          <FlexBox>
            {skills.map((skil, i) => (
              <ListBox key={i}>
                <div>{skill.logoSkill}</div>
                <span>{skill.skill}</span>
              </ListBox>
            ))}
          </FlexBox>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>
            My gf, Music,{' '}
            <Link
              href="https://www.youtube.com/watch?v=O9FM11Ky4hs&t=11837s"
              target="_blank"
              rel="noopener noreferrer"
            >
              Playing frontenis,{' '}
            </Link>
            Buzz & code
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
