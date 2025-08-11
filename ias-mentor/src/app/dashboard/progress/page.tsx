"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar } from 'lucide-react';
import useUserData from '@/hooks/useUserData';
import { useToast } from '@/hooks/use-toast';

interface CourseProgress {
  courseId: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  completedQuizzes: number;
  lastAccessed: string;
  enrolledAt: string;
  category: string;
  duration: string;
  status: 'active' | 'completed' | 'paused';
}

export default function ProgressPage() {
  const { user, loading } = useAuth();
  const { enrolledCourses, loading: dataLoading, error } = useUserData();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  // Generate mock progress data for enrolled courses
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      const progressData: CourseProgress[] = enrolledCourses.map(course => {
        const totalLessons = Math.floor(Math.random() * 20) + 10; // 10-30 lessons
        const completedLessons = Math.floor(Math.random() * totalLessons);
        const totalQuizzes = Math.floor(Math.random() * 8) + 3; // 3-10 quizzes
        const completedQuizzes = Math.floor(Math.random() * totalQuizzes);
        const progressPercentage = Math.floor((completedLessons / totalLessons) * 100);
        
        return {
          courseId: course.id,
          title: course.title,
          totalLessons,
          completedLessons,
          totalQuizzes,
          completedQuizzes,
          lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last week
          enrolledAt: course.enrolledAt,
          category: course.category || 'General',
          duration: course.duration || '3 months',
          status: progressPercentage === 100 ? 'completed' : progressPercentage > 50 ? 'active' : 'paused'
        };
      });

      setCourseProgress(progressData);
      
      // Calculate overall progress
      const totalProgress = progressData.reduce((sum, course) => {
        const courseProgress = (course.completedLessons / course.totalLessons) * 100;
        return sum + courseProgress;
      }, 0);
      setOverallProgress(Math.round(totalProgress / progressData.length));
    }
  }, [enrolledCourses]);

  // Show error toast if data loading fails
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your progress data. Please try refreshing the page.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  }, [error, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'paused':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading || dataLoading) {
    return (
      <DashboardLayout title="Loading..." description="Please wait">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Progress"
      description="Track your learning journey and course completion"
    >
      <div className="space-y-6">
        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {enrolledCourses.length} courses enrolled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courseProgress.filter(c => c.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently learning
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courseProgress.filter(c => c.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Courses finished
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress List */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>
              Detailed progress for each enrolled course
            </CardDescription>
          </CardHeader>
          <CardContent>
            {courseProgress.length > 0 ? (
              <div className="space-y-6">
                {courseProgress.map((course) => {
                  const lessonProgress = (course.completedLessons / course.totalLessons) * 100;
                  const quizProgress = (course.completedQuizzes / course.totalQuizzes) * 100;
                  
                  return (
                    <div key={course.courseId} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(course.status)}
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            {getStatusBadge(course.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {course.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Enrolled {new Date(course.enrolledAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Continue Learning
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Lessons Progress</span>
                            <span>{course.completedLessons}/{course.totalLessons}</span>
                          </div>
                          <Progress value={lessonProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(lessonProgress)}% completed
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Quizzes Progress</span>
                            <span>{course.completedQuizzes}/{course.totalQuizzes}</span>
                          </div>
                          <Progress value={quizProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(quizProgress)}% completed
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                <p className="text-muted-foreground mb-4">
                  Enroll in courses to start tracking your progress
                </p>
                <Button asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Streak */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Streak</CardTitle>
            <CardDescription>
              Maintain consistency in your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-600">7</div>
              <div>
                <p className="font-medium">Current Streak</p>
                <p className="text-sm text-muted-foreground">7 days of consistent learning</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              ))}
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i + 7}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
