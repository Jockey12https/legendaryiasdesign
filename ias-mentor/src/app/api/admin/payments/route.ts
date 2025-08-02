import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    // In a real application, you would verify admin authentication here
    // For now, we'll allow access to all payments
    
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const payments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      payments
    });

  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
} 