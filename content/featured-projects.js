const projectGalleries = {
  'nutrition-consultation-site': [
    ['01-home', '/images/projects/nutrition-consultation/01-home.png', 'Inicio', 'Home page'],
    ['02-services', '/images/projects/nutrition-consultation/02-services.png', 'Servicios', 'Services'],
    ['03-contact', '/images/projects/nutrition-consultation/03-contact.png', 'Contacto', 'Contact'],
    ['04-booking-form', '/images/projects/nutrition-consultation/04-booking-form.png', 'Formulario de agenda', 'Booking form']
  ],
  'sarintec-engineering-site': [
    ['01-home', '/images/projects/sarintec-engineering/01-home.png', 'Página principal', 'Home page'],
    ['02-services', '/images/projects/sarintec-engineering/02-services.png', 'Servicios', 'Services'],
    ['03-process', '/images/projects/sarintec-engineering/03-process.png', 'Proceso', 'Process'],
    ['04-footer', '/images/projects/sarintec-engineering/04-footer.png', 'Pie de página', 'Footer'],
    ['05-service-request', '/images/projects/sarintec-engineering/05-service-request.png', 'Solicitud de servicio', 'Service request']
  ]
}

const gallery = (projectId, language) => ({
  type: 'gallery',
  items: projectGalleries[projectId].map(([id, imageUrl, esTitle, enTitle]) => ({
    id,
    imageUrl,
    title: language === 'es' ? esTitle : enTitle,
    caption: language === 'es' ? esTitle : enTitle
  }))
})

export const getFeaturedProjects = language => {
  const isSpanish = language === 'es'

  return [
    {
      id: 'nutrition-consultation-site',
      title: isSpanish ? 'Sitio web para consulta nutricional' : 'Nutrition consultation website',
      shortDescription: isSpanish
        ? 'Sitio informativo y de agendamiento que centraliza las citas y los datos iniciales de pacientes para que la consulta empiece con contexto.'
        : 'An informational and appointment-booking website that centralizes scheduling and a patient’s initial details so each consultation starts with context.',
      tags: ['Next.js', 'React', 'Chakra UI', 'Sanity CMS', 'Calendly', 'Google Calendar', 'Google Sheets'],
      coverImageUrl: '/images/projects/nutrition-consultation/01-home.png',
      modalImageUrl: '/images/projects/nutrition-consultation/01-home.png',
      createdAt: '2026',
      contentBlocks: [
        { type: 'heading', text: isSpanish ? 'Resumen' : 'Summary' },
        { type: 'text', text: isSpanish ? 'Desarrollé un sitio para una consulta nutricional que presenta su propuesta de acompañamiento, especialidades y servicios, y guía a las personas hacia la agenda de una cita.' : 'I built a website for a nutrition practice that presents its approach, specialties, and services, then guides visitors to schedule an appointment.' },
        { type: 'heading', text: isSpanish ? 'Alcance' : 'Scope' },
        { type: 'ul', items: isSpanish ? ['Landing responsive con perfil, acompañamiento y contacto.', 'Formulario de datos iniciales y página de agenda conectada con Calendly.', 'Confirmación de cita por Gmail y opción para agregarla a Google Calendar.', 'Registro de datos iniciales en Google Sheets.', 'Contenido administrable desde Sanity CMS.'] : ['Responsive landing page with profile, care, and contact sections.', 'Initial-details form and booking page connected to Calendly.', 'Appointment confirmation sent by Gmail with an option to add it to Google Calendar.', 'Initial details stored in Google Sheets.', 'Content modeled and managed through Sanity CMS.'] },
        { type: 'heading', text: isSpanish ? 'Sitio' : 'Website' },
        { type: 'ul', items: [{ text: isSpanish ? 'Ver sitio en vivo' : 'View live site', url: 'https://nutrition-site-two.vercel.app/' }] },
        gallery('nutrition-consultation-site', language)
      ]
    },
    {
      id: 'sarintec-engineering-site',
      title: 'Sarintec Ingeniería',
      shortDescription: isSpanish
        ? 'Sitio web para una empresa de ingeniería con servicios de seguridad, automatización, conectividad e iluminación, y un flujo para recibir solicitudes de servicio.'
        : 'A website for an engineering company offering security, automation, connectivity, and lighting services, with a flow for receiving service requests.',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form', 'Zod', 'Drizzle ORM', 'Neon PostgreSQL'],
      coverImageUrl: '/images/projects/sarintec-engineering/01-home.png',
      modalImageUrl: '/images/projects/sarintec-engineering/01-home.png',
      createdAt: '2026',
      contentBlocks: [
        { type: 'heading', text: isSpanish ? 'Resumen' : 'Summary' },
        { type: 'text', text: isSpanish ? 'Desarrollé el sitio de Sarintec Ingeniería para comunicar sus soluciones para hogares y negocios y facilitar las solicitudes de servicio desde la web.' : 'I built the Sarintec Ingeniería website to communicate its connected-space solutions for homes and businesses and make it easier to request a service online.' },
        { type: 'heading', text: isSpanish ? 'Alcance' : 'Scope' },
        { type: 'ul', items: isSpanish ? ['Landing responsive para servicios de seguridad, automatización, redes e iluminación.', 'Formulario para solicitar un servicio y compartir los detalles iniciales del proyecto.', 'Agenda de visitas mediante Calendly, con detalles enviados por correo y Google Calendar.', 'Área administrativa protegida para revisar solicitudes recibidas.'] : ['Responsive landing page for security, automation, network, and lighting services.', 'Service-request form for sharing initial project details.', 'Visits can be scheduled through Calendly, with details delivered by email and Google Calendar.', 'Protected admin area for reviewing submitted requests.'] },
        { type: 'heading', text: isSpanish ? 'Sitio' : 'Website' },
        { type: 'ul', items: [{ text: isSpanish ? 'Ver sitio en vivo' : 'View live site', url: 'https://sarintec-eng.vercel.app/' }] },
        gallery('sarintec-engineering-site', language)
      ]
    }
  ]
}
