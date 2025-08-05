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
    const { message, to } = await request.json();

    // Validate required fields
    if (!message || !to) {
      return NextResponse.json(
        { error: 'Message and recipient number are required' },
        { status: 400 }
      );
    }

    // Format the phone number (remove + if present and ensure it starts with country code)
    let formattedNumber = to.replace(/^\+/, '');
    if (!formattedNumber.startsWith('91')) {
      formattedNumber = '91' + formattedNumber;
    }

    // Check if this is the primary number (8921519949) for Twilio
    const primaryNumber = '918921519949';
    
    if (formattedNumber === primaryNumber) {
      // Use Twilio for primary number
      const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
      if (!twilioWhatsAppNumber) {
        return NextResponse.json(
          { error: 'Twilio WhatsApp number not configured. Please set TWILIO_WHATSAPP_NUMBER environment variable.' },
          { status: 500 }
        );
      }

      // Initialize Twilio client
      const client = getTwilioClient();

      // Send WhatsApp message using Twilio
      const twilioMessage = await client.messages.create({
        body: message,
        from: `whatsapp:${twilioWhatsAppNumber}`,
        to: `whatsapp:+${formattedNumber}`
      });

      console.log('WhatsApp message sent successfully via Twilio:', twilioMessage.sid);

      return NextResponse.json({
        success: true,
        messageId: twilioMessage.sid,
        message: 'WhatsApp message sent successfully via Twilio',
        method: 'twilio'
      });
    } else {
      // For other numbers, return WhatsApp URL for manual contact
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
      
      return NextResponse.json({
        success: true,
        whatsappUrl: whatsappUrl,
        message: 'WhatsApp URL generated for manual contact',
        method: 'manual'
      });
    }

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    
    // Handle Twilio configuration errors
    if (error.message && error.message.includes('credentials not configured')) {
      return NextResponse.json(
        { error: 'Twilio not configured. Please set up Twilio credentials in environment variables.' },
        { status: 500 }
      );
    }
    
    // Handle specific Twilio errors
    if (error.code === 21211) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    } else if (error.code === 21608) {
      return NextResponse.json(
        { error: 'WhatsApp number not verified. Please verify your number with Twilio first.' },
        { status: 400 }
      );
    } else if (error.code === 20003) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your Twilio Account SID and Auth Token.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Failed to send WhatsApp message: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 