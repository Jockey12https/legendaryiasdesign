import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

// Payment status types
export type PaymentStatus = 'pending' | 'confirmed' | 'rejected' | 'expired';

// Payment data interface
interface PaymentData {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productTitle: string;
  productType: 'course' | 'material';
  amount: number;
  currency: string;
  upiId: string;
  transactionId?: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  whatsappMessage?: string;
  paymentProof?: string; // URL to payment screenshot
  adminNotes?: string;
}

// Generate unique payment ID
function generatePaymentId(): string {
  return `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create new payment record
export async function POST(request: Request) {
  try {
    console.log('Payment API: Starting POST request');
    
    // Check if Firebase is initialized
    if (!db) {
      console.error('Payment API: Firebase db is not initialized');
      return NextResponse.json(
        { error: 'Firebase not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Payment API: Request body:', body);
    
    const { userId, userEmail, userName, productId, productTitle, productType, amount, currency = 'INR' } = body;

    // Validate required fields
    if (!userId || !userEmail || !userName || !productId || !productTitle || !productType || !amount) {
      console.error('Payment API: Missing required fields', { userId, userEmail, userName, productId, productTitle, productType, amount });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Payment API: All required fields present');

    // Check for existing pending payment for this user and product
    const paymentsRef = collection(db, 'payments');
    const existingQuery = query(
      paymentsRef,
      where('userId', '==', userId),
      where('productId', '==', productId),
      where('productType', '==', productType),
      where('status', '==', 'pending')
    );
    
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      console.log('Payment API: Found existing pending payment, returning it');
      
      // If multiple pending payments exist, clean them up first
      if (existingSnapshot.docs.length > 1) {
        console.log('Payment API: Multiple pending payments found, cleaning up duplicates');
        const payments = existingSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort by creation date and keep only the oldest
        payments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const toRemove = payments.slice(1);
        
        for (const payment of toRemove) {
          try {
            await deleteDoc(doc(db, 'payments', payment.id));
            console.log('Payment API: Removed duplicate payment', payment.id);
          } catch (error) {
            console.error('Payment API: Error removing duplicate payment', payment.id, error);
          }
        }
      }
      
      const existingPayment = existingSnapshot.docs[0].data();
      
      // Generate WhatsApp URL for existing payment
      const whatsappMessage = `Hi! I want to purchase ${existingPayment.productTitle} for ₹${existingPayment.amount}. Please provide payment instructions. Payment ID: ${existingPayment.id}`;
      const whatsappNumber = process.env.WHATSAPP_NUMBER || '919876543210';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      return NextResponse.json({
        success: true,
        paymentId: existingPayment.id,
        whatsappUrl,
        upiId: existingPayment.upiId,
        message: whatsappMessage,
        existing: true
      });
    }

    const paymentId = generatePaymentId();
    const upiId = process.env.UPI_ID || 'legendaryias@upi'; // Default UPI ID

    const paymentData: PaymentData = {
      id: paymentId,
      userId,
      userEmail,
      userName,
      productId,
      productTitle,
      productType,
      amount,
      currency,
      upiId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Payment API: Payment data prepared:', paymentData);

    // Save payment record to Firestore
    try {
      const paymentRef = doc(db, 'payments', paymentId);
      console.log('Payment API: Attempting to save to Firestore');
      await setDoc(paymentRef, paymentData);
      console.log('Payment API: Successfully saved to Firestore');
    } catch (firestoreError) {
      console.error('Payment API: Firestore error:', firestoreError);
      return NextResponse.json(
        { error: 'Failed to save payment to database' },
        { status: 500 }
      );
    }

    // Generate WhatsApp message
    const whatsappMessage = `Hi! I want to purchase ${productTitle} for ₹${amount}. Please provide payment instructions. Payment ID: ${paymentId}`;
    
    // Generate WhatsApp URL
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '919876543210';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    console.log('Payment API: Returning success response');

    return NextResponse.json({
      success: true,
      paymentId,
      whatsappUrl,
      upiId,
      message: whatsappMessage
    });

  } catch (error) {
    console.error('Payment API: Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment record' },
      { status: 500 }
    );
  }
}

// Get payment status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    const userId = searchParams.get('userId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const paymentRef = doc(db, 'payments', paymentId);
    const paymentDoc = await getDoc(paymentRef);

    if (!paymentDoc.exists()) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    const paymentData = paymentDoc.data() as PaymentData;

    // Check if user is authorized to view this payment
    if (userId && paymentData.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: paymentData
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}

// Update payment status (for admin use)
export async function PUT(request: Request) {
  try {
    const { paymentId, status, transactionId, adminNotes } = await request.json();

    // Validate required fields
    if (!paymentId || !status) {
      return NextResponse.json(
        { error: 'Payment ID and status are required' },
        { status: 400 }
      );
    }

    const paymentRef = doc(db, 'payments', paymentId);
    const paymentDoc = await getDoc(paymentRef);

    if (!paymentDoc.exists()) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    const updateData: Partial<PaymentData> = {
      status,
      updatedAt: new Date().toISOString()
    };

    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    await updateDoc(paymentRef, updateData);

    // If payment is confirmed, grant access to the product
    if (status === 'confirmed') {
      const paymentData = paymentDoc.data() as PaymentData;
      
      // Import UserDataService here to avoid circular dependency
      const { UserDataService } = await import('@/utils/userDataService');
      
      if (paymentData.productType === 'course') {
        await UserDataService.enrollInCourse(paymentData.userId, {
          id: paymentData.productId,
          title: paymentData.productTitle,
          type: 'course',
          price: paymentData.amount
        });
      } else if (paymentData.productType === 'material') {
        await UserDataService.purchaseMaterial(paymentData.userId, {
          id: paymentData.productId,
          title: paymentData.productTitle,
          price: paymentData.amount
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully'
    });

  } catch (error) {
    console.error('Payment update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
} 