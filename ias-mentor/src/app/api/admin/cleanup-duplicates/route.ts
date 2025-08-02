import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    console.log('Cleanup duplicates: Starting cleanup process');

    // Get all payments
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const payments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Cleanup duplicates: Found', payments.length, 'total payments');

    // Group payments by user, product, and type (only pending payments)
    const paymentGroups = new Map<string, any[]>();
    
    // Only consider pending payments for duplicate detection
    const pendingPayments = payments.filter(payment => payment.status === 'pending');
    
    pendingPayments.forEach(payment => {
      const key = `${payment.userId}-${payment.productId}-${payment.productType}`;
      if (!paymentGroups.has(key)) {
        paymentGroups.set(key, []);
      }
      paymentGroups.get(key)!.push(payment);
    });

    // Find groups with duplicates (only pending payments)
    const duplicateGroups = Array.from(paymentGroups.values())
      .filter(group => group.length > 1);

    console.log('Cleanup duplicates: Found', duplicateGroups.length, 'duplicate groups');

    let removedCount = 0;
    const removedPayments: string[] = [];

    // Process each duplicate group
    for (const group of duplicateGroups) {
      // Sort by creation date (oldest first)
      group.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      // Keep the oldest payment, remove the rest
      const toRemove = group.slice(1); // All except the first (oldest)
      
      for (const payment of toRemove) {
        // Since we already filtered for pending payments, all payments in group are pending
        try {
          await deleteDoc(doc(db, 'payments', payment.id));
          removedCount++;
          removedPayments.push(payment.id);
          console.log('Cleanup duplicates: Removed pending payment', payment.id);
        } catch (error) {
          console.error('Cleanup duplicates: Error removing payment', payment.id, error);
        }
      }
    }

    console.log('Cleanup duplicates: Completed. Removed', removedCount, 'duplicate payments');

    return NextResponse.json({
      success: true,
      removedCount,
      removedPayments,
      message: `Successfully removed ${removedCount} duplicate payments`
    });

  } catch (error) {
    console.error('Cleanup duplicates error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup duplicates' },
      { status: 500 }
    );
  }
} 