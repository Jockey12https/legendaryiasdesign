import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = 're_bZSvDz6E_ALdAyvtWhPZNUKHjiDwdhEZ2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, subject, message } = await req.json()

    // Send confirmation email to user
    const userResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Legendary IAS Mentor <no-reply@legendaryiasmentor.com>',
        to: [email],
        subject: 'We received your message - Legendary IAS Mentor',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Thank You for Contacting Us!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message regarding "${subject}". Our team will review it and get back to you shortly.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Your Message:</h3>
              <p style="color: #4b5563; font-style: italic;">${message}</p>
            </div>

            <p>We typically respond within 24 hours during business days.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 5px 0; font-weight: bold;">Legendary IAS Mentor</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Shaping Tomorrow's Civil Servants</p>
            </div>
          </div>
        `
      })
    })

    if (!userResponse.ok) {
      throw new Error('Failed to send confirmation email')
    }

    // Send notification to admin
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Legendary IAS Mentor <no-reply@legendaryiasmentor.com>',
        to: ['admin@legendaryiasmentor.com'],
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Contact Form Submission</h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Contact Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone || 'Not provided'}</li>
                <li style="margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</li>
              </ul>
              
              <h3 style="color: #1e3a8a; margin-top: 20px;">Message:</h3>
              <p style="color: #4b5563;">${message}</p>
            </div>

            <p>Please respond to this inquiry within 24 hours.</p>
          </div>
        `
      })
    })

    if (!adminResponse.ok) {
      console.error('Failed to send admin notification')
    }

    return new Response(
      JSON.stringify({ message: 'Contact confirmation email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})