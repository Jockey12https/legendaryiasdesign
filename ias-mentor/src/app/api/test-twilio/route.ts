import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Not Set',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Not Set',
    TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER ? 'Set' : 'Not Set',
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER ? 'Set' : 'Not Set'
  };

  return NextResponse.json({
    message: 'Twilio Environment Variables Status',
    environment: envVars,
    hasAllRequired: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_NUMBER)
  });
} 