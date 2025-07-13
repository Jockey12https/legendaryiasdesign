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
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

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
  const { user, loading, enrollInCourse, getUserEnrollments } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (user && getUserEnrollments) {
      loadUserEnrollments();
    } else {
      setEnrolledCourses(new Set());
    }
  }, [user, getUserEnrollments]);

  const loadUserEnrollments = async () => {
    if (!user) return;
    
    setDataLoading(true);
    try {
      const enrolled = await getUserEnrollments();
      setEnrolledCourses(new Set(enrolled.map(course => course.courseId || course.id)));
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleEnrollment = async (course: CourseProps) => {
    if (!user) {
      setAuthModalOpen(true);
      setSuccessMessage('Please sign in to enroll in courses');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    // Check if already enrolled
    if (enrolledCourses.has(course.id)) {
      setSuccessMessage(`You are already enrolled in ${course.title}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    try {
      // Update UI immediately for better UX
      setEnrolledCourses(new Set([...enrolledCourses, course.id]));
      setSuccessMessage(`Successfully enrolled in ${course.title}!`);
      
      // Store in Firebase
      await enrollInCourse({
        courseId: course.id,
        title: course.title,
        description: course.description,
        duration: course.duration,
        type: 'course',
        enrolledAt: new Date(),
        status: 'active',
        progress: 0
      });
      
    } catch (error) {
      console.error('Error enrolling in course:', error);
      // Revert UI update on error
      setEnrolledCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(course.id);
        return newSet;
      });
      setSuccessMessage(`Failed to enroll in ${course.title}. Please try again.`);
    }

    setTimeout(() => setSuccessMessage(''), 3000);
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
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    priority
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
                      onClick={() => course.status === 'Available' && handleEnrollment(course)}
                    >
                      {course.status === 'Available' ? 'Enroll Now' : 'Not Available'}
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
    </MainLayout>
  );
};

export default BookOnlinePage;