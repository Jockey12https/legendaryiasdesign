import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client with validation
const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables.');
  }
  
  return twilio(accountSid, authToken);
};

export async function POST(request: Request) {
  try {
    const { message, numbers } = await request.json();

    // Validate required fields
    if (!message || !numbers || !Array.isArray(numbers)) {
      return NextResponse.json(
        { error: 'Message and array of phone numbers are required' },
        { status: 400 }
      );
    }

    const results = [];
    const primaryNumber = '918921519949'; // Your Twilio-enabled number

    for (const number of numbers) {
      try {
        // Format the phone number
        let formattedNumber = number.replace(/^\+/, '');
        if (!formattedNumber.startsWith('91')) {
          formattedNumber = '91' + formattedNumber;
        }

        if (formattedNumber === primaryNumber) {
          // Use Twilio for primary number
          const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
          if (!twilioWhatsAppNumber) {
            results.push({
              number: formattedNumber,
              status: 'error',
              error: 'Twilio not configured'
            });
            continue;
          }

          const client = getTwilioClient();
          const twilioMessage = await client.messages.create({
            body: message,
            from: `whatsapp:${twilioWhatsAppNumber}`,
            to: `whatsapp:+${formattedNumber}`
          });

          results.push({
            number: formattedNumber,
            status: 'success',
            method: 'twilio',
            messageId: twilioMessage.sid
          });
        } else {
          // Generate WhatsApp URL for other numbers
          const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
          
          results.push({
            number: formattedNumber,
            status: 'success',
            method: 'manual',
            whatsappUrl: whatsappUrl
          });
        }
      } catch (error) {
        console.error(`Error processing number ${number}:`, error);
        results.push({
          number: number,
          status: 'error',
          error: error.message || 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      results: results,
      summary: {
        total: numbers.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length
      }
    });

  } catch (error) {
    console.error('Error sending WhatsApp messages:', error);
    return NextResponse.json(
      { error: `Failed to send WhatsApp messages: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 