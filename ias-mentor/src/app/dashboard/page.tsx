"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, CreditCard, TrendingUp, Clock, Award, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
//import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
//import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [purchasedMaterials, setPurchasedMaterials] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [subject, setSubject] = useState('Course Inquiry from Student');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // Load user-specific data from localStorage
      const userKey = `user_${user.uid}`;
      const enrolled = JSON.parse(localStorage.getItem(`${userKey}_enrolledCourses`) || '[]');
      const purchased = JSON.parse(localStorage.getItem(`${userKey}_purchasedMaterials`) || '[]');
      
      setEnrolledCourses(enrolled);
      setPurchasedMaterials(purchased);
      
      // Generate recent activity by combining both and sorting by date
      const activity = [...enrolled, ...purchased]
        .sort((a, b) => new Date(b.enrolledAt || b.purchasedAt) - new Date(a.enrolledAt || a.purchasedAt))
        .slice(0, 3);
      setRecentActivity(activity);

      // Pre-fill message with enrolled courses if any
      if (enrolled.length > 0) {
        setMessage(`Dear Admin,\n\nI am currently enrolled in these courses:\n${enrolled.map(c => `- ${c.title}`).join('\n')}\n\nI would like to inquire about:\n`);
      } else {
        setMessage(`Dear Admin,\n\nI am interested in learning more about the following courses:\n`);
      }
    }
  }, [user]);

  const getWelcomeMessage = () => {
    if (!user) return "Welcome to your dashboard!";
    const name = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
    const hour = new Date().getHours();
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 18) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  const getRoleSpecificStats = () => {
    if (!user) {
      return [
        {
          title: 'Enrolled Courses',
          value: '0',
          description: 'Sign in to view your courses',
          icon: BookOpen,
          color: 'text-blue-600',
        },
        {
          title: 'Study Materials',
          value: '0',
          description: 'Sign in to access materials',
          icon: Award,
          color: 'text-green-600',
        }
      ];
    }

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
            value: enrolledCourses.length,
            description: 'Active enrollments',
            icon: BookOpen,
            color: 'text-blue-600',
          },
          {
            title: 'Study Materials',
            value: purchasedMaterials.length,
            description: 'Purchased resources',
            icon: Award,
            color: 'text-green-600',
          },
          {
            title: 'Progress',
            value: `${Math.floor(Math.random() * 100)}%`,
            description: 'Overall completion',
            icon: TrendingUp,
            color: 'text-yellow-600',
          },
          {
            title: 'Recent Activity',
            value: recentActivity.length,
            description: 'Latest interactions',
            icon: Clock,
            color: 'text-purple-600',
          },
        ];
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'admin@legendaryiasmentor.com',
          from: user?.email || 'anonymous@student.com',
          subject: subject,
          text: `${message}\n\n---\nSent from Legendary IAS Mentor Dashboard\nUser: ${user?.email || 'Not signed in'}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Message Sent',
          description: 'Your inquiry has been sent to the admin team',
          duration: 5000,
        });
        setSubject('Course Inquiry from Student');
        setMessage(`Dear Admin,\n\nI would like to inquire about:\n`);
      } else {
        throw new Error(data.error?.message || 'Failed to send email');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const stats = getRoleSpecificStats();

  if (loading) {
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
      title="Dashboard"
      description={user ? "Welcome to your learning dashboard" : "Please sign in to access your dashboard"}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h2>
          <p className="text-blue-100">
            {!user 
              ? "Sign in to access your personalized dashboard" 
              : user?.role === 'student'
              ? "Ready to continue your learning journey?" 
              : user?.role === 'super_admin'
              ? "Here's your platform overview."
              : "Ready to inspire and teach today?"
            }
          </p>
          {!user && (
            <Button variant="outline" className="mt-4 bg-white text-blue-600 hover:bg-gray-100">
              Sign In
            </Button>
          )}
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
        {user && (
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
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'material' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.type === 'material' 
                              ? `Purchased: ${activity.title}` 
                              : `Enrolled in: ${activity.title}`
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.enrolledAt || activity.purchasedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No recent activity found
                    </div>
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
                    enrolledCourses.length > 0 ? (
                      enrolledCourses.slice(0, 2).map((course) => (
                        <div key={course.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No enrolled courses yet
                      </div>
                    )
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
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Contact Form */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Course Administrator
            </CardTitle>
            <CardDescription>
              Send inquiries about courses, materials, or your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Course inquiry subject"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry in detail..."
                  rows={6}
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {user?.email ? `Sending as: ${user.email}` : 'Sign in to send messages'}
                </div>
                <Button 
                  type="submit" 
                  disabled={isSending || !user}
                  className="gap-2"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Call to action for non-authenticated users */}
        {!user && (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Get Started</h3>
              <p className="text-muted-foreground mb-6">
                Sign in to access your personalized dashboard and learning resources
              </p>
              <Button className="px-8">Sign In</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}