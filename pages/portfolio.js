import {
  Box,
  Container,
  Heading,
  HStack,
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
  Wrap,
  UnorderedList,
  ListItem,
  Divider,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Section from '../components/section'
import ProfileFixedLayout from '../components/profile-fixed-layout'

const projects = [
  {
    id: 'ga4-demo-store',
    title: 'Demo Web Store + Google Analytics 4 (GA4)',
    shortDescription:
      'Digital Analytics / Conversion Tracking for a demo ecommerce with end-to-end funnel measurement.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['GA4', 'Google Tag Manager', 'UTMs', 'Looker Studio', 'QA'],
    createdAt: '2026-03-24',
    content: 'Project documentation goes here'
  },
  {
    id: 'utm-funnel-demo',
    title: 'Enfoque: adquisición, UTMs y funnel de e-commerce (demo)',
    shortDescription:
      'Reporting end-to-end con GA4 y Looker Studio para adquisición, campañas y funnel.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['GA4', 'Looker Studio', 'UTMs', 'Acquisition', 'Funnel'],
    createdAt: '2026-03-24',
    content: 'Project documentation goes here'
  },
  {
    id: 'ga4-ads-validation',
    title: 'Enfoque: adquisición, UTMs y funnel de e-commerce (demo)',
    shortDescription:
      'Reporting end-to-end con GA4 y Looker Studio para adquisición, campañas y funnel.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?q=80&w=905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?q=80&w=905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['GA4', 'Looker Studio', 'UTMs', 'Acquisition', 'Funnel'],
    createdAt: '2026-03-24',
    content: 'Project documentation goes here'
  },
  {
    id: 'gtm-implementation',
    title: 'Google Tag Manager (GTM) | Implementación, Tracking y QA',
    shortDescription:
      'Arquitectura de tracking en GTM para e-commerce demo con QA reproducible en GA4.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modalImageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['GTM', 'GA4', 'QA', 'Tracking', 'Ecommerce'],
    createdAt: '2026-03-24',
    content: 'Project documentation goes here'
  }
]

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const renderProjectContent = project => {
  if (project.id === 'ga4-demo-store') {
    return (
      <Stack spacing={4}>
        <Heading as="h4" size="md">
          Resumen
        </Heading>
        <Text>
          Implementé un sistema de medición end-to-end para un e-commerce demo (web store)
          usando GA4 (eventos + funnel) y Google Tag Manager (GTM) (etiquetado/click
          tracking), con QA en Realtime/DebugView.
        </Text>
        <Text>Tipo: Digital Analytics / Conversion Tracking</Text>
        <Text>
          Stack: GA4, Google Tag Manager, UTMs, Looker Studio (opcional), debugging/QA
        </Text>
        <Text>Contexto: Store demo (sitio web) con flujo de compra simulado</Text>

        <Divider />
        <Heading as="h4" size="md">
          Problema / Oportunidad
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>eventos incompletos o sin parámetros</ListItem>
          <ListItem>duplicados (double firing)</ListItem>
          <ListItem>funnel roto por inconsistencia de nombres/valores</ListItem>
          <ListItem>atribución incorrecta por UTMs mal usados</ListItem>
        </UnorderedList>
        <Text>
          Este proyecto muestra una implementación limpia y validada para medir adquisición,
          interacción con producto, add to cart, inicio de checkout y compra simulada.
        </Text>

        <Divider />
        <Heading as="h4" size="md">
          Objetivos
        </Heading>
        <OrderedList spacing={1}>
          <ListItem>Medir el funnel e-commerce completo en GA4.</ListItem>
          <ListItem>Garantizar eventos consistentes y con parámetros útiles.</ListItem>
          <ListItem>Validar calidad de datos en Realtime/DebugView.</ListItem>
          <ListItem>Dejar base lista para UTMs, dashboards y Google Ads (opcional).</ListItem>
        </OrderedList>

        <Divider />
        <Heading as="h4" size="md">
          Alcance
        </Heading>
        <Text fontWeight="bold">Incluye</Text>
        <UnorderedList spacing={1}>
          <ListItem>Definición de eventos e-commerce (funnel).</ListItem>
          <ListItem>Implementación/validación de eventos en GA4.</ListItem>
          <ListItem>GTM para tracking de clicks relevantes.</ListItem>
          <ListItem>QA técnico (DebugView / Realtime).</ListItem>
          <ListItem>Validación de parámetros clave.</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">No incluye (demo)</Text>
        <UnorderedList spacing={1}>
          <ListItem>Pasarela de pago real.</ListItem>
          <ListItem>Back-end de órdenes real.</ListItem>
          <ListItem>Enriquecimiento con CRM.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          Arquitectura de medición
        </Heading>
        <Text>Sitio (Web Store) → GTM (tags + triggers) → GA4 (events) → Reportes</Text>

        <Divider />
        <Heading as="h4" size="md">
          Plan de medición (eventos)
        </Heading>
        <OrderedList spacing={2}>
          <ListItem>
            <Text fontWeight="bold">view_item</Text>
            <Text>Cuándo: vista de página de producto</Text>
            <Text>Parámetros: item_id, item_name, price, currency</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">add_to_cart</Text>
            <Text>Cuándo: click en Add to cart</Text>
            <Text>Parámetros: item_id, item_name, price, quantity, currency</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">begin_checkout</Text>
            <Text>Cuándo: inicio de checkout</Text>
            <Text>Parámetros: value, currency, items_count</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">purchase</Text>
            <Text>Cuándo: compra simulada completada</Text>
            <Text>Parámetros: transaction_id, value, currency, items_count</Text>
          </ListItem>
        </OrderedList>

        <Divider />
        <Heading as="h4" size="md">
          Implementación
        </Heading>
        <Text fontWeight="bold">GA4</Text>
        <UnorderedList spacing={1}>
          <ListItem>Configuración de propiedad y stream web.</ListItem>
          <ListItem>Validación de eventos en DebugView.</ListItem>
          <ListItem>Revisión de parámetros y tipos de dato.</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">GTM</Text>
        <UnorderedList spacing={1}>
          <ListItem>Configuración de contenedor.</ListItem>
          <ListItem>Variables de click para interacciones.</ListItem>
          <ListItem>Trigger de click para Add to cart (cuando aplica).</ListItem>
          <ListItem>Tag GA4 Event para add_to_cart (si se requiere).</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          QA / Validación
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Eventos disparan una sola vez.</ListItem>
          <ListItem>Orden correcto del funnel.</ListItem>
          <ListItem>Parámetros presentes y válidos.</ListItem>
          <ListItem>transaction_id único por compra.</ListItem>
          <ListItem>value y currency consistentes.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          Resultados / Entregables
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Funnel GA4 funcionando con eventos y parámetros.</ListItem>
          <ListItem>Tracking validado con evidencia en Debug/Realtime.</ListItem>
          <ListItem>Base lista para reportes de adquisición y performance.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          Aprendizajes
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>La consistencia de parámetros es crítica para análisis.</ListItem>
          <ListItem>QA temprano evita ruido en GA4.</ListItem>
          <ListItem>El tracking documentado y probado aporta más valor.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          Próximos pasos (mejoras)
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Añadir items[] en eventos ecommerce para reporting más rico.</ListItem>
          <ListItem>Crear dashboard en Looker Studio (funnel, UTMs, revenue simulado).</ListItem>
          <ListItem>Conectar purchase como conversión en Google Ads y validar atribución.</ListItem>
        </UnorderedList>
      </Stack>
    )
  }

  if (project.id === 'utm-funnel-demo' || project.id === 'ga4-ads-validation') {
    return (
      <Stack spacing={4}>
        <Heading as="h4" size="md">
          1) Resumen ejecutivo
        </Heading>
        <Text>
          Construí un sistema de reporting end-to-end para una tienda demo, conectando
          GA4 → Looker Studio para visualizar adquisición (Fuente/Medio), campañas (UTM)
          y funnel de e-commerce (eventos).
        </Text>
        <Text>
          El objetivo fue demostrar criterios de medición limpia, naming consistente, y
          dashboards accionables para stakeholders de marketing/producto.
        </Text>

        <Divider />
        <Heading as="h4" size="md">
          2) Objetivos del proyecto
        </Heading>
        <OrderedList spacing={1}>
          <ListItem>Estandarizar tracking de adquisición con UTMs.</ListItem>
          <ListItem>Visualizar funnel completo (view_item → purchase).</ListItem>
          <ListItem>Publicar dashboard de negocio accionable en Looker Studio.</ListItem>
        </OrderedList>

        <Divider />
        <Heading as="h4" size="md">
          3) Alcance
        </Heading>
        <Text fontWeight="bold">Incluye</Text>
        <UnorderedList spacing={1}>
          <ListItem>Lectura de GA4 y modelado básico en Looker Studio.</ListItem>
          <ListItem>Tablas de adquisición por Fuente/Medio y Campaña (UTM).</ListItem>
          <ListItem>Módulo de funnel por eventos.</ListItem>
          <ListItem>Validación rápida en GA4 (Realtime/Key events).</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">No incluye</Text>
        <UnorderedList spacing={1}>
          <ListItem>Atribución avanzada (data-driven / MMM) ni BigQuery.</ListItem>
          <ListItem>Optimización UX del storefront (es demo).</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          4) Stack / Herramientas
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Google Analytics 4 (GA4)</ListItem>
          <ListItem>Looker Studio</ListItem>
          <ListItem>UTMs</ListItem>
          <ListItem>GTM (complementario para tracking/QA)</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          5) Diseño de medición (eventos y conversiones)
        </Heading>
        <Text>Funnel e-commerce en dashboard:</Text>
        <UnorderedList spacing={1}>
          <ListItem>view_item</ListItem>
          <ListItem>add_to_cart</ListItem>
          <ListItem>begin_checkout</ListItem>
          <ListItem>purchase (key event / conversión)</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          6) Estrategia de adquisición y UTMs
        </Heading>
        <Text>Reglas prácticas:</Text>
        <UnorderedList spacing={1}>
          <ListItem>utm_source: origen (google, meta, newsletter, partner...)</ListItem>
          <ListItem>utm_medium: tipo de canal (cpc, paid_social, email...)</ListItem>
          <ListItem>utm_campaign: nombre de campaña</ListItem>
        </UnorderedList>
        <Text>Buenas prácticas: naming en minúsculas, consistencia y diccionario UTM.</Text>

        <Divider />
        <Heading as="h4" size="md">
          7) Dashboard (Looker Studio)
        </Heading>
        <OrderedList spacing={1}>
          <ListItem>KPIs principales (usuarios, sesiones, eventos, purchase).</ListItem>
          <ListItem>Adquisición por Fuente/Medio.</ListItem>
          <ListItem>Campañas por UTM.</ListItem>
          <ListItem>Funnel por eventos.</ListItem>
          <ListItem>Tendencia temporal de sesiones.</ListItem>
        </OrderedList>

        <Divider />
        <Heading as="h4" size="md">
          8) Evidencia de resultados
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Total de usuarios: 29</ListItem>
          <ListItem>Sesiones: 64</ListItem>
          <ListItem>Número de eventos: 801</ListItem>
          <ListItem>Key events (purchase): 14</ListItem>
        </UnorderedList>
        <Text>Funnel (conteo): view_item 78, add_to_cart 44, begin_checkout 23, purchase 14.</Text>

        <Divider />
        <Heading as="h4" size="md">
          9) QA / Validación
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Eventos del funnel visibles en GA4.</ListItem>
          <ListItem>purchase marcado como key event.</ListItem>
          <ListItem>Tablas de Fuente/Medio y Campaña con datos.</ListItem>
          <ListItem>Serie temporal con variación por periodo.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          10) Insights demostrables
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Qué canal/campaña genera más sesiones y compras.</ListItem>
          <ListItem>Qué etapa del funnel concentra más caída.</ListItem>
          <ListItem>Señales de baja intención o fricción en checkout.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          11) Limitaciones y mejoras siguientes
        </Heading>
        <Text fontWeight="bold">Limitaciones</Text>
        <UnorderedList spacing={1}>
          <ListItem>Funnel por conteo de eventos.</ListItem>
          <ListItem>UTMs de prueba (no representan mix real).</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">Mejoras propuestas</Text>
        <UnorderedList spacing={1}>
          <ListItem>Tasas de conversión por etapa con usuarios/sesiones.</ListItem>
          <ListItem>Segmentación por canal (pago/orgánico/referral).</ListItem>
          <ListItem>Tabla de governance UTM y detección de valores inesperados.</ListItem>
          <ListItem>Opcional: BigQuery + fuentes mezcladas.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          12) Links
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>
            GA4: https://analytics.google.com/analytics/web/#/a387127918p527851150/reports/intelligenthome
          </ListItem>
          <ListItem>
            GTM: https://tagmanager.google.com/?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fintl%2Fes%2Fabout%2Ftag-manager%2F#/container/accounts/6345013589/containers/246720709/workspaces/4
          </ListItem>
          <ListItem>
            Looker Studio: https://lookerstudio.google.com/u/0/reporting/7745b769-fba3-454b-bd6a-05bc175c23f6/page/7J4rF
          </ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          13) Pitch de 20 segundos
        </Heading>
        <Text>
          Implementé un dashboard en Looker Studio conectado a GA4 para monitorear
          adquisición y desempeño de campañas con UTMs, además de un funnel e-commerce
          basado en eventos. Esto permite explicar qué canal/campaña aporta más compras y
          en qué etapa del funnel se pierde intención.
        </Text>
      </Stack>
    )
  }

  if (project.id === 'gtm-implementation') {
    return (
      <Stack spacing={4}>
        <Heading as="h4" size="md">
          1) Resumen ejecutivo
        </Heading>
        <Text>
          Implementé y validé una arquitectura de tracking en Google Tag Manager (GTM)
          para una tienda demo (e-commerce simulado), asegurando que los eventos lleguen
          correctamente a GA4 para análisis de funnel y adquisición.
        </Text>
        <Text>
          Resultado: contenedor GTM con variables, activadores y etiquetas documentadas,
          más flujo de QA reproducible con evidencias en DebugView/Realtime.
        </Text>

        <Divider />
        <Heading as="h4" size="md">
          2) Contexto y problema
        </Heading>
        <Text>Necesidades del equipo:</Text>
        <UnorderedList spacing={1}>
          <ListItem>Tracking consistente en eventos y parámetros.</ListItem>
          <ListItem>Menor dependencia del equipo de desarrollo.</ListItem>
          <ListItem>QA ágil antes de publicar cambios.</ListItem>
          <ListItem>Trazabilidad de cambios.</ListItem>
        </UnorderedList>
        <Text>Dolores comunes:</Text>
        <UnorderedList spacing={1}>
          <ListItem>Eventos incompletos o duplicados.</ListItem>
          <ListItem>Naming inconsistente.</ListItem>
          <ListItem>Falta de validación previa a producción.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          3) Objetivos
        </Heading>
        <OrderedList spacing={1}>
          <ListItem>Configurar contenedor GTM con buenas prácticas.</ListItem>
          <ListItem>Implementar tracking para acciones clave del funnel.</ListItem>
          <ListItem>Garantizar QA sin duplicados y con parámetros correctos.</ListItem>
          <ListItem>Documentar setup escalable (SOP / handoff).</ListItem>
        </OrderedList>

        <Divider />
        <Heading as="h4" size="md">
          4) Alcance
        </Heading>
        <Text fontWeight="bold">Incluido</Text>
        <UnorderedList spacing={1}>
          <ListItem>Contenedor GTM Web y configuración base.</ListItem>
          <ListItem>Variables integradas y custom.</ListItem>
          <ListItem>Triggers por clicks y/o eventos dataLayer.</ListItem>
          <ListItem>Envío de eventos a GA4.</ListItem>
          <ListItem>QA con Tag Assistant, DebugView y Realtime.</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">No incluido</Text>
        <UnorderedList spacing={1}>
          <ListItem>Server-side tagging.</ListItem>
          <ListItem>Consent Mode avanzado.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          5) Implementación (arquitectura)
        </Heading>
        <Text fontWeight="bold">5.1 Diseño de medición (Naming & data contract)</Text>
        <UnorderedList spacing={1}>
          <ListItem>
            Eventos consistentes: view_item, add_to_cart, begin_checkout, purchase.
          </ListItem>
          <ListItem>
            Parámetros mínimos: item_id, item_name, value, currency, transaction_id,
            items_count.
          </ListItem>
        </UnorderedList>
        <Text fontWeight="bold">5.2 Variables</Text>
        <UnorderedList spacing={1}>
          <ListItem>Built-in clicks: ID, Classes, Text, URL, Element.</ListItem>
          <ListItem>
            DLV custom: transaction_id, value, currency, item_id, item_name, items_count.
          </ListItem>
          <ListItem>Page Path/Page URL para reglas.</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">5.3 Triggers</Text>
        <UnorderedList spacing={1}>
          <ListItem>Triggers por click (Add to cart / Complete purchase).</ListItem>
          <ListItem>Custom Events vía dataLayer.push cuando existe.</ListItem>
        </UnorderedList>
        <Text fontWeight="bold">5.4 Tags (GA4)</Text>
        <UnorderedList spacing={1}>
          <ListItem>GA4 Configuration Tag (cuando aplica).</ListItem>
          <ListItem>GA4 Event tags: view_item, add_to_cart, begin_checkout, purchase.</ListItem>
          <ListItem>Eventos click_* para engagement (si aplica).</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          6) QA / Validación
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Preview: triggers disparan cuando corresponde.</ListItem>
          <ListItem>DebugView: evento y parámetros presentes.</ListItem>
          <ListItem>Realtime: eventos visibles sin duplicados.</ListItem>
          <ListItem>
            purchase con transaction_id, value, currency; add_to_cart con item params.
          </ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          7) Resultados
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Tracking consistente del funnel completo.</ListItem>
          <ListItem>Click tracking en acciones críticas.</ListItem>
          <ListItem>QA reproducible con Preview + DebugView.</ListItem>
          <ListItem>Estructura de contenedor lista para escalar.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          8) Qué aprendí / decisiones técnicas
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Con dataLayer, Custom Events es más robusto que reglas por CSS.</ListItem>
          <ListItem>La consistencia de parámetros mantiene reportes confiables.</ListItem>
          <ListItem>Preview/DebugView reduce riesgo de medición rota en producción.</ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          9) Guión corto para entrevista
        </Heading>
        <Text>
          Monté un contenedor GTM para una tienda demo, estandaricé eventos del funnel y
          configuré tags GA4 con variables/triggers para parámetros críticos. Validé disparos
          y calidad con Tag Assistant + DebugView/Realtime para habilitar análisis de funnel
          e integración con Ads/Looker.
        </Text>

        <Divider />
        <Heading as="h4" size="md">
          10) Links
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>
            GTM: https://tagmanager.google.com/?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fintl%2Fes%2Fabout%2Ftag-manager%2F#/container/accounts/6345013589/containers/246720709/workspaces/4
          </ListItem>
          <ListItem>
            GA4: https://analytics.google.com/analytics/web/#/a387127918p527851150/reports/intelligenthome
          </ListItem>
          <ListItem>
            Looker Studio: https://lookerstudio.google.com/u/0/reporting/7745b769-fba3-454b-bd6a-05bc175c23f6/page/7J4rF
          </ListItem>
        </UnorderedList>

        <Divider />
        <Heading as="h4" size="md">
          11) Próximos pasos
        </Heading>
        <UnorderedList spacing={1}>
          <ListItem>Consent Mode v2.</ListItem>
          <ListItem>Server-side tagging (GTM SS).</ListItem>
          <ListItem>Tracking plan más formal y governance de naming.</ListItem>
          <ListItem>Monitoreo de calidad de datos con alertas.</ListItem>
        </UnorderedList>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      <Text>{project.content}</Text>
    </Stack>
  )
}

const PortfolioPage = () => {
  const router = useRouter()
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

  const [selectedProject, setSelectedProject] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenProject = project => {
    setSelectedProject(project)
    onOpen()
  }

  const handleCloseProject = () => {
    onClose()
    setSelectedProject(null)
  }

  return (
    <>
      <Head>
        <title>Portfolio - Armando Bringas</title>
        <meta name="twitter:title" content="Portfolio - Armando Bringas" />
        <meta property="og:title" content="Portfolio - Armando Bringas" />
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
            <Heading as="h3" variant="section-title" mt={0}>
              Portfolio
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={3}>
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
                  onClick={() => handleOpenProject(project)}
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
              <ModalHeader pb={2}>{selectedProject.title}</ModalHeader>
              <ModalBody pb={8}>
                <Stack spacing={5}>
                  <HStack spacing={8} flexWrap="wrap">
                    <Box>
                      <Text fontSize="sm" opacity={0.8}>
                        Created
                      </Text>
                      <Text>{selectedProject.createdAt}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" opacity={0.8}>
                        Tags
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
                  {renderProjectContent(selectedProject)}
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
