# Environment Setup Guide

## Quick Setup Steps

### 1. Create Environment File
Create a file named `.env.local` in the `ias-mentor` directory with this content:

```bash
# Firebase Configuration (Replace with your actual values)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Payment Configuration
WHATSAPP_NUMBER=919876543210
UPI_ID=legendaryias@upi
ADMIN_SECRET=your_admin_secret
```

### 2. Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings (gear icon)
4. Add a web app if you haven't already
5. Copy the configuration values

### 3. Start Development Server
Run this command in PowerShell:
```powershell
.\start-dev.ps1
```

Or manually:
```powershell
cd ias-mentor
npm run dev
```

### 4. Test the Setup
Visit: `http://localhost:3000/test-payment`

## Troubleshooting

### If you get "Firebase not initialized" error:
- Check that `.env.local` file exists
- Verify all Firebase environment variables are set
- Restart the development server

### If you get middleware errors:
- The `output: 'export'` has been removed from `next.config.js`
- API routes should now work properly

### If PowerShell gives errors:
- Use the provided `start-dev.ps1` script
- Or run commands one by one instead of using `&&`

## Next Steps

1. Set up your Firebase project
2. Add the environment variables
3. Start the development server
4. Test the payment system at `/test-payment`
5. Try enrolling in a course to test the payment flow 