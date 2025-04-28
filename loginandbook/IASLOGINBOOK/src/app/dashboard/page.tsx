'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MainLayout from '@/components/layout/MainLayout';

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 'foundation-program',
    title: 'Foundation Program',
    progress: 35,
    nextClass: '2023-05-15T10:00:00Z',
    instructor: 'Dr. Rahul Sharma',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
  },
  {
    id: 'prelims-test-series',
    title: 'Prelims Test Series',
    progress: 60,
    nextClass: '2023-05-12T14:30:00Z',
    instructor: 'Prof. Ananya Gupta',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
  },
];

// Mock data for study materials
const purchasedMaterials = [
  {
    id: 'current-affairs-may',
    title: 'Current Affairs - May 2023',
    downloadLink: '#',
    size: '15 MB',
    type: 'PDF',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
  },
  {
    id: 'polity-notes',
    title: 'Indian Polity Comprehensive Notes',
    downloadLink: '#',
    size: '28 MB',
    type: 'PDF',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
  },
];

// Mock upcoming tests
const upcomingTests = [
  {
    id: 'test-1',
    title: 'General Studies - Prelims Mock Test 3',
    date: '2023-05-18T09:00:00Z',
    duration: '2 hours',
    status: 'Upcoming',
  },
  {
    id: 'test-2',
    title: 'Current Affairs Weekly Test',
    date: '2023-05-14T16:00:00Z',
    duration: '1 hour',
    status: 'Upcoming',
  },
  {
    id: 'test-3',
    title: 'Indian Economy - Sectional Test',
    date: '2023-05-10T10:30:00Z',
    duration: '1.5 hours',
    status: 'Completed',
    score: '68/100',
  },
];

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null);

  // Simulate checking authentication
  useEffect(() => {
    const checkAuth = async () => {
      // In a real application, you would check if the user is authenticated
      // For now, we'll just simulate a delay and then set a mock user
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authenticated user
      setUser({
        name: 'Rahul Kumar',
        email: 'rahul.kumar@example.com',
      });

      setIsLoading(false);
    };

    checkAuth();
  }, []); // Removed 'router' from the dependency array

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated - use window.location for static export
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Membership Status</h4>
                      <p className="text-sm text-green-600 font-medium">Active</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Joined On</h4>
                      <p className="text-sm text-gray-600">May 1, 2023</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Last Login</h4>
                      <p className="text-sm text-gray-600">Today, 10:30 AM</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="w-full md:w-3/4">
              <Tabs defaultValue="courses">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                  <TabsTrigger value="materials">Study Materials</TabsTrigger>
                  <TabsTrigger value="tests">Tests & Assessments</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>

                  {enrolledCourses.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                        <Button>Browse Courses</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {enrolledCourses.map(course => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="relative h-40 md:h-full">
                              <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="col-span-3 p-6">
                              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Progress</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                      className="bg-primary h-2.5 rounded-full"
                                      style={{ width: `${course.progress}%` }}
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Next Class</p>
                                    <p className="font-medium">
                                      {new Date(course.nextClass).toLocaleDateString()} at {new Date(course.nextClass).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Instructor</p>
                                    <p className="font-medium">{course.instructor}</p>
                                  </div>
                                </div>
                                <div className="pt-2">
                                  <Button>Continue Learning</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Study Materials</h2>

                  {purchasedMaterials.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">You haven't purchased any study materials yet.</p>
                        <Button>Browse Materials</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {purchasedMaterials.map(material => (
                        <Card key={material.id} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="relative h-40 md:h-full">
                              <Image
                                src={material.image}
                                alt={material.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="col-span-2 p-6">
                              <h3 className="text-xl font-bold mb-2">{material.title}</h3>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Type</p>
                                    <p className="font-medium">{material.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Size</p>
                                    <p className="font-medium">{material.size}</p>
                                  </div>
                                </div>
                                <div className="pt-2">
                                  <Button>Download</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tests" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Tests & Assessments</h2>

                  {upcomingTests.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">You don't have any upcoming tests or assessments.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {upcomingTests
                              .filter(test => test.status === 'Upcoming')
                              .map(test => (
                                <div key={test.id} className="p-4 border rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{test.title}</h4>
                                      <p className="text-sm text-gray-500 mt-1">
                                        {new Date(test.date).toLocaleDateString()} at {new Date(test.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">Duration: {test.duration}</p>
                                    </div>
                                    <Button size="sm">Start Test</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Completed Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {upcomingTests
                              .filter(test => test.status === 'Completed')
                              .map(test => (
                                <div key={test.id} className="p-4 border rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{test.title}</h4>
                                      <p className="text-sm text-gray-500 mt-1">
                                        {new Date(test.date).toLocaleDateString()} at {new Date(test.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">Duration: {test.duration}</p>
                                      <p className="text-sm font-medium text-green-600 mt-1">Score: {test.score}</p>
                                    </div>
                                    <Button variant="outline" size="sm">View Results</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
