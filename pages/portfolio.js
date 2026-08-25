import {
  AspectRatio,
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
  IconButton,
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
import Image from 'next/image'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Section from '../components/section'
import { useLanguage } from '../components/language-context'
import { getFeaturedProjects } from '../content/featured-projects'
import SeoHead, { getHomeSchema } from '../components/seo-head'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const calendlyUrl = 'https://calendly.com/armandopbringas/new-meeting'

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
  const cardShadow = useColorModeValue('md', 'dark-lg')
  const hoverCardShadow = useColorModeValue('lg', '2xl')
  const mutedColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.800')
  const accentColor = useColorModeValue('accent.500', 'accentDark.500')
  const accentHoverColor = useColorModeValue('accent.400', 'accentDark.400')
  const tabHoverColor = useColorModeValue('accent.500', 'accentDark.400')
  const modalOverlayBg = useColorModeValue('blackAlpha.500', 'blackAlpha.700')
  const evidencePlaceholderBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const heroPrimaryButtonBg = 'blackAlpha.300'
  const heroPrimaryButtonColor = 'white'

  const projects = getFeaturedProjects(language)

  const routeProjectId = Array.isArray(router.query.projectId)
    ? router.query.projectId[0]
    : router.query.projectId
  const [selectedEvidence, setSelectedEvidence] = useState(null)
  const [activeProjectSlide, setActiveProjectSlide] = useState(0)
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
  const contactSectionRef = useRef([])
  const selectedProject =
    projects.find(project => project.id === routeProjectId) || null
  const projectGallery = selectedProject
    ? selectedProject.contentBlocks.find(block => block.type === 'gallery')?.items || []
    : []
  const currentProjectSlide = projectGallery[activeProjectSlide]
  const isOpen = Boolean(selectedProject)
  const seoTitle = selectedProject
    ? `${selectedProject.title} | ${language === 'es' ? 'Caso de estudio' : 'Case study'} | Armando Bringas`
    : t.meta.portfolioTitle
  const seoDescription = selectedProject
    ? selectedProject.shortDescription
    : t.meta.portfolioDescription

  const tabItems = [
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.workProcess },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'contact', label: t.nav.contact }
  ]

  const services =
    language === 'es'
      ? [
          {
            title: 'Landing pages de alto rendimiento',
            description:
              'Para producto, campaña o lanzamiento — optimizadas para velocidad de carga y conversión.'
          },
          {
            title: 'Sitios web a la medida',
            description:
              'Corporativos, tiendas en línea, o plataformas con un propósito específico — construidos según lo que tu negocio necesita: generar leads, vender en línea, o dar presencia profesional.'
          },
          {
            title: 'Aplicaciones web con automatización',
            description:
              'Sistemas simples para llevar el control de tu negocio — citas, clientes, inventario, proyectos y cotizaciones — para que dejes de hacerlo a mano y ahorres tiempo todos los días.'
          },
          {
            title: 'Tracking y medición (add-on)',
            description:
              'Configuración de GA4, GTM y dashboards en Looker Studio, para que veas de dónde vienen tus clientes y qué está funcionando, con datos reales desde el lanzamiento.'
          },
          {
            title: 'Investigación y estrategia técnica',
            description:
              '¿No estás seguro qué necesitas? Te ayudo a definir el problema, evaluar opciones, y elegir la herramienta o stack más adecuado para tu negocio — antes de invertir en desarrollo.'
          }
        ]
      : [
          {
            title: 'High-performance landing pages',
            description:
              'For a product, campaign, or launch — optimized for loading speed and conversion.'
          },
          {
            title: 'Custom websites',
            description:
              'Corporate sites, online stores, or platforms with a specific purpose — built around what your business needs: generate leads, sell online, or establish a professional presence.'
          },
          {
            title: 'Web applications with automation',
            description:
              'Simple systems to keep your business organized — appointments, customers, inventory, projects, and quotes — so you can stop doing it manually and save time every day.'
          },
          {
            title: 'Tracking and measurement (add-on)',
            description:
              'GA4, GTM, and Looker Studio dashboard setup, so you can see where your customers come from and what is working, with real data from launch.'
          },
          {
            title: 'Technical research and strategy',
            description:
              'Not sure what you need? I help you define the problem, evaluate options, and choose the right tool or stack for your business — before you invest in development.'
          }
        ]

  const processSteps =
    language === 'es'
      ? [
          'Entiendo tu negocio, tus objetivos y a quién le quieres hablar con tu sitio.',
          'Defino qué necesita tu proyecto: contenido y diseño si es un sitio, o cómo debe funcionar si es un sistema que automatiza algo.',
          'Desarrollo tu sitio o sistema con foco en velocidad, buenas prácticas y que todo funcione como debe.',
          'Reviso y pruebo en distintos dispositivos y navegadores antes de lanzar.',
          'Entrego con seguimiento configurado, para que veas resultados desde el día uno.'
        ]
      : [
          'I understand your business, your goals, and who your site needs to speak to.',
          'I define what your project needs: content and design for a website, or how it should work if it is a system that automates something.',
          'I build your site or system with a focus on speed, best practices, and making sure everything works as it should.',
          'I review and test across devices and browsers before launch.',
          'I deliver with tracking configured so you can see results from day one.'
        ]

  const serviceOptions =
    language === 'es'
      ? [
          'Landing page',
          'Sitio web completo',
          'Aplicación web con automatización',
          'Tracking y analítica',
          'Investigación y estrategia técnica',
          'Otro'
        ]
      : [
          'Landing page',
          'Full website',
          'Web application with automation',
          'Tracking and analytics',
          'Technical research and strategy',
          'Other'
        ]

  const budgetOptions =
    language === 'es'
      ? ['Menos de USD 500', 'USD 500 - 1,000', 'USD 1,000 - 2,500', 'Más de USD 2,500']
      : ['Under USD 500', 'USD 500 - 1,000', 'USD 1,000 - 2,500', 'More than USD 2,500']


  const handleOpenProject = projectId => {
    setActiveProjectSlide(0)
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

  const handleOpenContactSection = () => {
    setActiveTab('contact')

    if (typeof window === 'undefined') {
      return
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        contactSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    })
  }

  const handleOpenCalendly = () => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl })
      return
    }

    window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
  }

  const handleContactSubmit = async event => {
    event.preventDefault()

    if (contactForm.service.length === 0) {
      toast({
        title: language === 'es' ? 'Selecciona al menos un servicio' : 'Select at least one service',
        description:
          language === 'es'
            ? 'Puedes elegir uno, varios o todos los servicios según lo que necesites.'
            : 'You can choose one, several, or all services depending on what you need.',
        status: 'warning',
        duration: 5000,
        isClosable: true
      })
      return
    }

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
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        schema={selectedProject ? undefined : getHomeSchema(language)}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <Container maxW="none" px={0}>
        <Box position="relative" mt="38px" mb="4rem">
          <Box
            position="relative"
            width="100dvw"
            maxW="100dvw"
            ml="calc(50% - 50dvw)"
            minH={{ base: '360px', md: '440px' }}
            display="flex"
            alignItems="center"
            mt={0}
            mb={{ base: 10, md: 12 }}
            borderRadius="0"
            overflow="hidden"
            bgImage="url('https://images.unsplash.com/photo-1677100091644-53575a136cfb?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
          >
            <Box
              position="relative"
              zIndex={1}
              w="100%"
              px={{ base: 6, md: 8, lg: 12 }}
              py={{ base: 12, md: 14 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Stack spacing={{ base: 4, md: 5 }} maxW="760px" color="white">
                <Heading
                  as="h1"
                  fontFamily="body"
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
                      size="lg"
                      px={8}
                      bg={heroPrimaryButtonBg}
                      color={heroPrimaryButtonColor}
                      backdropFilter="blur(6px)"
                      borderColor="whiteAlpha.300"
                      _hover={{ bg: 'blackAlpha.400', transform: 'translateY(-1px)' }}
                      onClick={handleOpenCalendly}
                    >
                      {t.portfolio.hero.primaryCta}
                    </Button>
                  </Tooltip>
                  <Button
                    size="lg"
                    variant="ghost"
                    color="white"
                    textShadow="0 1px 2px rgba(0, 0, 0, 0.35)"
                    _hover={{
                      bg: 'blackAlpha.300',
                      backdropFilter: 'blur(6px)',
                      borderColor: 'whiteAlpha.300'
                    }}
                    onClick={handleOpenContactSection}
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
                <HStack spacing={4} justify="center" flexWrap="wrap" color={accentColor}>
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
              <Stack spacing={12} w="100%" align="stretch">
                <Box id="about" scrollMarginTop="96px">
                  <Stack spacing={3} maxW="58ch" mx="auto">
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
                    aria-label={language === 'es' ? 'Secciones del portafolio' : 'Portfolio sections'}
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
                          color={isActive ? accentColor : mutedColor}
                          borderRadius="0"
                          borderBottomWidth="2px"
                          borderColor={isActive ? accentColor : 'transparent'}
                          px={0}
                          minW="auto"
                          h="auto"
                          pb={2}
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight={isActive ? 'semibold' : 'medium'}
                          _hover={{ bg: 'transparent', color: isActive ? accentColor : tabHoverColor }}
                          _active={{ bg: 'transparent' }}
                          onClick={() => setActiveTab(tab.id)}
                          onKeyDown={event => handleTabKeyDown(event, index)}
                        >
                          {tab.label}
                        </Button>
                      )
                    })}
                  </Box>

                  <Box
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                    py={{ base: 5, md: 6 }}
                  >
                    {activeTab === 'portfolio' && (
                      <Stack spacing={5}>
                        <Text color={mutedColor} lineHeight="tall">
                          {language === 'es'
                            ? 'Negocios que han confiado en mi trabajo. Cada caso muestra el problema que había que resolver, la solución construida y lo que quedó listo para operar.'
                            : 'Businesses that have trusted me with their work. Each case shows the problem to solve, the solution that was built, and what was ready to use.'}
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                          {projects.map(project => (
                            <Box
                            key={project.id}
                            as="button"
                            type="button"
                            aria-label={`${language === 'es' ? 'Ver proyecto' : 'View project'}: ${project.title}`}
                            textAlign="left"
                            borderRadius="lg"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor={borderColor}
                            transition="transform 0.2s ease, border-color 0.2s ease"
                            _hover={{
                              transform: 'translateY(-4px)',
                              borderColor: accentColor
                            }}
                            _focusVisible={{
                              outline: '3px solid',
                              outlineColor: accentColor,
                              outlineOffset: '3px'
                            }}
                            onClick={() => handleOpenProject(project.id)}
                          >
                            <Box position="relative" h="170px" bg={surfaceBg}>
                              <Image
                                src={project.coverImageUrl}
                                alt={`${project.title} thumbnail`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                              />
                            </Box>
                            <Stack spacing={3} p={4}>
                              <Heading as="h3" size="sm" noOfLines={2}>
                                {project.title}
                              </Heading>
                              <Text fontSize="sm" noOfLines={2} color={mutedColor}>
                                {project.shortDescription}
                              </Text>
                              <Text fontSize="sm" fontWeight="semibold" color={accentColor}>
                                {language === 'es' ? 'Ver caso de estudio' : 'View case study'}
                              </Text>
                            </Stack>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </Stack>
                    )}

                    {activeTab === 'services' && (
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }} alignItems="stretch">
                        <Stack spacing={6}>
                          <Heading as="h2" size="lg">
                            {t.nav.services}
                          </Heading>
                          <Text color={mutedColor} lineHeight="tall">
                            {language === 'es'
                              ? 'Desarrollo web enfocado en negocios que necesitan un sitio o sistema rápido, bien construido y que realmente ayude a conseguir clientes u optimizar procesos.'
                              : 'Web development for businesses that need a fast, well-built website or system that helps attract clients or streamline processes.'}
                          </Text>
                          <Box borderLeftWidth="2px" borderColor={accentColor} pl={4}>
                            <Heading as="h3" size="sm" mb={2}>
                              {language === 'es' ? 'Qué puedes esperar' : 'What you can expect'}
                            </Heading>
                            <UnorderedList spacing={2} color={mutedColor} fontSize="sm" lineHeight="tall" m={0} pl={5}>
                              {language === 'es' ? (
                                <>
                                  <ListItem>Una recomendación clara sobre qué conviene construir antes de empezar.</ListItem>
                                  <ListItem>Un sitio o sistema probado en distintos dispositivos antes de lanzar.</ListItem>
                                </>
                              ) : (
                                <>
                                  <ListItem>A clear recommendation on what makes sense to build before work starts.</ListItem>
                                  <ListItem>A website or system tested across devices before launch.</ListItem>
                                </>
                              )}
                            </UnorderedList>
                          </Box>
                          <UnorderedList spacing={5} listStyleType="none" m={0} ml={0}>
                            {services.slice(0, 2).map(service => (
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
                        <Box
                          position="relative"
                          w="100%"
                          h={{ base: '200px', lg: 'clamp(360px, 26vw, 440px)' }}
                          alignSelf={{ lg: 'start' }}
                          overflow="hidden"
                          borderRadius="2xl"
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1558367853-fd760bbe56b6?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Workspace and notebook representing thoughtful web service delivery"
                            fill
                            sizes="(max-width: 992px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                        <Box
                          position="relative"
                          w="100%"
                          h={{ base: '180px', lg: 'clamp(280px, 20vw, 340px)' }}
                          alignSelf={{ lg: 'start' }}
                          overflow="hidden"
                          borderRadius="2xl"
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Digital dashboard and workspace representing web application automation"
                            fill
                            sizes="(max-width: 992px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                        <UnorderedList spacing={5} listStyleType="none" m={0} ml={0}>
                          {services.slice(2).map(service => (
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
                      </SimpleGrid>
                    )}

                    {activeTab === 'process' && (
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 12 }} alignItems="stretch">
                        <Stack spacing={4}>
                          <Heading as="h2" size="lg">
                            {t.nav.workProcess}
                          </Heading>
                          <Text color={mutedColor} lineHeight="tall">
                            {language === 'es'
                              ? 'Un proceso claro para pasar de una idea, un sitio desactualizado, o algo que hoy haces a mano, a un producto terminado, rápido y bien construido.'
                              : 'A clear process for turning an idea, an outdated site, or something you currently do manually into a finished product that is fast and well built.'}
                          </Text>
                          <OrderedList spacing={4} pl={5}>
                            {processSteps.map(step => (
                              <ListItem key={step} color={mutedColor} lineHeight="tall">
                                {step}
                              </ListItem>
                            ))}
                          </OrderedList>
                        </Stack>
                        <Box
                          position="relative"
                          w="100%"
                          h={{ base: '200px', lg: 'clamp(320px, 23vw, 380px)' }}
                          alignSelf={{ lg: 'center' }}
                          overflow="hidden"
                          borderRadius="2xl"
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1516031190212-da133013de50?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
                            alt="Computer screen with software representing a structured web project workflow"
                            fill
                            sizes="(max-width: 992px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      </SimpleGrid>
                    )}

                    {activeTab === 'contact' && (
                      <Stack
                        ref={contactSectionRef}
                        spacing={6}
                        id="contact"
                        scrollMarginTop="96px"
                      >
                        <Box w="100%" maxW="640px" mx="auto">
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

                        <HStack spacing={6} flexWrap="wrap" align="center" w="100%" maxW="640px" mx="auto">
                          <ChakraLink href="mailto:bringas.armandop@gmail.com" fontWeight="semibold">
                            {language === 'es' ? 'Escríbeme por correo' : 'Email me'} →
                          </ChakraLink>
                          <ChakraLink
                            as="button"
                            type="button"
                            onClick={handleOpenCalendly}
                            color={mutedColor}
                          >
                            {language === 'es'
                              ? 'O agenda una llamada breve'
                              : 'Or schedule a short call'} →
                          </ChakraLink>
                        </HStack>

                        <Box as="form" onSubmit={handleContactSubmit} w="100%" maxW="640px" mx="auto">
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

                            <FormControl>
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

      <Modal isOpen={isOpen} onClose={handleCloseProject} size="4xl" scrollBehavior="inside" isCentered>
        <ModalOverlay bg={modalOverlayBg} backdropFilter="blur(6px)" />
        <ModalContent
          maxH={{ base: 'calc(100dvh - 1rem)', md: 'calc(100dvh - 4rem)' }}
          borderRadius={{ base: 'xl', md: '2xl' }}
          bg="sand.100"
          color="ink.800"
          _dark={{ bg: 'ink.900', color: 'paper.100' }}
        >
          <ModalCloseButton zIndex={2} />
          {selectedProject && (
            <ModalBody px={{ base: 5, md: 10 }} py={{ base: 8, md: 10 }}>
              <Stack spacing={{ base: 7, md: 9 }}>
                <Box pr={10}>
                  <Text color={mutedColor} fontSize="sm" mb={3}>{t.nav.portfolio}</Text>
                  <Heading as="h2" size={{ base: 'lg', md: 'xl' }} lineHeight="short">
                    {selectedProject.title}
                  </Heading>
                  <Text mt={4} color={mutedColor} lineHeight="tall" maxW="70ch">
                    {selectedProject.shortDescription}
                  </Text>
                </Box>
                <Box
                  as="dl"
                  pt={6}
                  borderTopWidth="1px"
                  borderColor={borderColor}
                >
                  <Text as="dt" fontWeight="semibold" mb={2}>{t.portfolio.createdLabel}</Text>
                  <Text as="dd" m={0}>{selectedProject.createdAt}</Text>
                </Box>
                {currentProjectSlide ? (
                  <Box role="region" aria-roledescription="carousel" aria-label={language === 'es' ? 'Galería del proyecto' : 'Project gallery'}>
                    <Box position="relative" h={{ base: '280px', md: '460px' }} bg="black" borderRadius="xl" overflow="hidden">
                      <Image src={currentProjectSlide.imageUrl} alt={currentProjectSlide.title} fill sizes="(max-width: 768px) 100vw, 896px" style={{ objectFit: 'contain' }} />
                      <IconButton
                        aria-label={language === 'es' ? 'Imagen anterior' : 'Previous image'}
                        icon={<Icon as={FaChevronLeft} />}
                        position="absolute" left={{ base: 2, md: 4 }} top="50%" transform="translateY(-50%)"
                        borderRadius="full" bg="blackAlpha.700" color="white" _hover={{ bg: 'blackAlpha.800' }}
                        onClick={() => setActiveProjectSlide(activeProjectSlide === 0 ? projectGallery.length - 1 : activeProjectSlide - 1)}
                      />
                      <IconButton
                        aria-label={language === 'es' ? 'Siguiente imagen' : 'Next image'}
                        icon={<Icon as={FaChevronRight} />}
                        position="absolute" right={{ base: 2, md: 4 }} top="50%" transform="translateY(-50%)"
                        borderRadius="full" bg="blackAlpha.700" color="white" _hover={{ bg: 'blackAlpha.800' }}
                        onClick={() => setActiveProjectSlide(activeProjectSlide === projectGallery.length - 1 ? 0 : activeProjectSlide + 1)}
                      />
                    </Box>
                    <HStack justify="center" spacing={2} mt={3}>
                      {projectGallery.map((slide, index) => (
                        <IconButton
                          key={slide.id}
                          aria-label={`${language === 'es' ? 'Ver imagen' : 'View image'} ${index + 1}`}
                          aria-current={index === activeProjectSlide ? 'true' : undefined}
                          size="xs" minW={index === activeProjectSlide ? 6 : 2} h={2}
                          borderRadius="full" bg={index === activeProjectSlide ? accentColor : borderColor}
                          _hover={{ bg: accentHoverColor }} onClick={() => setActiveProjectSlide(index)}
                        />
                      ))}
                    </HStack>
                  </Box>
                ) : (
                  <AspectRatio ratio={{ base: 4 / 3, md: 16 / 8 }} borderRadius="xl" overflow="hidden">
                    <Image src={selectedProject.modalImageUrl || selectedProject.coverImageUrl} alt={selectedProject.title} fill sizes="(max-width: 768px) 100vw, 896px" style={{ objectFit: 'cover' }} />
                  </AspectRatio>
                )}

                <Divider borderColor={borderColor} />
                <Stack spacing={4} maxW="70ch">
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
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={Boolean(selectedEvidence)} onClose={() => setSelectedEvidence(null)} size="4xl">
        <ModalOverlay bg={modalOverlayBg} backdropFilter="blur(6px)" />
        <ModalContent
          maxW={{ base: '95vw', lg: '1000px' }}
          borderRadius="8px"
          overflow="hidden"
          bg="sand.100"
          color="ink.800"
          _dark={{ bg: 'ink.900', color: 'paper.100' }}
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
