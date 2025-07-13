import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';

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

interface UserData {
  uid: string;
  enrolledCourses: EnrollmentData[];
  purchasedMaterials: PurchaseData[];
  createdAt: string;
  updatedAt: string;
}

// User data service for managing enrolled courses and purchased materials
export class UserDataService {
  
  // Get user document reference
  static getUserDocRef(userId) {
    return doc(db, 'users', userId);
  }

  // Clean data to remove undefined values
  private static cleanData<T>(data: T): T {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === undefined) {
        cleaned[key] = null;
      }
    });
    return cleaned;
  }

  // Initialize user document if it doesn't exist
  static async initializeUser(userId: string, userData: Partial<UserData> = {}): Promise<UserData> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        const newUserData: UserData = {
          uid: userId,
          enrolledCourses: [],
          purchasedMaterials: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...userData
        };
        await setDoc(userRef, newUserData);
        return newUserData;
      }
      
      return userDoc.data() as UserData;
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    }
  }

  // Get user data (enrolled courses and purchased materials)
  static async getUserData(userId: string): Promise<UserData> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      } else {
        // Initialize user if document doesn't exist
        return await this.initializeUser(userId);
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  }

  // Enroll user in a course
  static async enrollInCourse(userId: string, courseData: CourseData): Promise<EnrollmentData> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await this.initializeUser(userId);
      }
      
      // Check if already enrolled to prevent duplicates
      const existingData = userDoc.data() as UserData;
      const isAlreadyEnrolled = existingData.enrolledCourses?.some(course => course.id === courseData.id);
      if (isAlreadyEnrolled) {
        throw new Error('User is already enrolled in this course');
      }
      
      const enrollmentData: EnrollmentData = {
        id: courseData.id,
        title: courseData.title,
        type: courseData.type || 'course',
        enrolledAt: new Date().toISOString(),
        userId: userId,
        price: courseData.price || null,
        duration: courseData.duration || null,
        category: courseData.category || null,
        status: 'active'
      };
      
      // Clean the data to ensure no undefined values
      const cleanedEnrollmentData = this.cleanData(enrollmentData);
      
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(cleanedEnrollmentData),
        updatedAt: new Date().toISOString()
      });
      
      return enrollmentData;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  }

  // Purchase study material
  static async purchaseMaterial(userId: string, materialData: MaterialData): Promise<PurchaseData> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await this.initializeUser(userId);
      }
      
      // Check if already purchased to prevent duplicates
      const existingData = userDoc.data() as UserData;
      const isAlreadyPurchased = existingData.purchasedMaterials?.some(material => material.id === materialData.id);
      if (isAlreadyPurchased) {
        throw new Error('User has already purchased this material');
      }
      
      const purchaseData: PurchaseData = {
        id: materialData.id,
        title: materialData.title,
        type: 'material',
        purchasedAt: new Date().toISOString(),
        userId: userId,
        price: materialData.price || null,
        category: materialData.category || null,
        description: materialData.description || null,
        fileType: materialData.fileType || null,
        fileSize: materialData.fileSize || null,
        downloadUrl: materialData.downloadUrl || null,
        previewUrl: materialData.previewUrl || null,
        author: materialData.author || null,
        version: materialData.version || null,
        tags: materialData.tags || null,
        downloadCount: 0,
        lastDownloadedAt: null,
        status: 'active'
      };
      
      // Clean the data to ensure no undefined values
      const cleanedPurchaseData = this.cleanData(purchaseData);
      
      await updateDoc(userRef, {
        purchasedMaterials: arrayUnion(cleanedPurchaseData),
        updatedAt: new Date().toISOString()
      });
      
      return purchaseData;
    } catch (error) {
      console.error('Error purchasing material:', error);
      throw error;
    }
  }

  // Check if user is enrolled in a course
  static async isEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
    try {
      const userData = await this.getUserData(userId);
      return userData.enrolledCourses?.some(course => course.id === courseId) || false;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }

  // Check if user has purchased a material
  static async hasPurchasedMaterial(userId: string, materialId: string): Promise<boolean> {
    try {
      const userData = await this.getUserData(userId);
      return userData.purchasedMaterials?.some(material => material.id === materialId) || false;
    } catch (error) {
      console.error('Error checking purchase:', error);
      return false;
    }
  }

  // Get user's enrolled courses
  static async getEnrolledCourses(userId: string): Promise<EnrollmentData[]> {
    try {
      const userData = await this.getUserData(userId);
      const courses = userData.enrolledCourses || [];
      // Filter out invalid courses and remove duplicates
      const validCourses = courses.filter(course => course && course.id && course.title);
      // Remove duplicates based on id
      const uniqueCourses = validCourses.filter((course, index, self) => 
        index === self.findIndex(c => c.id === course.id)
      );
      return uniqueCourses;
    } catch (error) {
      console.error('Error getting enrolled courses:', error);
      return [];
    }
  }

  // Get user's purchased materials
  static async getPurchasedMaterials(userId: string): Promise<PurchaseData[]> {
    try {
      const userData = await this.getUserData(userId);
      const materials = userData.purchasedMaterials || [];
      // Filter out invalid materials and remove duplicates
      const validMaterials = materials.filter(material => material && material.id && material.title);
      // Remove duplicates based on id
      const uniqueMaterials = validMaterials.filter((material, index, self) => 
        index === self.findIndex(m => m.id === material.id)
      );
      return uniqueMaterials;
    } catch (error) {
      console.error('Error getting purchased materials:', error);
      return [];
    }
  }

  // Record material download
  static async recordMaterialDownload(userId: string, materialId: string): Promise<void> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userData = await this.getUserData(userId);
      
      const updatedMaterials = userData.purchasedMaterials.map(material => {
        if (material.id === materialId) {
          return {
            ...material,
            downloadCount: (material.downloadCount || 0) + 1,
            lastDownloadedAt: new Date().toISOString()
          };
        }
        return material;
      });
      
      await updateDoc(userRef, {
        purchasedMaterials: updatedMaterials,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error recording material download:', error);
      throw error;
    }
  }

  // Get material by ID
  static async getMaterialById(userId: string, materialId: string): Promise<PurchaseData | null> {
    try {
      const userData = await this.getUserData(userId);
      const material = userData.purchasedMaterials?.find(m => m.id === materialId);
      return material || null;
    } catch (error) {
      console.error('Error getting material by ID:', error);
      return null;
    }
  }

  // Get user's recent activity (combined enrolled courses and purchased materials)
  static async getRecentActivity(userId: string, limit: number = 10): Promise<(EnrollmentData | PurchaseData)[]> {
    try {
      const userData = await this.getUserData(userId);
      const enrolledCourses = userData.enrolledCourses || [];
      const purchasedMaterials = userData.purchasedMaterials || [];
      
      const activity = [...enrolledCourses, ...purchasedMaterials]
        .filter(item => item && item.id && item.title && item.type) // Filter out invalid items
        .filter((item, index, self) => 
          // Remove duplicates based on id and type combination
          index === self.findIndex(i => i.id === item.id && i.type === item.type)
        )
        .sort((a, b) => {
          const dateA = new Date(a.enrolledAt || a.purchasedAt);
          const dateB = new Date(b.enrolledAt || b.purchasedAt);
          return dateB - dateA;
        })
        .slice(0, limit);
      
      return activity;
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }

  // Migrate data from localStorage to Firebase (for existing users)
  static async migrateFromLocalStorage(userId: string): Promise<void> {
    try {
      const userKey = `user_${userId}`;
      const enrolledCourses = JSON.parse(localStorage.getItem(`${userKey}_enrolledCourses`) || '[]');
      const purchasedMaterials = JSON.parse(localStorage.getItem(`${userKey}_purchasedMaterials`) || '[]');
      
      if (enrolledCourses.length > 0 || purchasedMaterials.length > 0) {
        const userRef = this.getUserDocRef(userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          await this.initializeUser(userId);
        }
        
        // Add enrolled courses to Firebase
        for (const course of enrolledCourses) {
          // Validate course data before migrating
          if (course && course.id && course.title) {
            // Clean the course data before enrolling
            const cleanedCourse = this.cleanData(course);
            await this.enrollInCourse(userId, cleanedCourse);
          }
        }
        
        // Add purchased materials to Firebase
        for (const material of purchasedMaterials) {
          // Validate material data before migrating
          if (material && material.id && material.title) {
            // Clean the material data before purchasing
            const cleanedMaterial = this.cleanData(material);
            await this.purchaseMaterial(userId, cleanedMaterial);
          }
        }
        
        // Clear localStorage after successful migration
        localStorage.removeItem(`${userKey}_enrolledCourses`);
        localStorage.removeItem(`${userKey}_purchasedMaterials`);
        
        console.log('Successfully migrated user data from localStorage to Firebase');
      }
    } catch (error) {
      console.error('Error migrating from localStorage:', error);
      throw error;
    }
  }
}

export default UserDataService; 