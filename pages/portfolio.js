import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Link as ChakraLink,
  UnorderedList,
  Wrap,
  useColorModeValue
} from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'
import { useLanguage } from '../components/language-context'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const projectMedia = {
  'ga4-demo-store': {
    coverImageUrl:
      'https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'utm-funnel-demo': {
    coverImageUrl:
      'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'ga4-ads-validation': {
    coverImageUrl:
      'https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?q=80&w=905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?q=80&w=905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'gtm-implementation': {
    coverImageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
}

const renderContentBlocks = blocks =>
  blocks.map((block, index) => {
    if (block.type === 'divider') {
      return <Divider key={`divider-${index}`} />
    }
    if (block.type === 'heading') {
      return (
        <Heading key={`heading-${index}`} as="h4" size="md">
          {block.text}
        </Heading>
      )
    }
    if (block.type === 'text') {
      return <Text key={`text-${index}`}>{block.text}</Text>
    }
    if (block.type === 'ul') {
      return (
        <UnorderedList key={`ul-${index}`} spacing={1}>
          {block.items.map((item, itemIndex) => (
            <ListItem key={`${index}-${itemIndex}`}>
              {typeof item === 'string' ? (
                item
              ) : (
                <ChakraLink href={item.url} isExternal>
                  {item.text}
                </ChakraLink>
              )}
            </ListItem>
          ))}
        </UnorderedList>
      )
    }
    if (block.type === 'ol') {
      return (
        <OrderedList key={`ol-${index}`} spacing={1}>
          {block.items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </OrderedList>
      )
    }
    return null
  })

const PortfolioPage = () => {
  const router = useRouter()
  const { t } = useLanguage()

  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')
  const surfaceBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const cardShadow = useColorModeValue('md', 'dark-lg')
  const hoverCardShadow = useColorModeValue('lg', '2xl')
  const badgeBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const heroOverlay = useColorModeValue(
    'linear-gradient(to-b, rgba(0,0,0,0.15), rgba(0,0,0,0.55))',
    'linear-gradient(to-b, rgba(0,0,0,0.25), rgba(0,0,0,0.7))'
  )
  const projectOverlay = useColorModeValue(
    'linear-gradient(to-t, rgba(0,0,0,0.75), rgba(0,0,0,0.1))',
    'linear-gradient(to-t, rgba(0,0,0,0.85), rgba(0,0,0,0.15))'
  )
  const projectOverlayHover = useColorModeValue(
    'linear-gradient(to-t, rgba(0,0,0,0.88), rgba(0,0,0,0.2))',
    'linear-gradient(to-t, rgba(0,0,0,0.92), rgba(0,0,0,0.3))'
  )
  const modalOverlayBg = useColorModeValue('blackAlpha.500', 'blackAlpha.700')
  const modalBg = useColorModeValue('sand.100', '#1D2021')

  const projects = t.portfolio.projects.map(project => ({
    ...project,
    ...projectMedia[project.id],
    createdAt: '2026-03-24'
  }))

  const routeProjectId = Array.isArray(router.query.projectId)
    ? router.query.projectId[0]
    : router.query.projectId
  const selectedProject =
    projects.find(project => project.id === routeProjectId) || null
  const isOpen = Boolean(selectedProject)

  const handleOpenProject = projectId => {
    if (router.asPath !== `/portfolio/${projectId}`) {
      router.push(
        { pathname: '/portfolio', query: { projectId } },
        `/portfolio/${projectId}`,
        { scroll: false, shallow: true }
      )
    }
  }

  const handleCloseProject = () => {
    if (router.asPath !== '/portfolio') {
      router.push({ pathname: '/portfolio' }, '/portfolio', {
        scroll: false,
        shallow: true
      })
    }
  }

  return (
    <>
      <Head>
        <title>{t.meta.portfolioTitle}</title>
        <meta name="twitter:title" content={t.meta.portfolioTitle} />
        <meta property="og:title" content={t.meta.portfolioTitle} />
      </Head>
      <Container>
        <Box position="relative" my="4rem">
          <ProfileFixedLayout
            currentPath={router.pathname.startsWith('/portfolio') ? '/portfolio' : router.pathname}
          />

          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.35, type: 'easeInOut' }}
          >
            <Section delay={0.05}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={0}>
                {projects.map(project => (
                  <Box
                    key={project.id}
                    as="button"
                    type="button"
                    role="group"
                    textAlign="left"
                    borderRadius="8px"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow={cardShadow}
                    transition="all 0.2s ease"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: hoverCardShadow
                    }}
                    onClick={() => handleOpenProject(project.id)}
                  >
                    <Box
                      position="relative"
                      minH="220px"
                      bgImage={`url('${project.coverImageUrl}')`}
                      bgPosition="center"
                      bgSize="cover"
                      bgColor={surfaceBg}
                    >
                      <Box
                        position="absolute"
                        inset={0}
                        bgGradient={projectOverlay}
                        transition="all 0.2s ease"
                        _groupHover={{ bgGradient: projectOverlayHover }}
                      />
                      <Box position="absolute" bottom={0} left={0} right={0} zIndex={1} p={4}>
                        <Heading as="h4" size="md" mb={1} noOfLines={2} color="whiteAlpha.900">
                          {project.title}
                        </Heading>
                        <Text fontSize="sm" noOfLines={2} color="whiteAlpha.800">
                          {project.shortDescription}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Section>
          </motion.div>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={handleCloseProject} size="6xl">
        <ModalOverlay bg={modalOverlayBg} backdropFilter="blur(6px)" />
        <ModalContent
          maxW={{ base: '95vw', lg: '1000px' }}
          borderRadius="8px"
          overflow="hidden"
          bg={modalBg}
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow={hoverCardShadow}
          mt="64px"
        >
          <ModalCloseButton zIndex={2} />
          {selectedProject && (
            <>
              <Box
                h={{ base: '240px', md: '360px' }}
                bgImage={`url('${selectedProject.modalImageUrl || selectedProject.coverImageUrl}')`}
                bgPosition="center"
                bgSize="cover"
                position="relative"
              >
                <Box position="absolute" inset={0} bgGradient={heroOverlay} />
              </Box>
              <ModalHeader px={{ base: 5, md: 8 }} pb={2}>
                {selectedProject.title}
              </ModalHeader>
              <ModalBody px={{ base: 5, md: 8 }} pb={8}>
                <Stack spacing={5} maxW="860px" mx="auto" w="full">
                  <HStack spacing={8} flexWrap="wrap">
                    <Box>
                      <Text fontSize="sm" opacity={0.8}>
                        {t.portfolio.createdLabel}
                      </Text>
                      <Text>{selectedProject.createdAt}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" opacity={0.8}>
                        {t.portfolio.tagsLabel}
                      </Text>
                      <Wrap mt={1}>
                        {selectedProject.tags.map(tag => (
                          <Tag key={tag} borderRadius="md" bg={badgeBg}>
                            {tag}
                          </Tag>
                        ))}
                      </Wrap>
                    </Box>
                  </HStack>
                  <Box borderTopWidth="1px" borderColor={borderColor} />
                  <Stack spacing={4}>{renderContentBlocks(selectedProject.contentBlocks)}</Stack>
                </Stack>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PortfolioPage
export { getServerSideProps } from '../components/chakra'
