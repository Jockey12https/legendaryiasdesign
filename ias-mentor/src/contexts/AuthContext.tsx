"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { 
  addEnrollment, 
  addPurchase, 
  getUserEnrollments, 
  getUserPurchases, 
  getUserActivity,
  migrateLocalStorageToFirebase,
  EnrollmentData,
  PurchaseData
} from '@/utils/firebase-user-data';

// User roles
export type UserRole = 'student' | 'faculty' | 'content_manager' | 'super_admin';

// Extended user interface
export interface ExtendedUser extends User {
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  enrolledCourses?: string[];
  paymentHistory?: string[];
  profileComplete?: boolean;
}

// Auth context interface
interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<ExtendedUser>) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  // User data management
  enrollInCourse: (courseData: Omit<EnrollmentData, 'id' | 'userId'>) => Promise<string>;
  purchaseMaterial: (purchaseData: Omit<PurchaseData, 'id' | 'userId'>) => Promise<string>;
  getUserEnrollments: () => Promise<EnrollmentData[]>;
  getUserPurchases: () => Promise<PurchaseData[]>;
  getUserActivity: () => Promise<(EnrollmentData | PurchaseData)[]>;
  refreshUserData: () => Promise<void>;
}

// Registration data interface
export interface RegisterData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (firebaseUser: User): Promise<ExtendedUser> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data();
      
      return {
        ...firebaseUser,
        role: userData?.role || 'student',
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        phoneNumber: userData?.phoneNumber || '',
        enrolledCourses: userData?.enrolledCourses || [],
        paymentHistory: userData?.paymentHistory || [],
        profileComplete: userData?.profileComplete || false,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {
        ...firebaseUser,
        role: 'student',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        enrolledCourses: [],
        paymentHistory: [],
        profileComplete: false,
      };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const extendedUser = await fetchUserData(result.user);
      setUser(extendedUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, userData: RegisterData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase Auth profile
      await updateProfile(result.user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber || '',
        role: userData.role || 'student',
        enrolledCourses: [],
        paymentHistory: [],
        profileComplete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(result.user);

      const extendedUser = await fetchUserData(result.user);
      setUser(extendedUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // Update user profile function
  const updateUserProfile = async (data: Partial<ExtendedUser>) => {
    if (!user) throw new Error('No user logged in');

    try {
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: new Date(),
      });

      // Update Firebase Auth profile if display name changed
      if (data.firstName || data.lastName) {
        await updateProfile(user, {
          displayName: `${data.firstName || user.firstName} ${data.lastName || user.lastName}`,
        });
      }

      // Update local user state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  };

  // User data management functions
  const enrollInCourse = async (courseData: Omit<EnrollmentData, 'id' | 'userId'>) => {
    if (!user) throw new Error('No user logged in');
    return await addEnrollment({ ...courseData, userId: user.uid });
  };

  const purchaseMaterial = async (purchaseData: Omit<PurchaseData, 'id' | 'userId'>) => {
    if (!user) throw new Error('No user logged in');
    return await addPurchase({ ...purchaseData, userId: user.uid });
  };

  const getUserEnrollmentsData = async () => {
    if (!user) throw new Error('No user logged in');
    return await getUserEnrollments(user.uid);
  };

  const getUserPurchasesData = async () => {
    if (!user) throw new Error('No user logged in');
    return await getUserPurchases(user.uid);
  };

  const getUserActivityData = async () => {
    if (!user) throw new Error('No user logged in');
    return await getUserActivity(user.uid);
  };

  const refreshUserData = async () => {
    if (!user) return;
    const extendedUser = await fetchUserData(user);
    setUser(extendedUser);
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const extendedUser = await fetchUserData(firebaseUser);
        setUser(extendedUser);
        
        // Migrate localStorage data to Firebase if it exists
        try {
          const userKey = `user_${firebaseUser.uid}`;
          const hasLocalEnrollments = localStorage.getItem(`${userKey}_enrolledCourses`);
          const hasLocalPurchases = localStorage.getItem(`${userKey}_purchasedMaterials`);
          
          if (hasLocalEnrollments || hasLocalPurchases) {
            console.log('Migrating localStorage data to Firebase...');
            await migrateLocalStorageToFirebase(firebaseUser.uid);
          }
        } catch (error) {
          console.error('Migration error:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    resendVerificationEmail,
    enrollInCourse,
    purchaseMaterial,
    getUserEnrollments: getUserEnrollmentsData,
    getUserPurchases: getUserPurchasesData,
    getUserActivity: getUserActivityData,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
