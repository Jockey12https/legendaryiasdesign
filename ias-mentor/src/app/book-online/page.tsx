"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import WhatsAppPaymentModal from '@/components/payment/WhatsAppPaymentModal';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import UserDataService from '@/utils/userDataService';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface CourseProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  status: 'Available' | 'Ended' | 'Coming Soon';
  duration: string;
  category: string;
}

const courses: CourseProps[] = [
  {
    id: 'ias-foundation',
    title: 'IAS Foundation Program',
    description: 'Comprehensive preparation course for Civil Services with focus on prelims and mains.',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    price: 15000,
    status: 'Available',
    duration: '12 months',
    category: 'foundation'
  },
  {
    id: 'optional-subject',
    title: 'Optional Subject Coaching',
    description: 'Specialized coaching for optional subjects with experienced faculty members.',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
    price: 8000,
    status: 'Available',
    duration: '6 months',
    category: 'optional'
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    description: 'Comprehensive interview preparation with mock interviews and personalized feedback.',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    price: 5000,
    status: 'Available',
    duration: '2 months',
    category: 'interview'
  },
  {
    id: 'test-series',
    title: 'Test Series',
    description: 'Comprehensive test series for prelims and mains with detailed analysis and feedback.',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
    price: 3000,
    status: 'Available',
    duration: '4 months',
    category: 'test-series'
  },
  {
    id: 'current-affairs',
    title: 'Current Affairs Program',
    description: 'Stay updated with daily current affairs analysis and monthly compilations.',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    price: 2000,
    status: 'Available',
    duration: '1 year',
    category: 'current-affairs'
  },
  {
    id: 'csat-prep',
    title: 'CSAT Preparation',
    description: 'Focused preparation for CSAT with practice tests and problem-solving techniques.',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    price: 4000,
    status: 'Coming Soon',
    duration: '3 months',
    category: 'csat'
  }
];

const BookOnlinePage = () => {
  const { user, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseProps | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Dynamic data from Firebase
  const [dynamicBookOnlineCourses, setDynamicBookOnlineCourses] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Load dynamic data from Firebase
  const loadDynamicData = async () => {
    try {
      setLoadingData(true);
      
      // Load book online courses from Firebase
      const bookOnlineQuery = query(collection(db, "bookOnlineCourses"), orderBy("createdAt", "desc"));
      const bookOnlineSnapshot = await getDocs(bookOnlineQuery);
      const bookOnlineData = bookOnlineSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        image: doc.data().image || 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
        price: parseInt(doc.data().fees?.replace(/[^\d]/g, '') || '0'),
        status: 'Available' as const,
        duration: doc.data().duration,
        category: 'foundation'
      }));
      setDynamicBookOnlineCourses(bookOnlineData);

    } catch (error) {
      console.error("Error loading dynamic data:", error);
      // Set empty array on error to prevent undefined issues
      setDynamicBookOnlineCourses([]);
    } finally {
      setLoadingData(false);
    }
  };

  // Combine static and dynamic data (with fallback to empty array)
  const allBookOnlineCourses = [...courses, ...(dynamicBookOnlineCourses || [])];

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          // Migrate data from localStorage to Firebase if needed
          await UserDataService.migrateFromLocalStorage(user.uid);
          
          // Load enrolled courses from Firebase
          const enrolled = await UserDataService.getEnrolledCourses(user.uid);
          setEnrolledCourses(new Set(enrolled.map((course: any) => course.id)));
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setEnrolledCourses(new Set());
      }
    };

    loadUserData();
    loadDynamicData();
  }, [user]);

  const handlePurchase = (course: CourseProps) => {
    if (!user) {
      setAuthModalOpen(true);
      setSuccessMessage('Please sign in to purchase courses');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    // Check if already enrolled
    if (enrolledCourses.has(course.id)) {
      setSuccessMessage('You are already enrolled in this course!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    setSelectedCourse(course);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    if (selectedCourse && user) {
      try {
        // Enroll in course via Firebase
        await UserDataService.enrollInCourse(user.uid, {
          id: selectedCourse.id,
          title: selectedCourse.title,
          type: 'course',
          price: selectedCourse.price,
          duration: selectedCourse.duration,
          category: selectedCourse.category
        });

        setEnrolledCourses(new Set([...enrolledCourses, selectedCourse.id]));
        setSuccessMessage(`Successfully enrolled in ${selectedCourse.title}!`);
        setPaymentModalOpen(false);
        setSelectedCourse(null);
      } catch (error) {
        console.error('Error enrolling in course:', error);
        setSuccessMessage('Failed to enroll in course. Please try again.');
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-10 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-6">Our Services</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choose from our comprehensive range of UPSC preparation programs designed to help you succeed in the civil services examinations.
          </p>

          {successMessage && (
            <div className="fixed top-4 right-4 z-50">
              <div className={`px-4 py-2 rounded-md ${
                successMessage.includes('log in') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {successMessage}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBookOnlineCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                                     <Image
                     src={course.image || 'https://ext.same-assets.com/1137026266/2875867135.jpeg'}
                     alt={course.title}
                     fill
                     className="object-cover"
                     priority
                     onError={(e) => {
                       // Fallback for Next.js Image component
                       const imgElement = e.currentTarget as HTMLImageElement;
                       imgElement.src = 'https://ext.same-assets.com/1137026266/2875867135.jpeg';
                     }}
                   />
                  {course.status !== 'Available' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {course.status === 'Coming Soon' ? 'Coming Soon' : 'Enrollment Ended'}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      {course.category.replace('-', ' ')}
                    </Badge>
                    <div className="text-lg font-medium">
                      ₹{course.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration: {course.duration}
                  </div>
                </CardContent>
                <CardFooter>
                  {enrolledCourses.has(course.id) ? (
                    <Button className="w-full" variant="outline" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enrolled
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant={course.status === 'Available' ? 'default' : 'outline'} 
                      disabled={course.status !== 'Available'}
                      onClick={() => course.status === 'Available' && handlePurchase(course)}
                    >
                      {course.status === 'Available' ? 'Purchase' : 'Not Available'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
      />

      {selectedCourse && (
        <WhatsAppPaymentModal
          isOpen={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false);
            setSelectedCourse(null);
          }}
          product={{
            id: selectedCourse.id,
            title: selectedCourse.title,
            price: selectedCourse.price,
            type: 'course',
            description: selectedCourse.description,
            duration: selectedCourse.duration,
            category: selectedCourse.category
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </MainLayout>
  );
};

export default BookOnlinePage;