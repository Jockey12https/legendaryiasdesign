import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  setDoc,
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'urgent' | 'upsc-update' | 'course-launch' | 'success-story' | 'important-date' | 'study-material';
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
  createdAt?: any;
  expiresAt?: any;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'upsc-update' | 'course-launch' | 'success-story' | 'important-date' | 'study-material';
  priority: 'high' | 'medium' | 'low';
  image?: string;
  publishedAt?: any;
  readTime: string;
  isFeatured: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  batchStartDate: any;
  totalSeats: number;
  seatsRemaining: number;
  successRate: number;
  duration: string;
  price: number;
  originalPrice?: number;
  isSpecialOffer: boolean;
  features: string[];
  category: 'prelims' | 'mains' | 'interview' | 'foundation' | 'test-series';
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: any;
  type: 'upsc-exam' | 'course-start' | 'mock-test' | 'application-deadline' | 'result-date';
  priority: 'high' | 'medium' | 'low';
  isRecurring: boolean;
  recurringPattern?: 'weekly' | 'monthly' | 'yearly';
}

export interface ContentSettings {
  announcementsEnabled: boolean;
  liveUpdatesEnabled: boolean;
  newsSectionEnabled: boolean;
  courseShowcaseEnabled: boolean;
  calendarEnabled: boolean;
}

// Content Management Service
export class ContentManagementService {
  // Announcements
  static async getAnnouncements(): Promise<Announcement[]> {
    try {
      const q = query(
        collection(db, 'announcements'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          expiresAt: doc.data().expiresAt?.toDate()
        }))
        .filter((announcement: any) => announcement.isActive) as Announcement[];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  }

  static async getAllAnnouncements(): Promise<Announcement[]> {
    try {
      const q = query(
        collection(db, 'announcements'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const announcements = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        expiresAt: doc.data().expiresAt?.toDate()
      })) as Announcement[];
      
      console.log('Raw announcements from Firebase:', announcements);
      return announcements;
    } catch (error) {
      console.error('Error fetching all announcements:', error);
      return [];
    }
  }

  static async addAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<string> {
    try {
      console.log('Adding announcement to Firebase:', announcement);
      const docRef = await addDoc(collection(db, 'announcements'), {
        ...announcement,
        createdAt: serverTimestamp(),
        expiresAt: announcement.expiresAt ? Timestamp.fromDate(new Date(announcement.expiresAt)) : null
      });
      console.log('Announcement added successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding announcement:', error);
      throw error;
    }
  }

  static async updateAnnouncement(id: string, announcement: Partial<Announcement>): Promise<void> {
    try {
      const docRef = doc(db, 'announcements', id);
      const updateData: any = { ...announcement };
      
      if (announcement.expiresAt) {
        updateData.expiresAt = Timestamp.fromDate(new Date(announcement.expiresAt));
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  }

  static async deleteAnnouncement(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  }

  // News Items
  static async getNewsItems(): Promise<NewsItem[]> {
    try {
      const q = query(
        collection(db, 'newsItems'),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate()
      })) as NewsItem[];
    } catch (error) {
      console.error('Error fetching news items:', error);
      return [];
    }
  }

  static async addNewsItem(newsItem: Omit<NewsItem, 'id' | 'publishedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'newsItems'), {
        ...newsItem,
        publishedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding news item:', error);
      throw error;
    }
  }

  static async updateNewsItem(id: string, newsItem: Partial<NewsItem>): Promise<void> {
    try {
      const docRef = doc(db, 'newsItems', id);
      await updateDoc(docRef, newsItem);
    } catch (error) {
      console.error('Error updating news item:', error);
      throw error;
    }
  }

  static async deleteNewsItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'newsItems', id));
    } catch (error) {
      console.error('Error deleting news item:', error);
      throw error;
    }
  }

  // Courses
  static async getCourses(): Promise<Course[]> {
    try {
      const q = query(
        collection(db, 'courses'),
        orderBy('batchStartDate', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        batchStartDate: doc.data().batchStartDate?.toDate()
      })) as Course[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  static async addCourse(course: Omit<Course, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'courses'), {
        ...course,
        batchStartDate: Timestamp.fromDate(new Date(course.batchStartDate))
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  }

  static async updateCourse(id: string, course: Partial<Course>): Promise<void> {
    try {
      const docRef = doc(db, 'courses', id);
      const updateData: any = { ...course };
      
      if (course.batchStartDate) {
        updateData.batchStartDate = Timestamp.fromDate(new Date(course.batchStartDate));
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  static async deleteCourse(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  // Calendar Events
  static async getCalendarEvents(): Promise<CalendarEvent[]> {
    try {
      const q = query(
        collection(db, 'calendarEvents'),
        orderBy('date', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate()
      })) as CalendarEvent[];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  static async addCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'calendarEvents'), {
        ...event,
        date: Timestamp.fromDate(new Date(event.date))
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding calendar event:', error);
      throw error;
    }
  }

  static async updateCalendarEvent(id: string, event: Partial<CalendarEvent>): Promise<void> {
    try {
      const docRef = doc(db, 'calendarEvents', id);
      const updateData: any = { ...event };
      
      if (event.date) {
        updateData.date = Timestamp.fromDate(new Date(event.date));
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  }

  static async deleteCalendarEvent(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'calendarEvents', id));
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }

  // Content Settings
  static async getContentSettings(): Promise<ContentSettings> {
    try {
      const docRef = doc(db, 'settings', 'content');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as ContentSettings;
      }
      
      // Return default settings if none exist
      return {
        announcementsEnabled: false,
        liveUpdatesEnabled: false,
        newsSectionEnabled: false,
        courseShowcaseEnabled: false,
        calendarEnabled: false
      };
    } catch (error) {
      console.error('Error fetching content settings:', error);
      return {
        announcementsEnabled: false,
        liveUpdatesEnabled: false,
        newsSectionEnabled: false,
        courseShowcaseEnabled: false,
        calendarEnabled: false
      };
    }
  }

  static async updateContentSettings(settings: ContentSettings): Promise<void> {
    try {
      const docRef = doc(db, 'settings', 'content');
      // Use setDoc with merge option to create or update the document
      await setDoc(docRef, settings, { merge: true });
    } catch (error) {
      console.error('Error updating content settings:', error);
      throw error;
    }
  }
}
