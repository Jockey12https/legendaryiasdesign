'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface Student {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  enrolledCourses: Course[];
  purchasedMaterials: Material[];
}

interface Course {
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

interface Material {
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

interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productTitle: string;
  productType: 'course' | 'material';
  amount: number;
  currency: string;
  upiId: string;
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
  whatsappMessage?: string;
  paymentProof?: string;
  adminNotes?: string;
}

export default function AdminAnalyticsPage() {
  const { isAdminAuthenticated, loading } = useAdminAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    if (isAdminAuthenticated && !loading) {
      loadAnalytics();
    }
  }, [isAdminAuthenticated, loading]);

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      console.log('Loading analytics data...');
      
      // Load all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as Student[];
      
      console.log('Users loaded:', usersData.length);

      // Load all payments
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const paymentsData = paymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Payment[];
      
      console.log('Payments loaded:', paymentsData.length);

      // Process users to get enrolled courses and purchased materials
      const studentsWithDetails = usersData.map((user) => {
        try {
                     // Get enrolled courses from user data
           const enrolledCourses = user.enrolledCourses || [];
           console.log(`Enrolled courses for ${user.uid}:`, enrolledCourses.length);
           if (enrolledCourses.length > 0) {
             console.log(`Sample course for ${user.uid}:`, enrolledCourses[0]);
           }

           // Get purchased materials from user data
           const purchasedMaterials = user.purchasedMaterials || [];
           console.log(`Purchased materials for ${user.uid}:`, purchasedMaterials.length);
           if (purchasedMaterials.length > 0) {
             console.log(`Sample material for ${user.uid}:`, purchasedMaterials[0]);
           }

           // Debug: Log the entire user object to see what's available
           console.log(`Full user data for ${user.uid}:`, user);

                     // Remove duplicates from courses and materials based on ID
           const uniqueEnrolledCourses = enrolledCourses.filter((course, index, self) => 
             index === self.findIndex(c => c.id === course.id)
           );
           
           const uniquePurchasedMaterials = purchasedMaterials.filter((material, index, self) => 
             index === self.findIndex(m => m.id === material.id)
           );

           console.log(`Unique courses for ${user.uid}:`, uniqueEnrolledCourses.length);
           console.log(`Unique materials for ${user.uid}:`, uniquePurchasedMaterials.length);

           return {
             ...user,
             enrolledCourses: uniqueEnrolledCourses,
             purchasedMaterials: uniquePurchasedMaterials
           };
        } catch (error) {
          console.error(`Error processing user ${user.uid}:`, error);
          return {
            ...user,
            enrolledCourses: [],
            purchasedMaterials: []
          };
        }
      });

             console.log('Final students data:', studentsWithDetails);
       console.log('Sample student data:', studentsWithDetails[0]);
       console.log('Payments data:', paymentsData);
       console.log('Sample payment data:', paymentsData[0]);
       setStudents(studentsWithDetails);
       setPayments(paymentsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const getTotalRevenue = () => {
    console.log('Calculating revenue from payments:', payments.length);
    const confirmedPayments = payments.filter(payment => payment.status === 'confirmed');
    console.log('Confirmed payments:', confirmedPayments.length);
    
    // Log each confirmed payment for debugging
    confirmedPayments.forEach(payment => {
      console.log(`Payment ${payment.id}: ${payment.productTitle} - ₹${payment.amount} - ${payment.status}`);
    });
    
    const total = confirmedPayments.reduce((total, payment) => {
      const amount = Number(payment.amount) || 0;
      console.log('Payment amount:', amount, 'Total so far:', total);
      return total + amount;
    }, 0);
    console.log('Total revenue calculated:', total);
    return total;
  };

  const getTotalStudents = () => {
    return students.length;
  };

  const getTotalEnrollments = () => {
    return students.reduce((total, student) => total + student.enrolledCourses.length, 0);
  };

  const getTotalPurchases = () => {
    return students.reduce((total, student) => total + student.purchasedMaterials.length, 0);
  };

  const getStudentDisplayName = (student: Student) => {
    if (student.firstName && student.lastName) {
      return `${student.firstName} ${student.lastName}`;
    }
    if (student.displayName) {
      return student.displayName;
    }
    return student.email;
  };

  const getStudentInitials = (student: Student) => {
    if (student.firstName && student.lastName) {
      return `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
    }
    if (student.displayName) {
      return student.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return student.email[0].toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in as admin to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of students, revenue, and enrollment statistics</p>
        </div>

        {analyticsLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalStudents()}</div>
                  <p className="text-xs text-muted-foreground">
                    Registered students
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(getTotalRevenue())}</div>
                  <p className="text-xs text-muted-foreground">
                    From confirmed payments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Enrollments</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalEnrollments()}</div>
                  <p className="text-xs text-muted-foreground">
                    Total course enrollments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalPurchases()}</div>
                  <p className="text-xs text-muted-foreground">
                    Material purchases
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Students List */}
            <Card>
              <CardHeader>
                <CardTitle>Students List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.uid} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.photoURL || ''} alt={getStudentDisplayName(student)} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getStudentInitials(student)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{getStudentDisplayName(student)}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {student.enrolledCourses.length} Courses
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {student.purchasedMaterials.length} Materials
                            </Badge>
                                                         <span className="text-xs text-gray-500">
                               Joined: {formatDate(student.createdAt || student.metadata?.creationTime || '')}
                             </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(student);
                          setStudentDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Student Details Dialog */}
        <Dialog open={studentDetailsOpen} onOpenChange={setStudentDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Profile */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStudent.photoURL || ''} alt={getStudentDisplayName(selectedStudent)} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {getStudentInitials(selectedStudent)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{getStudentDisplayName(selectedStudent)}</h2>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      {selectedStudent.phoneNumber && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {selectedStudent.phoneNumber}
                        </div>
                      )}
                      {selectedStudent.address && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedStudent.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="courses" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="courses">Enrolled Courses</TabsTrigger>
                    <TabsTrigger value="materials">Purchased Materials</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="courses" className="space-y-4">
                    {selectedStudent.enrolledCourses.length > 0 ? (
                      selectedStudent.enrolledCourses.map((course, index) => (
                                                 <div key={`${course.id}-${course.enrolledAt}-${index}`} className="p-4 border rounded-lg">
                           <div className="flex items-center justify-between">
                             <div>
                               <h3 className="font-medium">{course.title}</h3>
                               {course.description && (
                                 <p className="text-sm text-gray-600">{course.description}</p>
                               )}
                               <div className="flex items-center space-x-4 mt-2">
                                 {course.category && (
                                   <Badge variant="outline">{course.category}</Badge>
                                 )}
                                 {course.duration && (
                                   <span className="text-sm text-gray-600">
                                     <Clock className="h-3 w-3 inline mr-1" />
                                     {course.duration}
                                   </span>
                                 )}
                                 <span className="text-sm text-gray-600">
                                   <Calendar className="h-3 w-3 inline mr-1" />
                                   {formatDate(course.enrolledAt)}
                                 </span>
                               </div>
                             </div>
                                                           <div className="text-right">
                                <div className="font-medium">
                                  {(() => {
                                    // Find the corresponding payment for this course
                                    const payment = payments.find(p => 
                                      p.status === 'confirmed' && 
                                      p.userId === selectedStudent.uid && 
                                      p.productId === course.id && 
                                      p.productType === 'course'
                                    );
                                    return formatCurrency(payment ? Number(payment.amount) : 0);
                                  })()}
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Enrolled
                                </Badge>
                              </div>
                           </div>
                         </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No courses enrolled yet
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="materials" className="space-y-4">
                    {selectedStudent.purchasedMaterials.length > 0 ? (
                      selectedStudent.purchasedMaterials.map((material, index) => (
                                                 <div key={`${material.id}-${material.purchasedAt}-${index}`} className="p-4 border rounded-lg">
                           <div className="flex items-center justify-between">
                             <div>
                               <h3 className="font-medium">{material.title}</h3>
                               <div className="flex items-center space-x-4 mt-2">
                                 {material.type && (
                                   <Badge variant="outline">{material.type}</Badge>
                                 )}
                                 <span className="text-sm text-gray-600">
                                   <Calendar className="h-3 w-3 inline mr-1" />
                                   {formatDate(material.purchasedAt)}
                                 </span>
                               </div>
                             </div>
                                                           <div className="text-right">
                                <div className="font-medium">
                                  {(() => {
                                    // Find the corresponding payment for this material
                                    const payment = payments.find(p => 
                                      p.status === 'confirmed' && 
                                      p.userId === selectedStudent.uid && 
                                      p.productId === material.id && 
                                      p.productType === 'material'
                                    );
                                    return formatCurrency(payment ? Number(payment.amount) : 0);
                                  })()}
                                </div>
                                <Badge className="bg-blue-100 text-blue-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Purchased
                                </Badge>
                              </div>
                           </div>
                         </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No materials purchased yet
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 