'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Download, Play, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserDataService from '@/utils/userDataService';

export default function MyCoursesPage() {
  const { user, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [purchasedMaterials, setPurchasedMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setDataLoading(true);
        try {
          // Migrate data from localStorage to Firebase if needed
          await UserDataService.migrateFromLocalStorage(user.uid);
          
          // Load user data from Firebase
          const [enrolled, purchased] = await Promise.all([
            UserDataService.getEnrolledCourses(user.uid),
            UserDataService.getPurchasedMaterials(user.uid)
          ]);
          
          setEnrolledCourses(enrolled);
          setPurchasedMaterials(purchased);
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setDataLoading(false);
        }
      } else {
        // Clear state for non-authenticated users
        setEnrolledCourses([]);
        setPurchasedMaterials([]);
      }
    };

    loadUserData();
  }, [user]);

  const getStatusBadge = (enrolledDate) => {
    const daysSinceEnrollment = Math.floor((new Date() - new Date(enrolledDate)) / (1000 * 60 * 60 * 24));
    
    if (daysSinceEnrollment === 0) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>;
    } else if (daysSinceEnrollment < 7) {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Ongoing</Badge>;
    }
  };

  const getRandomProgress = () => {
    return Math.floor(Math.random() * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBrowseClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      window.location.href = '/courses';
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600">Track your enrolled courses and study materials</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Materials</p>
                <p className="text-2xl font-bold">{purchasedMaterials.length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{enrolledCourses.length + purchasedMaterials.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="courses">Courses ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="materials">Study Materials ({purchasedMaterials.length})</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          {!user ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Please sign in to view your courses</h3>
                <p className="text-gray-600 mb-4">Sign in to access your enrolled courses and track your progress</p>
                <Button onClick={() => setAuthModalOpen(true)}>
                  Sign In
                </Button>
              </CardContent>
            </Card>
          ) : enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Start your learning journey by enrolling in our courses</p>
                <Button onClick={handleBrowseClick}>
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.filter(course => course && course.id).map((course, index) => {
                const progress = getRandomProgress();
                return (
                  <Card key={`course-${course.id}-${index}`} className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <BookOpen className="h-12 w-12 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">{course.title}</h3>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        {getStatusBadge(course.enrolledAt)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Enrolled: {formatDate(course.enrolledAt)}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Materials
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Study Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          {!user ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Please sign in to view your materials</h3>
                <p className="text-gray-600 mb-4">Sign in to access your purchased study materials</p>
                <Button onClick={() => setAuthModalOpen(true)}>
                  Sign In
                </Button>
              </CardContent>
            </Card>
          ) : purchasedMaterials.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No study materials purchased yet</h3>
                <p className="text-gray-600 mb-4">Enhance your learning with our comprehensive study materials</p>
                <Button onClick={handleBrowseClick}>
                  Browse Materials
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedMaterials.filter(material => material && material.id).map((material, index) => (
                <Card key={`material-${material.id}-${index}`} className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <FileText className="h-12 w-12 mx-auto mb-2" />
                      <h3 className="text-lg font-bold">{material.title}</h3>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Purchased
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Purchased: {formatDate(material.purchasedAt)}
                      </div>
                      
                      <div className="flex gap-2">
                        {material.downloadUrl && (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(material.downloadUrl, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {material.previewUrl && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => window.open(material.previewUrl, '_blank')}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                        {!material.downloadUrl && !material.previewUrl && (
                          <Button size="sm" className="flex-1" disabled>
                            <FileText className="h-4 w-4 mr-2" />
                            No URL Available
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Recent Activity - Only show for authenticated users */}
      {user && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...enrolledCourses, ...purchasedMaterials]
                .filter(item => item && item.id && item.type) // Filter out invalid items
                .sort((a, b) => new Date(b.enrolledAt || b.purchasedAt) - new Date(a.enrolledAt || a.purchasedAt))
                .slice(0, 5)
                .map((item, index) => (
                  <div key={`activity-${item.type}-${item.id}-${item.enrolledAt || item.purchasedAt}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {item.type === 'material' ? (
                        <FileText className="h-5 w-5 mr-3 text-green-600" />
                      ) : (
                        <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.type === 'material' ? 'Purchased' : 'Enrolled'} on {formatDate(item.purchasedAt || item.enrolledAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {item.type === 'material' ? 'Material' : 'Course'}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}