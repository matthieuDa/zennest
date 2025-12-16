import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Honeypot check - if this field is filled, it's likely a bot
    if (body.honeypot) {
      return NextResponse.json(
        { success: false, message: 'Spam detected' },
        { status: 400 }
      )
    }

    const { name, email, phone, message, propertyType } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email invalide' },
        { status: 400 }
      )
    }

    // TODO: Implement email sending via Resend/SendGrid
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'ZenNest <contact@zennest.fr>',
    //   to: email,
    //   subject: 'Confirmation de votre demande',
    //   html: `<p>Merci ${name}, nous avons bien reçu votre message.</p>`
    // })

    // TODO: Send to CRM (HubSpot/Airtable) or Slack
    // Example webhook:
    // await fetch(process.env.SLACK_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     text: `Nouveau lead: ${name} (${email}) - ${propertyType}`
    //   })
    // })

    // Log the contact submission (in production, save to database)
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      propertyType,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
