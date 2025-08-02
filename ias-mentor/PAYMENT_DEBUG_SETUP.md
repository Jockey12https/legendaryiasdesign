# Payment System Debug Setup Guide

## Issue Identified
The "Failed to initialize payment. Please try again." error occurs because Firebase environment variables are not configured.

## Solution Steps

### 1. Create Environment Variables File

Create a `.env.local` file in the `ias-mentor` directory with the following content:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# WhatsApp Payment Configuration
WHATSAPP_NUMBER=919876543210
UPI_ID=legendaryias@upi
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token

# Admin Configuration
ADMIN_SECRET=your_admin_secret_key
```

### 2. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app (or create one if none exists)
6. Copy the configuration values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
   - `measurementId` (if available)

### 3. Update Environment Variables

Replace the placeholder values in `.env.local` with your actual Firebase configuration.

### 4. Test Firebase Connection

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

Then test the Firebase connection by visiting:
`http://localhost:3000/api/payment/test`

### 5. Verify Payment API

Test the payment API with a simple request:

```bash
curl -X POST http://localhost:3000/api/payment \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user",
    "userEmail": "test@example.com",
    "userName": "Test User",
    "productId": "test-product",
    "productTitle": "Test Product",
    "productType": "course",
    "amount": 100
  }'
```

### 6. Check Browser Console

Open your browser's developer tools and check the console for detailed error messages when trying to initialize payment.

## Debug Information Added

I've added detailed logging to both the API and frontend components:

### API Logging (`/api/payment/route.ts`)
- Logs when the API starts processing
- Logs the request body
- Logs Firebase initialization status
- Logs Firestore operations
- Logs success/error responses

### Frontend Logging (`WhatsAppPaymentModal.tsx`)
- Logs user and product data
- Logs request body being sent
- Logs response status and headers
- Logs response data
- Logs any errors

## Common Issues and Solutions

### Issue 1: "Firebase not initialized"
**Solution**: Check that all Firebase environment variables are set correctly in `.env.local`

### Issue 2: "Missing required fields"
**Solution**: Ensure the frontend is sending all required fields (userId, userEmail, userName, productId, productTitle, productType, amount)

### Issue 3: "Failed to save payment to database"
**Solution**: 
1. Check Firebase project permissions
2. Ensure Firestore database is created
3. Check Firestore security rules

### Issue 4: Network errors
**Solution**: 
1. Check if the development server is running
2. Verify the API endpoint URL
3. Check browser network tab for request/response details

## Testing Steps

1. **Set up environment variables** (Step 1-3 above)
2. **Restart development server**
3. **Open browser console** (F12)
4. **Navigate to courses page**
5. **Try to enroll in a course**
6. **Check console logs** for detailed error information
7. **Check network tab** for API request/response details

## Expected Behavior

After proper setup:
1. Payment modal should open without errors
2. Console should show successful API calls
3. Payment record should be created in Firestore
4. WhatsApp URL should be generated
5. Payment status should be "pending"

## Next Steps

Once the basic payment initialization is working:
1. Set up WhatsApp Business API or use manual confirmation
2. Configure admin dashboard access
3. Set up payment proof verification
4. Test the complete payment flow

## Support

If you continue to have issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure Firebase project is properly configured
4. Check Firestore database exists and has proper permissions 