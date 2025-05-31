"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, CreditCard, TrendingUp, Clock, Award } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const name = user?.firstName || user?.email?.split('@')[0] || 'User';
    const hour = new Date().getHours();
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 18) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case 'faculty':
      case 'content_manager':
        return [
          {
            title: 'Active Courses',
            value: '8',
            description: 'Courses you\'re teaching',
            icon: BookOpen,
            color: 'text-blue-600',
          },
          {
            title: 'Total Students',
            value: '156',
            description: 'Enrolled across all courses',
            icon: Users,
            color: 'text-green-600',
          },
          {
            title: 'Avg. Rating',
            value: '4.8',
            description: 'Student feedback rating',
            icon: Award,
            color: 'text-yellow-600',
          },
          {
            title: 'Hours Taught',
            value: '124',
            description: 'This month',
            icon: Clock,
            color: 'text-purple-600',
          },
        ];
      case 'super_admin':
        return [
          {
            title: 'Total Users',
            value: '1,234',
            description: 'Active platform users',
            icon: Users,
            color: 'text-blue-600',
          },
          {
            title: 'Total Courses',
            value: '45',
            description: 'Available courses',
            icon: BookOpen,
            color: 'text-green-600',
          },
          {
            title: 'Revenue',
            value: '₹2.4L',
            description: 'This month',
            icon: CreditCard,
            color: 'text-yellow-600',
          },
          {
            title: 'Growth',
            value: '+12%',
            description: 'User growth rate',
            icon: TrendingUp,
            color: 'text-purple-600',
          },
        ];
      default: // student
        return [
          {
            title: 'Enrolled Courses',
            value: '3',
            description: 'Active enrollments',
            icon: BookOpen,
            color: 'text-blue-600',
          },
          {
            title: 'Completed',
            value: '12',
            description: 'Lessons completed',
            icon: Award,
            color: 'text-green-600',
          },
          {
            title: 'Study Hours',
            value: '24',
            description: 'This week',
            icon: Clock,
            color: 'text-yellow-600',
          },
          {
            title: 'Progress',
            value: '68%',
            description: 'Overall completion',
            icon: TrendingUp,
            color: 'text-purple-600',
          },
        ];
    }
  };

  const stats = getRoleSpecificStats();

  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your learning dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h2>
          <p className="text-blue-100">
            {user?.role === 'student' 
              ? "Ready to continue your learning journey?" 
              : user?.role === 'super_admin'
              ? "Here's your platform overview."
              : "Ready to inspire and teach today?"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.role === 'student' ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed: Introduction to Economics</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Started: Indian Polity Chapter 3</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Quiz Score: 85% in History</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New student enrolled in Economics</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Course content updated</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Student feedback received</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === 'student' ? 'Continue Learning' : 'Quick Actions'}
              </CardTitle>
              <CardDescription>
                {user?.role === 'student' 
                  ? 'Pick up where you left off' 
                  : 'Common tasks and shortcuts'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user?.role === 'student' ? (
                  <>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium">Indian Polity</p>
                      <p className="text-sm text-muted-foreground">Chapter 3: Fundamental Rights</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium">Modern History</p>
                      <p className="text-sm text-muted-foreground">Freedom Struggle</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium">Create New Course</p>
                      <p className="text-sm text-muted-foreground">Add a new course to the platform</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium">View Student Progress</p>
                      <p className="text-sm text-muted-foreground">Check student performance</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium">Upload Content</p>
                      <p className="text-sm text-muted-foreground">Add new learning materials</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
