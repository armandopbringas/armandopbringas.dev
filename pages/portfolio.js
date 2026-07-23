import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  Tooltip,
  Link as ChakraLink,
  UnorderedList,
  Wrap,
  useToast,
  useColorModeValue
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Section from '../components/section'
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
  },
  'marketing-analytics-assignment': {
    coverImageUrl:
      '/projects/p4-gs-looker-dashboard/02-looker-dashboard-overview.png',
    modalImageUrl:
      '/projects/p4-gs-looker-dashboard/02-looker-dashboard-overview.png'
  }
}

const renderContentBlocks = (
  blocks,
  {
    borderColor,
    cardShadow,
    surfaceBg,
    onOpenEvidenceImage,
    placeholderBg
  } = {}
) =>
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
    if (block.type === 'gallery') {
      return (
        <SimpleGrid key={`gallery-${index}`} columns={{ base: 1, md: 2 }} spacing={4}>
          {block.items.map(item => (
            <Box
              key={item.id}
              as="button"
              type="button"
              textAlign="left"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="8px"
              overflow="hidden"
              boxShadow={cardShadow}
              bg={surfaceBg}
              onClick={() => onOpenEvidenceImage?.(item)}
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s ease"
            >
              <Box h="160px" position="relative" bg={placeholderBg}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box p={3}>
                <Text fontWeight="bold" mb={1}>
                  {item.title}
                </Text>
                <Text fontSize="sm" noOfLines={1} opacity={0.85}>
                  {item.caption}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )
    }
    if (block.type === 'table') {
      return (
        <TableContainer
          key={`table-${index}`}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="8px"
        >
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                {block.columns.map(column => (
                  <Th key={column}>{column}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {block.rows.map((row, rowIndex) => (
                <Tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <Td key={`cell-${rowIndex}-${cellIndex}`} whiteSpace="normal">
                      {cellIndex === block.columns.length - 1 &&
                      typeof cell === 'string' &&
                      cell.startsWith('http') ? (
                        <ChakraLink href={cell} isExternal>
                          {cell}
                        </ChakraLink>
                      ) : (
                        cell
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )
    }
    return null
  })

const PortfolioPage = () => {
  const router = useRouter()
  const { t, language } = useLanguage()
  const toast = useToast()

  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')
  const surfaceBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const cardContentBg = useColorModeValue('sand.100', '#1D2021')
  const cardSubtitleColor = useColorModeValue('accent.600', 'accent.500')
  const cardShadow = useColorModeValue('md', 'dark-lg')
  const hoverCardShadow = useColorModeValue('lg', '2xl')
  const badgeBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const tabInactiveBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const tabActiveBg = useColorModeValue('ink.800', 'sand.100')
  const tabActiveColor = useColorModeValue('white', 'ink.800')
  const mutedColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.800')
  const modalOverlayBg = useColorModeValue('blackAlpha.500', 'blackAlpha.700')
  const modalBg = useColorModeValue('sand.100', '#1D2021')
  const evidencePlaceholderBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const heroOverlay = useColorModeValue(
    'linear-gradient(to-b, rgba(0,0,0,0.15), rgba(0,0,0,0.55))',
    'linear-gradient(to-b, rgba(0,0,0,0.25), rgba(0,0,0,0.7))'
  )
  const projectOverlay = useColorModeValue(
    'linear-gradient(to-t, rgba(0,0,0,0.75), rgba(0,0,0,0.1))',
    'linear-gradient(to-t, rgba(0,0,0,0.85), rgba(0,0,0,0.15))'
  )
  const heroPrimaryButtonBg = useColorModeValue('ink.800', 'sand.100')
  const heroPrimaryButtonColor = useColorModeValue('white', 'ink.800')
  const heroSecondaryButtonColor = useColorModeValue('accent.600', 'accent.500')

  const projects = t.portfolio.projects.map(project => ({
    ...project,
    ...projectMedia[project.id],
    createdAt: '2026-03-24'
  }))

  const routeProjectId = Array.isArray(router.query.projectId)
    ? router.query.projectId[0]
    : router.query.projectId
  const [selectedEvidence, setSelectedEvidence] = useState(null)
  const [activeTab, setActiveTab] = useState('services')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    service: [],
    budget: '',
    details: ''
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const tabRefs = useRef([])
  const selectedProject =
    projects.find(project => project.id === routeProjectId) || null
  const isOpen = Boolean(selectedProject)

  const tabItems = [
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.workProcess },
    // { id: 'portfolio', label: t.nav.portfolio },
    { id: 'contact', label: t.nav.contact }
  ]

  const services =
    language === 'es'
      ? [
          {
            title: 'Landing pages de alto rendimiento',
            description:
              'Para producto, campaña o lanzamiento, optimizadas para velocidad de carga y conversión.'
          },
          {
            title: 'Sitios web corporativos',
            description:
              'Para negocios locales, clínicas, despachos e inmobiliarias que necesitan presencia profesional y generación de leads.'
          },
          {
            title: 'Tracking y medición (add-on)',
            description:
              'Configuración de GA4 y GTM, y dashboards en Looker Studio, para que veas resultados reales desde el lanzamiento.'
          },
          {
            title: 'Investigación tech',
            description:
              'Si tu necesidad no encaja del todo con mis servicios actuales, te ayudo a aterrizar el problema, evaluar opciones y orientarte hacia la herramienta, stack o proveedor más adecuado.'
          }
        ]
      : [
          {
            title: 'High-performance landing pages',
            description:
              'For products, campaigns, or launches, optimized for loading speed and conversion.'
          },
          {
            title: 'Corporate websites',
            description:
              'For local businesses, clinics, law firms, and real estate companies that need professional presence and lead generation.'
          },
          {
            title: 'Tracking and measurement (add-on)',
            description:
              'GA4 and GTM setup, plus Looker Studio dashboards, so you can see real results from launch.'
          },
          {
            title: 'Tech research',
            description:
              'If your need does not fully fit my current services, I can help you frame the problem, evaluate options, and point you toward the right tool, stack, or provider.'
          }
        ]

  const servicesFirstHalf = services.slice(0, Math.ceil(services.length / 2))
  const servicesSecondHalf = services.slice(Math.ceil(services.length / 2))

  const processSteps =
    language === 'es'
      ? [
          'Entiendo tu negocio, tus objetivos y a quién le quieres hablar con tu sitio.',
          'Defino estructura, contenido clave y diseño alineado a tu marca.',
          'Desarrollo el sitio con foco en velocidad, buenas prácticas y SEO técnico.',
          'Reviso y pruebo en distintos dispositivos y navegadores antes de lanzar.',
          'Entrego con tracking básico de GA4 configurado, para que veas resultados desde el día uno.'
        ]
      : [
          'I understand your business, your goals, and who your site needs to speak to.',
          'I define structure, key content, and a design aligned with your brand.',
          'I build the site with a focus on speed, best practices, and technical SEO.',
          'I review and test across devices and browsers before launch.',
          'I deliver with basic GA4 tracking configured so you can see results from day one.'
        ]

  const serviceOptions =
    language === 'es'
      ? [
          'Landing page',
          'Sitio web completo',
          'Tracking y analítica',
          'Investigación tech',
          'Otro'
        ]
      : [
          'Landing page',
          'Full website',
          'Tracking and analytics',
          'Tech research',
          'Other'
        ]

  const budgetOptions =
    language === 'es'
      ? ['Menos de USD 500', 'USD 500 - 1,000', 'USD 1,000 - 2,500', 'Más de USD 2,500']
      : ['Under USD 500', 'USD 500 - 1,000', 'USD 1,000 - 2,500', 'More than USD 2,500']


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
    setSelectedEvidence(null)
    if (router.asPath !== '/portfolio') {
      router.push({ pathname: '/portfolio' }, '/portfolio', {
        scroll: false,
        shallow: true
      })
    }
  }

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabItems.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabItems.length) % tabItems.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabItems.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    setActiveTab(tabItems[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  const handleContactFieldChange = event => {
    const { name, value } = event.target

    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceToggle = value => {
    setContactForm(prev => ({
      ...prev,
      service: prev.service.includes(value)
        ? prev.service.filter(item => item !== value)
        : [...prev.service, value]
    }))
  }

  const handleContactSubmit = async event => {
    event.preventDefault()
    setIsSubmittingContact(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...contactForm,
          service: contactForm.service,
          language
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Request failed')
      }

      setContactForm({
        name: '',
        email: '',
        company: '',
        service: [],
        budget: '',
        details: ''
      })

      toast({
        title: language === 'es' ? 'Consulta enviada' : 'Inquiry sent',
        description:
          language === 'es'
            ? 'Tu mensaje fue enviado correctamente a Armando.'
            : 'Your message was sent successfully to Armando.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: language === 'es' ? 'No se pudo enviar' : 'Could not send',
        description:
          error instanceof Error
            ? error.message
            : language === 'es'
              ? 'Ocurrió un error inesperado.'
              : 'An unexpected error occurred.',
        status: 'error',
        duration: 6000,
        isClosable: true
      })
    } finally {
      setIsSubmittingContact(false)
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
          <Box
            position="relative"
            width="100dvw"
            maxW="100dvw"
            ml="calc(50% - 50dvw)"
            minH={{ base: '360px', md: '440px' }}
            mt="3.75rem"
            mb={{ base: 10, md: 12 }}
            borderRadius="0"
            overflow="hidden"
            bgImage="url('https://images.unsplash.com/photo-1677100091644-53575a136cfb?q=80&w=1771&auto=format&fit=crop')"
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
          >
            <Box
              position="relative"
              zIndex={1}
              h="100%"
              px={{ base: 6, md: 8, lg: 12 }}
              py={{ base: 12, md: 14 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Stack spacing={{ base: 4, md: 5 }} maxW="760px" color="white">
                <Text
                  fontSize={{ base: '10px', md: 'xs' }}
                  letterSpacing="0.35em"
                  textTransform="uppercase"
                  opacity={0.82}
                >
                  {t.portfolio.hero.eyebrow}
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}
                  lineHeight={{ base: 1.2, md: 1.1 }}
                  fontWeight="normal"
                  opacity={0.8}
                >
                  {t.portfolio.hero.title}
                </Heading>
                {t.portfolio.hero.description ? (
                  <Text
                    fontSize={{ base: 'md', md: 'xl' }}
                    lineHeight={{ base: 1.7, md: 1.6 }}
                    maxW="680px"
                    mx="auto"
                    color="whiteAlpha.860"
                  >
                    {t.portfolio.hero.description}
                  </Text>
                ) : null}
                <HStack spacing={{ base: 4, md: 6 }} justify="center" flexWrap="wrap">
                  <Tooltip
                    label={t.portfolio.hero.footnote}
                    hasArrow
                    placement="top"
                    bg="ink.800"
                    color="white"
                    borderRadius="md"
                    px={3}
                    py={2}
                    maxW="280px"
                    textAlign="center"
                  >
                    <Button
                      as="a"
                      href="#projects"
                      size="lg"
                      px={8}
                      bg={heroPrimaryButtonBg}
                      color={heroPrimaryButtonColor}
                      _hover={{ bg: heroPrimaryButtonBg, transform: 'translateY(-1px)' }}
                    >
                      {t.portfolio.hero.primaryCta}
                    </Button>
                  </Tooltip>
                  <Button
                    as="a"
                    href="mailto:bringas.armandop@gmail.com"
                    size="lg"
                    variant="ghost"
                    color={heroSecondaryButtonColor}
                    _hover={{ bg: 'whiteAlpha.200' }}
                  >
                    {t.portfolio.hero.secondaryCta}
                  </Button>
                </HStack>
                <Wrap justify="center" spacing={3}>
                  {t.profile.badges.map(label => (
                    <Tag
                      key={label}
                      borderRadius="full"
                      px={4}
                      py={2}
                      bg="whiteAlpha.200"
                      color="white"
                      fontWeight="medium"
                      backdropFilter="blur(10px)"
                    >
                      {label}
                    </Tag>
                  ))}
                </Wrap>
                <HStack spacing={4} justify="center" flexWrap="wrap" color="whiteAlpha.900">
                  <ChakraLink
                    href="mailto:bringas.armandop@gmail.com"
                    aria-label="Email Armando Bringas"
                  >
                    <Icon as={MdEmail} boxSize={6} />
                  </ChakraLink>
                  <ChakraLink
                    href="https://wa.me/2727232016?text=Hola,%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto%20web."
                    isExternal
                    aria-label="WhatsApp Armando Bringas"
                  >
                    <Icon as={FaWhatsapp} boxSize={6} />
                  </ChakraLink>
                  <ChakraLink
                    href="https://github.com/armandopbringas"
                    isExternal
                    aria-label="GitHub de Armando Bringas"
                  >
                    <Icon as={FaGithub} boxSize={6} />
                  </ChakraLink>
                  <ChakraLink
                    href="https://www.linkedin.com/in/armandopbringas/"
                    isExternal
                    aria-label="LinkedIn de Armando Bringas"
                  >
                    <Icon as={FaLinkedin} boxSize={6} />
                  </ChakraLink>
                </HStack>
              </Stack>
            </Box>
          </Box>

          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.35, type: 'easeInOut' }}
          >
            <Section delay={0.05}>
              <Stack spacing={12} maxW="760px" mx="auto" align="stretch">
                <Box id="about" p={{ base: 5, md: 6 }} scrollMarginTop="96px">
                  <Stack spacing={3}>
                    <Heading as="h2" size="md">
                      {t.profile.aboutTitle}
                    </Heading>
                    <Text color={mutedColor} lineHeight="tall">
                      {t.profile.aboutText}
                    </Text>
                  </Stack>
                </Box>

                <Box id="projects" minW={0} scrollMarginTop="96px">
                  <Box
                    role="tablist"
                    aria-label="Portfolio sections"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={{ base: 6, md: 8 }}
                    mb={6}
                    pb={3}
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                  >
                    {tabItems.map((tab, index) => {
                      const isActive = activeTab === tab.id

                      return (
                        <Button
                          key={tab.id}
                          ref={node => {
                            tabRefs.current[index] = node
                          }}
                          role="tab"
                          id={`tab-${tab.id}`}
                          aria-selected={isActive}
                          aria-controls={`panel-${tab.id}`}
                          tabIndex={isActive ? 0 : -1}
                          variant="ghost"
                          bg="transparent"
                          color={isActive ? 'accent.600' : mutedColor}
                          borderRadius="0"
                          borderBottomWidth="2px"
                          borderColor={isActive ? 'accent.600' : 'transparent'}
                          px={0}
                          minW="auto"
                          h="auto"
                          pb={2}
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight={isActive ? 'semibold' : 'medium'}
                          _hover={{ bg: 'transparent', color: isActive ? 'accent.600' : 'ink.700' }}
                          _active={{ bg: 'transparent' }}
                          onClick={() => setActiveTab(tab.id)}
                          onKeyDown={event => handleTabKeyDown(event, index)}
                        >
                          {tab.label}
                        </Button>
                      )
                    })}
                  </Box>

                  <Box role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} p={{ base: 5, md: 6 }}>
                    {activeTab === 'portfolio' && (
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {projects.map(project => (
                          <Box
                            key={project.id}
                            borderRadius="2xl"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor={borderColor}
                            bg={cardContentBg}
                            boxShadow={cardShadow}
                          >
                            <Box position="relative" minH="220px" bg={surfaceBg}>
                              <Image
                                src={project.coverImageUrl}
                                alt={`${project.title} thumbnail`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                              />
                              <Box position="absolute" inset={0} bgGradient={projectOverlay} />
                            </Box>
                            <Stack spacing={3} p={5}>
                              <Heading as="h4" size="md" noOfLines={2}>
                                {project.title}
                              </Heading>
                              <Text fontSize="sm" noOfLines={2} color={cardSubtitleColor}>
                                {project.shortDescription}
                              </Text>
                              <Text fontSize="sm" color={mutedColor}>
                                {project.tags.slice(0, 3).join(' · ')}
                              </Text>
                              <Button
                                alignSelf="flex-start"
                                variant="ghost"
                                px={0}
                                onClick={() => handleOpenProject(project.id)}
                              >
                                {language === 'es' ? 'Ver proyecto' : 'View project'}
                              </Button>
                            </Stack>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}

                    {activeTab === 'services' && (
                      <Stack spacing={6}>
                        <Heading as="h2" size="lg">
                          {t.nav.services}
                        </Heading>
                        <Text color={mutedColor} lineHeight="tall">
                          {language === 'es'
                            ? 'Desarrollo web enfocado en negocios que necesitan un sitio rápido, bien construido y que realmente ayude a conseguir clientes.'
                            : 'Web development focused on businesses that need a fast, well-built site that genuinely helps them win clients.'}
                        </Text>
                        <UnorderedList spacing={5} listStyleType="none" m={0} ml={0}>
                          {servicesFirstHalf.map(service => (
                            <ListItem key={service.title}>
                              <Stack spacing={1}>
                                <Heading as="h3" size="sm">
                                  {service.title}
                                </Heading>
                                <Text color={mutedColor} fontSize="sm" lineHeight="tall">
                                  {service.description}
                                </Text>
                              </Stack>
                            </ListItem>
                          ))}
                        </UnorderedList>
                        <Box
                          position="relative"
                          w="100%"
                          minH={{ base: '240px', md: '320px' }}
                          overflow="hidden"
                          borderRadius="2xl"
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Digital analytics style dashboard and workspace representing premium web service delivery"
                            fill
                            sizes="(max-width: 768px) 100vw, 760px"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                        <UnorderedList spacing={5} listStyleType="none" m={0} ml={0}>
                          {servicesSecondHalf.map(service => (
                            <ListItem key={service.title}>
                              <Stack spacing={1}>
                                <Heading as="h3" size="sm">
                                  {service.title}
                                </Heading>
                                <Text color={mutedColor} fontSize="sm" lineHeight="tall">
                                  {service.description}
                                </Text>
                              </Stack>
                            </ListItem>
                          ))}
                        </UnorderedList>
                      </Stack>
                    )}

                    {activeTab === 'process' && (
                      <Stack spacing={4}>
                        <Heading as="h2" size="lg">
                          {t.nav.workProcess}
                        </Heading>
                        <Text color={mutedColor} lineHeight="tall">
                          {language === 'es'
                            ? 'Un proceso claro para pasar de una idea o un sitio desactualizado a un producto terminado, rápido y bien construido.'
                            : 'A clear process to move from an idea or outdated site to a finished product that is fast and well built.'}
                        </Text>
                        <OrderedList spacing={4} pl={5}>
                          {processSteps.map(step => (
                            <ListItem key={step} color={mutedColor} lineHeight="tall">
                              {step}
                            </ListItem>
                          ))}
                        </OrderedList>
                        <Box
                          position="relative"
                          w="100%"
                          minH={{ base: '220px', md: '320px' }}
                          overflow="hidden"
                          borderRadius="2xl"
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1558367853-fd760bbe56b6?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Workspace and notebook representing a structured web project workflow"
                            fill
                            sizes="(max-width: 768px) 100vw, 760px"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      </Stack>
                    )}

                    {activeTab === 'contact' && (
                      <Stack spacing={6}>
                        <Box>
                          <Text
                            fontSize="sm"
                            textTransform="uppercase"
                            letterSpacing="0.12em"
                            mb={2}
                            color={mutedColor}
                          >
                            {t.nav.contact}
                          </Text>
                          <Heading as="h2" size="lg" mb={3}>
                            {language === 'es'
                              ? 'Cuéntame sobre tu proyecto'
                              : 'Tell me about your project'}
                          </Heading>
                          <Text color={mutedColor} lineHeight="tall">
                            {language === 'es'
                              ? 'Comparte qué necesitas, en qué etapa está tu negocio o proyecto, y qué resultado esperas del sitio. Con eso puedo decirte si conviene una landing, un sitio completo, o un rediseño.'
                              : 'Share what you need, what stage your business or project is in, and what result you expect from the site. With that, I can tell you whether a landing page, a full website, or a redesign makes the most sense.'}
                          </Text>
                        </Box>

                        <HStack spacing={6} flexWrap="wrap" align="center">
                          <ChakraLink href="mailto:bringas.armandop@gmail.com" fontWeight="semibold">
                            {language === 'es' ? 'Escríbeme por correo' : 'Email me'} →
                          </ChakraLink>
                          {/* TODO: actualizar link de Calendly */}
                          <ChakraLink href="https://calendly.com" isExternal color={mutedColor}>
                            {language === 'es'
                              ? 'O agenda una llamada breve'
                              : 'Or schedule a short call'} →
                          </ChakraLink>
                        </HStack>

                        <Box as="form" onSubmit={handleContactSubmit}>
                          <Stack spacing={5}>
                            <FormControl isRequired>
                              <FormLabel>{language === 'es' ? 'Nombre' : 'Name'}</FormLabel>
                              <Input
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactFieldChange}
                              />
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>
                                {language === 'es' ? 'Correo de trabajo' : 'Work email'}
                              </FormLabel>
                              <Input
                                type="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactFieldChange}
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel>{language === 'es' ? 'Empresa' : 'Company'}</FormLabel>
                              <Input
                                name="company"
                                value={contactForm.company}
                                onChange={handleContactFieldChange}
                              />
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>
                                {language === 'es'
                                  ? 'Servicios que necesitas'
                                  : 'Services needed'}
                              </FormLabel>
                              <Stack spacing={3} pt={1}>
                                {serviceOptions.map(option => (
                                  <Checkbox
                                    key={option}
                                    isChecked={contactForm.service.includes(option)}
                                    onChange={() => handleServiceToggle(option)}
                                  >
                                    {option}
                                  </Checkbox>
                                ))}
                              </Stack>
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>
                                {language === 'es' ? 'Rango de inversión' : 'Budget range'}
                              </FormLabel>
                              <Select
                                name="budget"
                                placeholder={
                                  language === 'es'
                                    ? 'Selecciona un rango'
                                    : 'Select a range'
                                }
                                value={contactForm.budget}
                                onChange={handleContactFieldChange}
                              >
                                {budgetOptions.map(option => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>
                                {language === 'es'
                                  ? 'Detalles del proyecto'
                                  : 'Project details'}
                              </FormLabel>
                              <Textarea
                                name="details"
                                minH="160px"
                                value={contactForm.details}
                                onChange={handleContactFieldChange}
                              />
                            </FormControl>

                            <Box>
                              <Button
                                type="submit"
                                bg={heroPrimaryButtonBg}
                                color={heroPrimaryButtonColor}
                                isLoading={isSubmittingContact}
                                loadingText={language === 'es' ? 'Enviando...' : 'Sending...'}
                              >
                                {language === 'es' ? 'Enviar consulta' : 'Send inquiry'}
                              </Button>
                              <Text mt={3} fontSize="sm" color={mutedColor}>
                                {language === 'es'
                                  ? 'El formulario envía tu consulta directamente por correo.'
                                  : 'The form sends your inquiry directly by email.'}
                              </Text>
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                    )}
                  </Box>
                </Box>

              </Stack>
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
              <Box h={{ base: '240px', md: '360px' }} position="relative">
                <Image
                  src={selectedProject.modalImageUrl || selectedProject.coverImageUrl}
                  alt={selectedProject.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
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
                  <Stack spacing={4}>
                    {renderContentBlocks(selectedProject.contentBlocks, {
                      borderColor,
                      cardShadow,
                      surfaceBg,
                      placeholderBg: evidencePlaceholderBg,
                      onOpenEvidenceImage: setSelectedEvidence
                    })}
                  </Stack>
                </Stack>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={Boolean(selectedEvidence)} onClose={() => setSelectedEvidence(null)} size="4xl">
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
          {selectedEvidence && (
            <>
              <ModalHeader pr={12}>{selectedEvidence.title}</ModalHeader>
              <ModalBody p={0}>
                <Stack spacing={0}>
                  <Box
                    w="100%"
                    h={{ base: '320px', md: '620px' }}
                    position="relative"
                    bg={evidencePlaceholderBg}
                  >
                    <Image
                      src={selectedEvidence.imageUrl}
                      alt={selectedEvidence.title}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit:
                          selectedEvidence.id === '01-utm-links' ? 'contain' : 'cover',
                        objectPosition:
                          selectedEvidence.id === '01-utm-links' ? 'center' : 'top center'
                      }}
                    />
                  </Box>
                  <Text fontSize="sm" opacity={0.9} p={4}>
                    {selectedEvidence.caption}
                  </Text>
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
