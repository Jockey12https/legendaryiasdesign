import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, from, subject, text } = await request.json();

    // Validate input
    if (!to || !from || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Legendary IAS Mentor <notifications@legendaryiasmentor.com>',
      to: [to, 'admin@legendaryiasmentor.com'], // Send to both specified admin and the one in the request
      replyTo: from,
      subject: subject,
      text: text,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}