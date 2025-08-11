import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Query payments for the specific user
    const paymentsRef = collection(db, 'payments');
    
    try {
      // Try with orderBy first (requires composite index)
      const q = query(
        paymentsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const payments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return NextResponse.json({
        success: true,
        payments
      });
    } catch (indexError: any) {
      // If index doesn't exist, fall back to simple query and sort in memory
      if (indexError.code === 'failed-precondition') {
        console.log('Composite index not found, falling back to simple query');
        
        const q = query(
          paymentsRef,
          where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        
        const payments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a: any, b: any) => {
          // Sort by createdAt in descending order
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });

        return NextResponse.json({
          success: true,
          payments
        });
      } else {
        throw indexError;
      }
    }

  } catch (error) {
    console.error('Error fetching user payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
