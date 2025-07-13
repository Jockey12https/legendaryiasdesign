import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  Timestamp,
  updateDoc,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Types for enrollment and purchase data
export interface EnrollmentData {
  id?: string;
  userId: string;
  courseId: string;
  title: string;
  description?: string;
  instructor?: string;
  duration?: string;
  level?: string;
  type: 'course';
  enrolledAt: Date;
  status: 'active' | 'completed' | 'paused';
  progress?: number;
}

export interface PurchaseData {
  id?: string;
  userId: string;
  materialId: string;
  title: string;
  description?: string;
  price?: number;
  type: 'material';
  purchasedAt: Date;
  downloadUrl?: string;
  accessed?: boolean;
}

// Enrollment functions
export const addEnrollment = async (enrollmentData: Omit<EnrollmentData, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'enrollments'), {
      ...enrollmentData,
      enrolledAt: Timestamp.fromDate(enrollmentData.enrolledAt),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding enrollment:', error);
    throw error;
  }
};

export const getUserEnrollments = async (userId: string): Promise<EnrollmentData[]> => {
  try {
    const q = query(collection(db, 'enrollments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
      enrolledAt: doc.data().enrolledAt.toDate(),
    })) as EnrollmentData[];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
};

export const removeEnrollment = async (enrollmentId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'enrollments', enrollmentId));
  } catch (error) {
    console.error('Error removing enrollment:', error);
    throw error;
  }
};

export const updateEnrollmentProgress = async (enrollmentId: string, progress: number): Promise<void> => {
  try {
    await updateDoc(doc(db, 'enrollments', enrollmentId), {
      progress,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating enrollment progress:', error);
    throw error;
  }
};

// Purchase functions
export const addPurchase = async (purchaseData: Omit<PurchaseData, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'purchases'), {
      ...purchaseData,
      purchasedAt: Timestamp.fromDate(purchaseData.purchasedAt),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding purchase:', error);
    throw error;
  }
};

export const getUserPurchases = async (userId: string): Promise<PurchaseData[]> => {
  try {
    const q = query(collection(db, 'purchases'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
      purchasedAt: doc.data().purchasedAt.toDate(),
    })) as PurchaseData[];
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw error;
  }
};

export const removePurchase = async (purchaseId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'purchases', purchaseId));
  } catch (error) {
    console.error('Error removing purchase:', error);
    throw error;
  }
};

export const markPurchaseAsAccessed = async (purchaseId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'purchases', purchaseId), {
      accessed: true,
      lastAccessedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error marking purchase as accessed:', error);
    throw error;
  }
};

// Combined user data functions
export const getUserActivity = async (userId: string): Promise<(EnrollmentData | PurchaseData)[]> => {
  try {
    const [enrollments, purchases] = await Promise.all([
      getUserEnrollments(userId),
      getUserPurchases(userId)
    ]);
    
    const combined = [...enrollments, ...purchases];
    return combined.sort((a, b) => {
      const dateA = 'enrolledAt' in a ? a.enrolledAt : a.purchasedAt;
      const dateB = 'enrolledAt' in b ? b.enrolledAt : b.purchasedAt;
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

// Migration function to move localStorage data to Firebase
export const migrateLocalStorageToFirebase = async (userId: string): Promise<void> => {
  try {
    const userKey = `user_${userId}`;
    
    // Migrate enrolled courses
    const localEnrollments = JSON.parse(localStorage.getItem(`${userKey}_enrolledCourses`) || '[]');
    for (const enrollment of localEnrollments) {
      try {
        await addEnrollment({
          userId,
          courseId: enrollment.id,
          title: enrollment.title,
          description: enrollment.description,
          instructor: enrollment.instructor,
          duration: enrollment.duration,
          level: enrollment.level,
          type: 'course',
          enrolledAt: new Date(enrollment.enrolledAt),
          status: 'active',
          progress: enrollment.progress || 0
        });
      } catch (error) {
        console.warn('Error migrating enrollment:', enrollment.title, error);
      }
    }
    
    // Migrate purchased materials
    const localPurchases = JSON.parse(localStorage.getItem(`${userKey}_purchasedMaterials`) || '[]');
    for (const purchase of localPurchases) {
      try {
        await addPurchase({
          userId,
          materialId: purchase.id,
          title: purchase.title,
          description: purchase.description,
          price: purchase.price,
          type: 'material',
          purchasedAt: new Date(purchase.purchasedAt),
          downloadUrl: purchase.downloadUrl,
          accessed: purchase.accessed || false
        });
      } catch (error) {
        console.warn('Error migrating purchase:', purchase.title, error);
      }
    }
    
    // Clear localStorage after successful migration
    localStorage.removeItem(`${userKey}_enrolledCourses`);
    localStorage.removeItem(`${userKey}_purchasedMaterials`);
    
    console.log('Successfully migrated localStorage data to Firebase');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};