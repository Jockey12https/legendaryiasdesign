# Twilio WhatsApp API Setup Guide

## Prerequisites
1. A Twilio account (sign up at https://www.twilio.com)
2. A verified WhatsApp number for testing
3. Twilio WhatsApp Sandbox (for development) or WhatsApp Business API (for production)

## Setup Steps

### 1. Get Twilio Credentials
1. Log in to your Twilio Console
2. Go to Dashboard → Account Info
3. Copy your **Account SID** and **Auth Token**

### 2. Set Up WhatsApp Sandbox (Development)
1. In Twilio Console, go to Messaging → Try it out → Send a WhatsApp message
2. Follow the instructions to join your WhatsApp sandbox
3. Note your **Sandbox Number** (format: +14155238886)

### 3. Environment Variables
Add these to your `.env.local` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886  # Your Twilio WhatsApp number

# Your WhatsApp number (where you want to receive messages)
WHATSAPP_NUMBER=918921519949  # Your actual WhatsApp number
```

### 4. For Production (Optional)
To use WhatsApp Business API instead of sandbox:
1. Apply for WhatsApp Business API approval
2. Get your production WhatsApp number
3. Update `TWILIO_WHATSAPP_NUMBER` with your production number

## Testing
1. Start your development server: `npm run dev`
2. Try purchasing a course/material
3. Check if the WhatsApp message is sent automatically
4. Verify the message appears in your WhatsApp

## Troubleshooting

### Common Issues:
1. **"WhatsApp number not verified"**: Make sure you've joined the Twilio WhatsApp sandbox
2. **"Invalid phone number format"**: Ensure the number includes country code (e.g., 918921519949)
3. **"Authentication failed"**: Check your Twilio Account SID and Auth Token

### Error Codes:
- `21211`: Invalid phone number
- `21608`: WhatsApp number not verified
- `21614`: Invalid WhatsApp number format

## Security Notes
- Never commit your `.env.local` file to version control
- Use environment variables in production (Vercel, Netlify, etc.)
- Keep your Twilio Auth Token secure 