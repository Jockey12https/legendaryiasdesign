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
    const { email } = await req.json()

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Legendary IAS Mentor <no-reply@legendaryiasmentor.com>',
        to: [email],
        subject: 'Welcome to Legendary IAS Mentor Academy',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Welcome to Legendary IAS Mentor Academy!</h2>
            <p>Dear Aspirant,</p>
            <p>Thank you for creating your account with Legendary IAS Mentor Academy. We're excited to be part of your UPSC preparation journey!</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">What's Next?</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;">✓ Explore our comprehensive course offerings</li>
                <li style="margin-bottom: 10px;">✓ Register for a free demo class</li>
                <li style="margin-bottom: 10px;">✓ Connect with our expert mentors</li>
                <li style="margin-bottom: 10px;">✓ Access free study materials</li>
              </ul>
            </div>

            <p>If you have any questions or need assistance, our support team is here to help.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 5px 0; font-weight: bold;">Legendary IAS Mentor</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Shaping Tomorrow's Civil Servants</p>
            </div>
          </div>
        `
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send welcome email')
    }

    return new Response(
      JSON.stringify({ message: 'Welcome email sent successfully' }),
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