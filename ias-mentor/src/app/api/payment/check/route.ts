import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId');
    const productType = searchParams.get('productType');

    if (!userId || !productId || !productType) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    console.log('Payment check: Looking for existing payment', { userId, productId, productType });

    // Query for existing pending payments for this user and product
    const paymentsRef = collection(db, 'payments');
    const q = query(
      paymentsRef,
      where('userId', '==', userId),
      where('productId', '==', productId),
      where('productType', '==', productType),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Return the most recent pending payment
      const paymentDoc = querySnapshot.docs[0];
      const paymentData = paymentDoc.data();
      
      console.log('Payment check: Found existing payment', paymentData.id);
      
      // Generate WhatsApp URL for the existing payment
      const whatsappMessage = `Hi! I want to purchase ${paymentData.productTitle} for ₹${paymentData.amount}. Please provide payment instructions. Payment ID: ${paymentData.id}`;
      const whatsappNumber = process.env.WHATSAPP_NUMBER || '919876543210';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      return NextResponse.json({
        success: true,
        payment: {
          ...paymentData,
          whatsappUrl
        }
      });
    }

    console.log('Payment check: No existing payment found');
    return NextResponse.json({
      success: true,
      payment: null
    });

  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 