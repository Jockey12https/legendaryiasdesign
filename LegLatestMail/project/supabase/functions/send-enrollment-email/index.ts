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
    const { name, email, course, phone, city, message } = await req.json()

    console.log('Sending enrollment confirmation email to:', email)

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
        subject: `Welcome to ${course} - Enrollment Confirmation`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Welcome to Legendary IAS Mentor Academy!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for enrolling in <strong>${course}</strong>. We're excited to have you join our community of future civil servants!</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Your Enrollment Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Course:</strong> ${course}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
                <li style="margin-bottom: 10px;"><strong>City:</strong> ${city}</li>
                ${message ? `<li style="margin-bottom: 10px;"><strong>Additional Requirements:</strong> ${message}</li>` : ''}
              </ul>
            </div>

            <p>Next Steps:</p>
            <ol>
              <li>Our academic counselor will contact you within 24 hours</li>
              <li>You'll receive access to our learning portal</li>
              <li>We'll schedule your orientation session</li>
            </ol>

            <p style="margin-top: 20px;">If you have any questions, feel free to reply to this email or call us at +91 98765 43210.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 5px 0; font-weight: bold;">Legendary IAS Mentor</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Shaping Tomorrow's Civil Servants</p>
            </div>
          </div>
        `
      })
    })

    const studentEmailResult = await studentEmailResponse.json()
    
    if (!studentEmailResponse.ok) {
      console.error('Student email error:', studentEmailResult)
      throw new Error(`Failed to send student confirmation email: ${JSON.stringify(studentEmailResult)}`)
    }

    console.log('Student email sent successfully:', studentEmailResult)

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
        subject: `New Course Enrollment: ${course}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Student Enrollment</h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Student Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
                <li style="margin-bottom: 10px;"><strong>City:</strong> ${city}</li>
                <li style="margin-bottom: 10px;"><strong>Course:</strong> ${course}</li>
                ${message ? `<li style="margin-bottom: 10px;"><strong>Additional Requirements:</strong> ${message}</li>` : ''}
              </ul>
            </div>

            <p>Please follow up with the student within 24 hours.</p>
          </div>
        `
      })
    })

    const adminEmailResult = await adminEmailResponse.json()

    if (!adminEmailResponse.ok) {
      console.error('Admin email error:', adminEmailResult)
    } else {
      console.log('Admin email sent successfully:', adminEmailResult)
    }

    return new Response(
      JSON.stringify({ message: 'Enrollment confirmation email sent successfully' }),
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