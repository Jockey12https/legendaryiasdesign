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
    const { name, email, phone } = await req.json()

    // Send confirmation email to student
    const studentEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Legendary IAS Mentor <no-reply@legendaryiasmentor.com>',
        to: [email],
        subject: 'Registration Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Welcome to Legendary IAS Mentor Academy!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for registering for our course and showing interest. We're excited to have you join us!</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Your Registration Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
              </ul>
            </div>

            <p>Next Steps:</p>
            <ol>
              <li>Our team will contact you within 24 hours about your enquiry</li>
              <li>We'll send you the details and access instructions</li>
              <li>Prepare your questions for the interactive session</li>
            </ol>

            <p style="margin-top: 20px;">If you have any questions, feel free to reply to this email or call us at +91-8129313575.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 5px 0; font-weight: bold;">Legendary IAS Mentor</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Shaping Tomorrow's Civil Servants</p>
            </div>
          </div>
        `
      })
    })

    if (!studentEmailResponse.ok) {
      throw new Error('Failed to send confirmation email')
    }

    // Send notification to admin
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Legendary IAS Mentor <no-reply@legendaryiasmentor.com>',
        to: ['admin@legendaryiasmentor.com'],
        subject: 'New Registration-Enquiry on New Batch',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Registration-Enquiry on Classes</h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Student Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
              </ul>
            </div>

            <p>Please contact the student within 24 hours about their enquiry.</p>
          </div>
        `
      })
    })

    if (!adminEmailResponse.ok) {
      console.error('Failed to send admin notification')
    }

    return new Response(
      JSON.stringify({ message: 'Enquiry registration confirmation email sent successfully' }),
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