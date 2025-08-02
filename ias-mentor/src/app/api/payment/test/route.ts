import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Test Firebase connection
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      collections: snapshot.docs.length
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
} 