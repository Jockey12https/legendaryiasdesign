'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Download, Eye, ShoppingCart, LogIn, User } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import UserDataService from '@/utils/userDataService';
import { useAuth } from '@/contexts/AuthContext';

// Latest programs from first code set
const latestCourses = [
  {
    id: 1,
    title: "HSC",
    description: "Comprehensive Preparation for Civil Services",
    details: "Explore our specialized IAS Foundation Course designed to equip aspirants with the necessary knowledge and skills to excel in the UPSC examinations.",
    features: [
      "Comprehensive study material covering all subjects",
      "Regular mock tests and performance evaluation",
      "One-on-one mentoring sessions",
      "Access to video lectures and recorded sessions",
      "Special focus on current affairs and GK",
    ],
    duration: "12 months",
    fee: "₹95,000",
    category: "foundation"
  },
  {
    id: 2,
    title: "GED",
    description: "Personalized Guidance for Optional Subjects",
    details: "Discover our tailored coaching for optional subjects, delivered by experienced mentors to enhance your preparation and performance.",
    features: [
      "Subject-specific in-depth study material",
      "Specialized mentors for each optional subject",
      "Regular doubt-clearing sessions",
      "Topic-wise tests and evaluations",
      "Previous years' question analysis and practice",
    ],
    duration: "6 months",
    fee: "₹65,000",
    category: "optional"
  },
  {
    id: 3,
    title: "ESL",
    description: "Effective Test Series for Preliminary and Mains Exams",
    details: "Access our meticulously designed test series to evaluate your readiness and improve your exam-taking strategies for both preliminary and mains examinations.",
    features: [
      "Comprehensive coverage of all UPSC topics",
      "Weekly tests with detailed solutions",
      "Performance analytics and improvement strategies",
      "Answer writing practice for mains examination",
      "Personalized feedback on test performance",
    ],
    duration: "4 months",
    fee: "₹45,000",
    category: "test-series"
  },
  {
    id: 4,
    title: "GRC",
    description: "Guidance for Successful Interview Process",
    details: "Prepare for the crucial interview stage with our comprehensive guidance and mock interview sessions conducted by seasoned professionals.",
    features: [
      "Personality development sessions",
      "Multiple mock interviews with feedback",
      "Current affairs discussions for interview preparation",
      "Body language and communication skills training",
      "One-on-one mentoring for personal improvement areas",
    ],
    duration: "2 months",
    fee: "₹35,000",
    category: "interview"
  },
];

// All programs from second code set
const allPrograms = [
  {
    id: 'foundation-program',
    title: 'Foundation Program',
    description: 'Comprehensive preparation for IAS with focus on prelims and mains.',
    duration: '12 months',
    fees: '₹35,000',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    category: 'foundation'
  },
  {
    id: 'prelims-intensive',
    title: 'Prelims Intensive',
    description: 'Focused preparation for UPSC Preliminary exam with extensive practice tests.',
    duration: '6 months',
    fees: '₹20,000',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
    category: 'prelims'
  },
  {
    id: 'mains-advanced',
    title: 'Mains Advanced',
    description: 'In-depth guidance for UPSC Mains with answer writing practice and evaluation.',
    duration: '8 months',
    fees: '₹25,000',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    category: 'mains'
  },
  {
    id: 'interview-mastery',
    title: 'Interview Mastery',
    description: 'Comprehensive preparation for UPSC Interview with mock sessions and expert feedback.',
    duration: '3 months',
    fees: '₹15,000',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
    category: 'interview'
  },
];

// Study Materials from second code set
const studyMaterials = [
  {
    id: 'prelims-study-material',
    title: 'Prelims Study Material',
    description: 'Comprehensive study material covering all topics for UPSC Prelims.',
    format: 'PDF + Hard Copy',
    fees: '₹5,000',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    category: 'prelims',
    previewUrl: 'https://example.com/prelims-preview.pdf'
  },
  {
    id: 'mains-answer-writing',
    title: 'Mains Answer Writing Material',
    description: 'Model answers and writing techniques for UPSC Mains papers.',
    format: 'PDF + Hard Copy',
    fees: '₹6,000',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
    category: 'mains',
    previewUrl: 'https://example.com/mains-preview.pdf'
  },
  {
    id: 'current-affairs-compilation',
    title: 'Current Affairs Compilation',
    description: 'Monthly and yearly compilation of current affairs relevant for UPSC.',
    format: 'PDF',
    fees: '₹2,500',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    category: 'current',
    previewUrl: 'https://example.com/current-affairs-preview.pdf'
  },
  {
    id: 'optional-subject-material',
    title: 'Optional Subject Materials',
    description: 'Specialized study materials for various optional subjects.',
    format: 'PDF + Hard Copy',
    fees: '₹7,000',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
    category: 'optional',
    previewUrl: 'https://example.com/optional-preview.pdf'
  },
];

// Category options for dropdowns
const latestProgramCategories = [
  { value: 'all', label: 'All Latest Programs' },
  { value: 'foundation', label: 'Foundation Courses' },
  { value: 'optional', label: 'Optional Subjects' },
  { value: 'test-series', label: 'Test Series' },
  { value: 'interview', label: 'Interview Preparation' },
];

const allProgramCategories = [
  { value: 'all', label: 'All Programs' },
  { value: 'foundation', label: 'Foundation Courses' },
  { value: 'prelims', label: 'Prelims Courses' },
  { value: 'mains', label: 'Mains Courses' },
  { value: 'interview', label: 'Interview Courses' },
];

const materialCategories = [
  { value: 'all', label: 'All Materials' },
  { value: 'prelims', label: 'Prelims Materials' },
  { value: 'mains', label: 'Mains Materials' },
  { value: 'current', label: 'Current Affairs' },
  { value: 'optional', label: 'Optional Subjects' },
];

export default function UnifiedCoursesPage() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('latest-programs');
  const [latestProgramCategory, setLatestProgramCategory] = useState('all');
  const [allProgramCategory, setAllProgramCategory] = useState('all');
  const [materialCategory, setMaterialCategory] = useState('all');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [purchasedMaterials, setPurchasedMaterials] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [showPreview, setShowPreview] = useState(null);

  // Filter functions
  const filteredLatestCourses = latestProgramCategory === 'all'
    ? latestCourses
    : latestCourses.filter(course => course.category === latestProgramCategory);

  const filteredAllPrograms = allProgramCategory === 'all'
    ? allPrograms
    : allPrograms.filter(program => program.category === allProgramCategory);

  const filteredMaterials = materialCategory === 'all'
    ? studyMaterials
    : studyMaterials.filter(material => material.category === materialCategory);

  // Load user's enrolled courses and materials when user logs in
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          // Migrate data from localStorage to Firebase if needed
          await UserDataService.migrateFromLocalStorage(user.uid);
          
          // Load data from Firebase
          const [enrolled, purchased] = await Promise.all([
            UserDataService.getEnrolledCourses(user.uid),
            UserDataService.getPurchasedMaterials(user.uid)
          ]);
          
          setEnrolledCourses(new Set(enrolled.map(item => item.id)));
          setPurchasedMaterials(new Set(purchased.map(item => item.id)));
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        // Clear state when user logs out
        setEnrolledCourses(new Set());
        setPurchasedMaterials(new Set());
      }
    };

    loadUserData();
  }, [user]);

  // Handle course enrollment
  const handleEnrollment = async (courseId, courseTitle, courseType = 'course') => {
    if (!user) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      setSuccessMessage('Please log in to enroll in courses');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    try {
      // Check if already enrolled
      const isEnrolled = await UserDataService.isEnrolledInCourse(user.uid, courseId);
      if (isEnrolled) {
        setSuccessMessage('You are already enrolled in this course!');
        setTimeout(() => setSuccessMessage(''), 3000);
        return;
      }

      // Enroll in course via Firebase
      await UserDataService.enrollInCourse(user.uid, {
        id: courseId,
        title: courseTitle,
        type: courseType
      });

      setEnrolledCourses(prev => new Set([...prev, courseId]));
      setSuccessMessage(`Successfully enrolled in ${courseTitle}!`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setSuccessMessage('Failed to enroll in course. Please try again.');
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle material purchase
  const handlePurchase = async (materialId, materialTitle) => {
    if (!user) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      setSuccessMessage('Please log in to purchase materials');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    try {
      // Check if already purchased
      const hasPurchased = await UserDataService.hasPurchasedMaterial(user.uid, materialId);
      if (hasPurchased) {
        setSuccessMessage('You have already purchased this material!');
        setTimeout(() => setSuccessMessage(''), 3000);
        return;
      }

      // Purchase material via Firebase
      await UserDataService.purchaseMaterial(user.uid, {
        id: materialId,
        title: materialTitle
      });

      setPurchasedMaterials(prev => new Set([...prev, materialId]));
      setSuccessMessage(`Successfully purchased ${materialTitle}!`);
    } catch (error) {
      console.error('Error purchasing material:', error);
      setSuccessMessage('Failed to purchase material. Please try again.');
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle preview
  const handlePreview = (material) => {
    setShowPreview(material);
  };

  // Loading state
  if (loading) {
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
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className={`${successMessage.includes('log in') ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Auth Status Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm">
            {user ? (
              <>
                <User className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">Welcome, {user.displayName || user.email}</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Sign in to enroll in courses</span>
              </>
            )}
          </div>
          <div>
            {user ? (
              <Button variant="outline" size="sm" onClick={logout}>
                Sign Out
              </Button>
            ) : (
              <Button size="sm" onClick={() => {
                setAuthModalMode('login');
                setAuthModalOpen(true);
              }}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Courses Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']">
            Our Courses
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-center mb-8">
            Discover our comprehensive range of courses designed to help you excel in the civil services examinations.
            Choose the program that best suits your preparation needs and goals.
          </p>
          {!user && (
            <div className="text-center">
              <Alert className="bg-blue-50 border-blue-200 text-blue-800 max-w-md mx-auto">
                <LogIn className="h-4 w-4" />
                <AlertDescription>
                  Sign in to enroll in courses and track your progress
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="latest-programs">Latest Programs</TabsTrigger>
              <TabsTrigger value="all-programs">All Programs</TabsTrigger>
              <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
            </TabsList>

            {/* Latest Programs Tab */}
            <TabsContent value="latest-programs" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Select value={latestProgramCategory} onValueChange={setLatestProgramCategory}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Filter latest programs" />
                  </SelectTrigger>
                  <SelectContent>
                    {latestProgramCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {filteredLatestCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-primary p-8">
                        <CardHeader>
                          <CardTitle className="text-3xl font-['Oswald'] text-secondary">{course.title}</CardTitle>
                          <h3 className="text-xl font-bold text-secondary mt-4">{course.description}</h3>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="mb-4">
                            <p className="text-secondary font-bold">Duration: {course.duration}</p>
                            <p className="text-secondary font-bold">Fee: {course.fee}</p>
                          </div>
                          {user && enrolledCourses.has(course.id) ? (
                            <Button 
                              disabled 
                              className="bg-green-600 text-white hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Enrolled
                            </Button>
                          ) : (
                            <Button 
                              className="bg-secondary text-white hover:bg-secondary/90"
                              onClick={() => handleEnrollment(course.id, course.title)}
                            >
                              {user ? 'Enroll Now' : 'Sign In to Enroll'}
                            </Button>
                          )}
                        </CardContent>
                      </div>
                      <div className="md:w-2/3 p-8">
                        <h4 className="text-xl font-bold mb-4">Course Overview</h4>
                        <p className="text-gray-600 mb-6">{course.details}</p>

                        <h4 className="text-xl font-bold mb-4">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {course.features.map((feature, index) => (
                            <li key={`${course.id}-feature-${index}`} className="text-gray-600">{feature}</li>
                          ))}
                        </ul>

                        <CardFooter className="px-0 pt-6">
                          <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-secondary"
                          >
                            Learn More
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* All Programs Tab */}
            <TabsContent value="all-programs" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Select value={allProgramCategory} onValueChange={setAllProgramCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allProgramCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAllPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{program.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="font-medium">{program.fees}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {user && enrolledCourses.has(program.id) ? (
                        <Button disabled className="w-full bg-green-600 hover:bg-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enrolled
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => handleEnrollment(program.id, program.title)}
                        >
                          {user ? 'Enroll Now' : 'Sign In to Enroll'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Study Materials Tab */}
            <TabsContent value="study-materials" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Select value={materialCategory} onValueChange={setMaterialCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                      <img
                        src={material.image}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Format</p>
                          <p className="font-medium">{material.format}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="font-medium">{material.fees}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreview(material)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      {user && purchasedMaterials.has(material.id) ? (
                        <Button 
                          disabled 
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Purchased
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handlePurchase(material.id, material.title)}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {user ? 'Purchase' : 'Sign In to Purchase'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Preview Dialog */}
      {showPreview && (
        <Dialog open={!!showPreview} onOpenChange={() => setShowPreview(null)}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Preview: {showPreview.title}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-600 mb-4">PDF Preview</p>
                <div className="bg-white rounded border-2 border-dashed border-gray-300 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Download className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 mb-2">PDF Preview would appear here</p>
                    <p className="text-sm text-gray-400">This is a sample preview interface</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => window.open(showPreview.previewUrl, '_blank')}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Preview
                </Button>
                <Button 
                  onClick={() => {
                    handlePurchase(showPreview.id, showPreview.title);
                    setShowPreview(null);
                  }}
                  className="flex-1"
                  disabled={!user}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {user ? 'Purchase Full Version' : 'Sign In to Purchase'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}