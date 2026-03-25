import NextLink from 'next/link'
import {
  Box,
  Heading,
  Link as ChakraLink,
  Wrap,
  WrapItem,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import { chakra } from '@chakra-ui/react'
import { FaGithub, FaMobile } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import styled from '@emotion/styled'
import Paragraph from './paragraph'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const HoverBox = styled.span`
  transition: 0.35s;
  cursor: pointer;
  :hover {
    color: #fb8500;
  }
`

const navItems = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/bio', label: 'Bio' },
  { href: '/skills', label: 'Skills' }
]

const ProfileFixedLayout = ({ currentPath }) => {
  const badgeBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')
  const inactiveColor = useColorModeValue('gray.700', 'whiteAlpha.700')
  const profileIconColor = useColorModeValue('ink.700', 'sand.400')

  return (
    <>
      <Box display={{ md: 'flex' }} alignItems="flex-start" gap="2rem">
        <Box order={1} flexShrink={0} mt={0} textAlign="center">
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
              src="/images/me.JPG"
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
          textAlign="left"
          w="100%"
        >
          <Heading as="h2" variant="page-title" alignSelf="flex-start">
            Armando Bringas
          </Heading>
          <Box
            display="flex"
            justifyContent="flex-start"
            gap="1rem"
            width="100%"
            alignItems="center"
            alignSelf="flex-start"
          >
            <Box display="flex" alignItems="center" gap="1rem">
              <a
                href="https://github.com/armandopbringas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HoverBox>
                  <FaGithub color={profileIconColor} />
                </HoverBox>
              </a>
              <a
                href="mailto:bringas.armandop@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HoverBox>
                  <MdEmail color={profileIconColor} />
                </HoverBox>
              </a>
              <a
                href="tel:+52 272 723 2016"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HoverBox>
                  <FaMobile color={profileIconColor} />
                </HoverBox>
              </a>
            </Box>
          </Box>
          <Box w="fit-content" alignSelf="flex-start">
            <Wrap spacing={2} display="flex" flexWrap="nowrap">
              {[
                'Technical Digital Analytics',
                'GA4, GTM & Web Measurement',
                'Frontend Background'
              ].map(label => (
                <WrapItem
                  key={label}
                  borderRadius="lg"
                  px={3}
                  py={1}
                  bg={badgeBg}
                  css={{ backdropFilter: 'blur(10px)' }}
                  fontSize="sm"
                  lineHeight="short"
                  whiteSpace="nowrap"
                >
                  {label}
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Box>

      <Box mt={6}>
        <Heading as="h3" variant="section-title" marginTop="2rem">
          About Me
        </Heading>
        <Paragraph>
          Hello, welcome to my portfolio. Here I show my practice projects. I work as a
          Digital Analytics / Web Measurement Analyst. In these projects I set up tracking
          with GA4 and GTM, check events and conversions (QA), connect GA4 with Google Ads,
          and build simple dashboards in Looker Studio to see traffic sources (UTMs),
          campaigns, and the funnel.
        </Paragraph>
      </Box>

      <Box
        as="nav"
        display="flex"
        gap={4}
        mt={6}
        mb={6}
        pb={2}
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        {navItems.map(item => {
          const isActive = currentPath === item.href
          return (
            <ChakraLink
              key={item.href}
              as={NextLink}
              href={item.href}
              fontWeight="bold"
              color={isActive ? undefined : inactiveColor}
              textDecoration={isActive ? 'underline' : 'none'}
              textUnderlineOffset="4px"
            >
              {item.label}
            </ChakraLink>
          )
        })}
      </Box>
    </>
  )
}

export default ProfileFixedLayout
