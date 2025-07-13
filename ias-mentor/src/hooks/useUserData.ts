import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserDataService from '@/utils/userDataService';

// TypeScript interfaces
interface CourseData {
  id: string;
  title: string;
  type?: string;
  price?: number;
  duration?: string;
  category?: string;
}

interface MaterialData {
  id: string;
  title: string;
  price?: number;
  category?: string;
  description?: string;
  fileType?: string;
  fileSize?: string;
  downloadUrl?: string;
  previewUrl?: string;
  author?: string;
  version?: string;
  tags?: string[];
}

interface EnrollmentData {
  id: string;
  title: string;
  type: string;
  enrolledAt: string;
  userId: string;
  price?: number;
  duration?: string;
  category?: string;
  status: string;
}

interface PurchaseData {
  id: string;
  title: string;
  type: string;
  purchasedAt: string;
  userId: string;
  price: number | null;
  category: string | null;
  description: string | null;
  fileType: string | null;
  fileSize: string | null;
  downloadUrl: string | null;
  previewUrl: string | null;
  author: string | null;
  version: string | null;
  tags: string[] | null;
  downloadCount: number;
  lastDownloadedAt: string | null;
  status: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrollmentData[]>([]);
  const [purchasedMaterials, setPurchasedMaterials] = useState<PurchaseData[]>([]);
  const [recentActivity, setRecentActivity] = useState<(EnrollmentData | PurchaseData)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data from Firebase
  const loadUserData = async () => {
    if (!user) {
      setEnrolledCourses([]);
      setPurchasedMaterials([]);
      setRecentActivity([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Migrate data from localStorage to Firebase if needed
      await UserDataService.migrateFromLocalStorage(user.uid);
      
      // Load all user data in parallel
      const [enrolled, purchased, activity] = await Promise.all([
        UserDataService.getEnrolledCourses(user.uid),
        UserDataService.getPurchasedMaterials(user.uid),
        UserDataService.getRecentActivity(user.uid, 10)
      ]);
      
      setEnrolledCourses(enrolled);
      setPurchasedMaterials(purchased);
      setRecentActivity(activity);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Enroll in a course
  const enrollInCourse = async (courseData: CourseData): Promise<EnrollmentData> => {
    if (!user) {
      throw new Error('User must be logged in to enroll in courses');
    }

    try {
      const enrollment = await UserDataService.enrollInCourse(user.uid, courseData);
      
      // Update local state
      setEnrolledCourses(prev => [...prev, enrollment]);
      
      // Update recent activity
      setRecentActivity(prev => [enrollment, ...prev.slice(0, 9)]);
      
      return enrollment;
    } catch (err) {
      console.error('Error enrolling in course:', err);
      throw err;
    }
  };

  // Purchase a material
  const purchaseMaterial = async (materialData: MaterialData): Promise<PurchaseData> => {
    if (!user) {
      throw new Error('User must be logged in to purchase materials');
    }

    try {
      const purchase = await UserDataService.purchaseMaterial(user.uid, materialData);
      
      // Update local state
      setPurchasedMaterials(prev => [...prev, purchase]);
      
      // Update recent activity
      setRecentActivity(prev => [purchase, ...prev.slice(0, 9)]);
      
      return purchase;
    } catch (err) {
      console.error('Error purchasing material:', err);
      throw err;
    }
  };

  // Check if user is enrolled in a course
  const isEnrolledInCourse = (courseId: string): boolean => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  // Check if user has purchased a material
  const hasPurchasedMaterial = (materialId: string): boolean => {
    return purchasedMaterials.some(material => material.id === materialId);
  };

  // Record material download
  const recordMaterialDownload = async (materialId: string): Promise<void> => {
    if (!user) {
      throw new Error('User must be logged in to download materials');
    }

    try {
      await UserDataService.recordMaterialDownload(user.uid, materialId);
      
      // Update local state
      setPurchasedMaterials(prev => prev.map(material => {
        if (material.id === materialId) {
          return {
            ...material,
            downloadCount: (material.downloadCount || 0) + 1,
            lastDownloadedAt: new Date().toISOString()
          };
        }
        return material;
      }));
    } catch (err) {
      console.error('Error recording material download:', err);
      throw err;
    }
  };

  // Get material by ID
  const getMaterialById = (materialId: string): PurchaseData | null => {
    return purchasedMaterials.find(material => material.id === materialId) || null;
  };

  // Refresh user data
  const refreshData = () => {
    loadUserData();
  };

  // Load data when user changes
  useEffect(() => {
    loadUserData();
  }, [user]);

  return {
    enrolledCourses,
    purchasedMaterials,
    recentActivity,
    loading,
    error,
    enrollInCourse,
    purchaseMaterial,
    isEnrolledInCourse,
    hasPurchasedMaterial,
    recordMaterialDownload,
    getMaterialById,
    refreshData
  };
};

export default useUserData; 