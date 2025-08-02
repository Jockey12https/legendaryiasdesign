# WhatsApp Payment System Setup Guide

This guide will help you set up the WhatsApp-based payment confirmation system for your study material website.

## 🚀 Overview

The system allows users to:
1. Select courses/materials for purchase
2. Get UPI payment instructions
3. Contact via WhatsApp with payment proof
4. Receive automatic access upon payment confirmation

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with Firestore database
- WhatsApp Business account or personal WhatsApp number
- UPI payment gateway account

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# WhatsApp Configuration
WHATSAPP_NUMBER=919876543210  # Your WhatsApp number with country code
UPI_ID=legendaryias@upi       # Your UPI ID

# Email Configuration (for notifications)
RESEND_API_KEY=your_resend_api_key
```

## 🗄️ Firebase Setup

### 1. Create Firestore Collections

The system uses these collections:

```javascript
// payments collection
{
  id: "PAY_1234567890_abc123",
  userId: "user_uid",
  userEmail: "user@example.com",
  userName: "John Doe",
  productId: "course_123",
  productTitle: "Advanced Mathematics",
  productType: "course", // or "material"
  amount: 499,
  currency: "INR",
  upiId: "legendaryias@upi",
  status: "pending", // pending, confirmed, rejected, expired
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  transactionId: "TXN123456",
  adminNotes: "Payment verified",
  paymentProof: "https://example.com/screenshot.jpg"
}

// users collection (existing)
{
  uid: "user_uid",
  enrolledCourses: [...],
  purchasedMaterials: [...],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### 2. Set up Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read their own payments
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Admin can read all payments (add admin check)
    match /payments/{paymentId} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

## 📱 WhatsApp Setup

### Option 1: WhatsApp Business App (Recommended for small scale)

1. **Install WhatsApp Business App**
   - Download from App Store/Play Store
   - Set up your business profile

2. **Create Quick Reply Templates**
   ```
   Template 1: Payment Instructions
   "Hi! Please send ₹{amount} to {upi_id} for {product_name}. 
   Payment ID: {payment_id}
   After payment, send screenshot here."

   Template 2: Confirmation
   "Thanks! Payment received. Access will be activated within 2 hours."

   Template 3: Rejection
   "Payment not found. Please check UPI ID and try again."
   ```

3. **Manual Process**
   - Monitor WhatsApp for payment messages
   - Verify payments manually
   - Update payment status in admin dashboard

### Option 2: WhatsApp Business API (For larger scale)

1. **Set up Twilio WhatsApp API**
   ```bash
   npm install twilio
   ```

2. **Create webhook endpoint**
   ```javascript
   // api/whatsapp-webhook/route.ts
   import { NextResponse } from 'next/server';
   import twilio from 'twilio';

   const client = twilio(
     process.env.TWILIO_ACCOUNT_SID,
     process.env.TWILIO_AUTH_TOKEN
   );

   export async function POST(request: Request) {
     const formData = await request.formData();
     const message = formData.get('Body');
     const from = formData.get('From');

     // Process incoming WhatsApp message
     // Extract payment proof and update status
     
     return NextResponse.json({ success: true });
   }
   ```

## 🔐 Admin Dashboard Access

### Option 1: Simple Authentication

Add admin check to admin routes:

```javascript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Add your admin authentication logic here
    const isAdmin = checkAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}
```

### Option 2: Firebase Admin Authentication

```javascript
// utils/adminAuth.ts
import { getAuth } from 'firebase-admin/auth';

export async function verifyAdminToken(token: string) {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken.admin === true;
  } catch (error) {
    return false;
  }
}
```

## 🚀 Deployment

### 1. Build and Deploy

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel/Netlify
npm run deploy
```

### 2. Environment Variables in Production

Set these in your hosting platform:

- `WHATSAPP_NUMBER`: Your WhatsApp number
- `UPI_ID`: Your UPI ID
- `RESEND_API_KEY`: For email notifications
- Firebase config variables

## 📊 Usage Flow

### For Users:

1. **Browse Courses/Materials**
   - Visit `/courses` page
   - Select desired product

2. **Initiate Payment**
   - Click "Enroll Now" or "Purchase"
   - WhatsApp payment modal opens
   - Copy UPI ID or scan QR code

3. **Make Payment**
   - Send money to provided UPI ID
   - Take screenshot of payment

4. **Contact WhatsApp**
   - Click "Contact WhatsApp" button
   - Send payment screenshot
   - Include payment ID in message

5. **Wait for Confirmation**
   - Admin verifies payment
   - Access granted automatically
   - Status updates in real-time

### For Admins:

1. **Access Admin Dashboard**
   - Visit `/admin/payments`
   - View all pending payments

2. **Verify Payments**
   - Check WhatsApp for payment screenshots
   - Verify transaction IDs
   - Click "Confirm" or "Reject"

3. **Manage Access**
   - Confirmed payments automatically grant access
   - Users can immediately download materials

## 🔧 Customization

### 1. Update UPI ID

```javascript
// In .env.local
UPI_ID=your_new_upi_id@upi
```

### 2. Customize WhatsApp Messages

```javascript
// In api/payment/route.ts
const whatsappMessage = `Hi! I want to purchase ${productTitle} for ₹${amount}. 
Please provide payment instructions. Payment ID: ${paymentId}`;
```

### 3. Add Payment Gateway Integration

```javascript
// Add Razorpay/PayU integration
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

### 4. Email Notifications

```javascript
// In api/payment/route.ts
if (status === 'confirmed') {
  await sendEmail({
    to: paymentData.userEmail,
    subject: 'Payment Confirmed',
    text: `Your payment for ${paymentData.productTitle} has been confirmed.`
  });
}
```

## 🛡️ Security Considerations

1. **Validate Payment Proofs**
   - Check transaction IDs
   - Verify payment amounts
   - Cross-reference with UPI statements

2. **Rate Limiting**
   ```javascript
   // Add rate limiting to payment API
   import rateLimit from 'express-rate-limit';
   ```

3. **Input Validation**
   ```javascript
   // Validate payment data
   if (!isValidUPIId(upiId)) {
     throw new Error('Invalid UPI ID');
   }
   ```

4. **Admin Authentication**
   - Implement proper admin login
   - Use Firebase Admin SDK
   - Add role-based access control

## 📈 Monitoring & Analytics

### 1. Payment Analytics

```javascript
// Track payment metrics
const analytics = {
  totalPayments: payments.length,
  successRate: confirmedPayments / totalPayments,
  averageAmount: totalAmount / totalPayments,
  popularProducts: getPopularProducts(payments)
};
```

### 2. Error Monitoring

```javascript
// Add error tracking
import * as Sentry from '@sentry/nextjs';

Sentry.captureException(error);
```

## 🆘 Troubleshooting

### Common Issues:

1. **Payment not showing in admin dashboard**
   - Check Firebase permissions
   - Verify collection name is 'payments'
   - Check admin authentication

2. **WhatsApp messages not sending**
   - Verify WhatsApp number format
   - Check WhatsApp Business API setup
   - Test with personal WhatsApp first

3. **Users not getting access after payment**
   - Check UserDataService integration
   - Verify Firebase user document exists
   - Check payment status update logic

### Debug Commands:

```bash
# Check Firebase connection
npm run firebase:test

# Verify environment variables
npm run env:check

# Test WhatsApp integration
npm run whatsapp:test
```

## 📞 Support

For technical support:
- Email: support@legendaryiasmentor.com
- WhatsApp: +91 98765 43210
- Documentation: https://docs.legendaryiasmentor.com

---

**Note**: This system is designed for educational purposes. For production use, consider integrating with official payment gateways like Razorpay, PayU, or Stripe for better security and compliance. 