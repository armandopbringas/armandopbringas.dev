const RESEND_API_URL = 'https://api.resend.com/emails'

const getErrorMessage = (language, fallback) =>
  language === 'es' ? fallback.es : fallback.en

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    name = '',
    email = '',
    company = '',
    service = '',
    budget = '',
    details = '',
    language = 'es'
  } = req.body || {}

  if (!name || !email || !service || !budget || !details) {
    return res.status(400).json({
      error: getErrorMessage(language, {
        es: 'Faltan campos obligatorios del formulario.',
        en: 'Required form fields are missing.'
      })
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL || 'Armando Portfolio <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL || 'bringas.armandop@gmail.com'

  if (!apiKey) {
    return res.status(500).json({
      error: getErrorMessage(language, {
        es: 'Falta configurar RESEND_API_KEY en las variables de entorno.',
        en: 'RESEND_API_KEY is missing from environment variables.'
      })
    })
  }

  const subject =
    language === 'es'
      ? `Nueva consulta web de ${name}`
      : `New web inquiry from ${name}`

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1a17;">
      <h2>${language === 'es' ? 'Nueva consulta desde el sitio web' : 'New inquiry from the website'}</h2>
      <p><strong>${language === 'es' ? 'Nombre' : 'Name'}:</strong> ${name}</p>
      <p><strong>${language === 'es' ? 'Correo de trabajo' : 'Work email'}:</strong> ${email}</p>
      <p><strong>${language === 'es' ? 'Empresa' : 'Company'}:</strong> ${company || '-'}</p>
      <p><strong>${language === 'es' ? 'Servicio que necesitas' : 'Service needed'}:</strong> ${service}</p>
      <p><strong>${language === 'es' ? 'Rango de inversión' : 'Budget range'}:</strong> ${budget}</p>
      <p><strong>${language === 'es' ? 'Detalles del proyecto' : 'Project details'}:</strong></p>
      <p>${String(details).replace(/\n/g, '<br />')}</p>
    </div>
  `

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(502).json({
        error:
          data?.message ||
          getErrorMessage(language, {
            es: 'No se pudo enviar el correo desde el servidor.',
            en: 'The server could not send the email.'
          })
      })
    }

    return res.status(200).json({ ok: true, id: data.id })
  } catch {
    return res.status(500).json({
      error: getErrorMessage(language, {
        es: 'Ocurrió un error inesperado al enviar la consulta.',
        en: 'An unexpected error occurred while sending the inquiry.'
      })
    })
  }
}
