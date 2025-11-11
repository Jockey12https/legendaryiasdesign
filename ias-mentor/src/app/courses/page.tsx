'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Download, Eye, ShoppingCart, LogIn, User, MessageCircle } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import WhatsAppPaymentModal from '@/components/payment/WhatsAppPaymentModal';
import UserDataService from '@/utils/userDataService';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/utils/firebase';

// Latest programs from first code set
const latestCourses = [
  {
    id: 0,
    title: "UPSC Weekend Batch",
    description: "Designed for Degree Students and Working Professionals",
    details: "1-Year comprehensive program covering Prelims and Mains with classes on Saturdays, Sundays & Public Holidays. Includes dedicated Mains answer writing practice and mentorship.",
    features: [
      "Weekend & Public Holiday classes",
      "Prelims + Mains comprehensive coverage",
      "Mains answer writing practice",
      "Mentorship support for working professionals",
    ],
    duration: "12 months",
    fee: "Contact Admin",
    category: "mains"
  },
  {
    id: 1,
    title: "Regular PCM Batch",
    description: "Your one-year transformation starts here!",
    details: "A UPSC dream needs more than hard work - it needs the right mentorship, the right plan, and the right push. With 800+ hours of live classes, expert-curated study materials, and daily personalized mentorship, this is where your success begins!",
    features: [
      "800+ hours of live classes",
      "Expert-curated study materials",
      "Daily personalized mentorship",
      "Comprehensive coverage of all UPSC subjects",
      "Regular assessments and performance tracking",
    ],
    duration: "12 months",
    fee: "Contact Admin",
    category: "foundation"
  },
  {
    id: 2,
    title: "Hardcore PCM",
    description: "How far will you go for your UPSC dream?",
    details: "This is not just a course - it's a commitment to success, with unlimited access until you clear. Get in-depth Prelims, Mains, and Interview training with extended class hours, extra mentorship, language training, and continuous test series support.",
    features: [
      "Unlimited access until you clear",
      "In-depth Prelims, Mains & Interview training",
      "Extended class hours",
      "Extra mentorship sessions",
      "Language training and continuous test series",
    ],
    duration: "Until Clear",
    fee: "Contact Admin",
    category: "comprehensive"
  },
  {
    id: 3,
    title: "Repeaters Batch",
    description: "We will never let you fail again!",
    details: "Your past attempts don't define you - your next one does! This program identifies your weaknesses, corrects past mistakes, and helps you sharpen your Prelims & Mains strategy with weekly test series, answer writing sessions, and much more!",
    features: [
      "Weakness identification and correction",
      "Past mistakes analysis",
      "Sharpened Prelims & Mains strategy",
      "Weekly test series",
      "Answer writing practice sessions",
    ],
    duration: "12 months",
    fee: "Contact Admin",
    category: "repeaters"
  },
  {
    id: 4,
    title: "Prelims Combat",
    description: "Crack Prelims with confidence!",
    details: "The real battle for Prelims is won with concept clarity, logical thinking & strategic MCQ solving. This program offers PYQ-based logic training, detailed concept sessions, full Prelims Test Series & personalized mentorship to help you dominate Prelims!",
    features: [
      "PYQ-based logic training",
      "Detailed concept sessions",
      "Full Prelims Test Series",
      "Personalized mentorship",
      "Strategic MCQ solving techniques",
    ],
    duration: "5 months",
    fee: "Contact Admin",
    category: "prelims"
  },
];

// All programs from second code set
const allPrograms = [
  {
    id: 'prelims-test-series',
    title: 'Prelims Test Series',
    description: 'Practice. Improve. Conquer. UPSC Prelims isn\'t about luck—it\'s about strategy, precision & confidence. Our weekly full-length & sectional tests, detailed test discussions, and real-exam simulations make you battle-ready!',
    duration: '6 months',
    fees: '₹7,000',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=1200&auto=format&fit=crop', // exam sheet/OMR vibe
    category: 'prelims'
  },
  {
    id: 'mains-combat',
    title: 'Mains Combat',
    description: 'Write like a topper! Mains is not about knowing, it\'s about expressing! This program transforms your writing, strengthens your articulation, and builds your confidence with structured answer writing workshops, Mains test series, value addition modules, and expert feedback!',
    duration: '8 months',
    fees: '₹55,000',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop', // writing/answer sheets
    category: 'mains'
  },
  {
    id: 'mentorship-batch',
    title: 'Mentorship Batch',
    description: 'Your personal UPSC guide for 1 year! UPSC is a lonely journey - but not with a mentor by your side! Get weekly one-on-one mentorship sessions, personal study plans, performance tracking, and targeted improvement strategies to stay ahead in the race!',
    duration: '12 months',
    fees: '₹20,000',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop', // mentor-student discussion
    category: 'mentorship'
  },
  {
    id: 'module-courses',
    title: 'Module Courses',
    description: 'Master key UPSC modules! Short, high-impact modules to master UPSC\'s toughest sections! Targeted training, expert guidance & crisp study materials to simplify complex topics!',
    duration: '3 months',
    fees: 'Nil',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop', // books/modules
    category: 'modules'
  },
  {
    id: 'optional-subjects',
    title: 'Optional Subjects',
    description: 'Make your optional your scoring weapon! Your optional can be your strength—if trained right! Learn from expert faculty, get structured notes, concept clarity & personalized answer reviews, and maximize your optional score!',
    duration: '6 months',
    fees: '₹45,000',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop', // library/subjects
    category: 'optional'
  },{
    id: 'sociology-mentorship',
    title: 'Sociology Mentorship',
    description: 'Score high in Sociology! A great answer isn\'t just about facts—it\'s about depth, clarity & structure. This program fine-tunes your Sociology writing skills with expert reviews & model answers!',
    duration: '4 months',
    fees: '₹10,000',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop', // teamwork/discussion
    category: 'optional'
  }
  ,
  {
    id: 'mains-test-series',
    title: 'Mains Test Series',
    description: 'Write like a topper! Your answers should not just be right, they should be brilliant! With weekly GS & Essay tests, expert evaluation, and topper-model answers, refine your structure, clarity, and argument-building skills!',
    duration: '7 months',
    fees: '₹12,000',
    image: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?q=80&w=1200&auto=format&fit=crop', // pen and paper exam
    category: 'mains'
  },
  {
    id: 'mains-answer-writing',
    title: 'Mains Answer Writing',
    description: 'Write your way to success! A well-structured answer is the difference between average and excellence! Learn step-by-step answer writing, develop analytical skills & get expert feedback!',
    duration: '3 months',
    fees: '₹15,000',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop', // focused writing/notes
    category: 'mains'
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
    image: 'https://images.unsplash.com/photo-1584697964194-9c7906b7985a?q=80&w=1200&auto-format&fit=crop', // prelims materials/notes
    category: 'prelims',
    previewUrl: 'https://example.com/prelims-preview.pdf',
    purchaseUrl: 'https://example.com/prelims-download.pdf'
  },
  {
    id: 'mains-answer-writing',
    title: 'Mains Answer Writing Material',
    description: 'Model answers and writing techniques for UPSC Mains papers.',
    format: 'PDF + Hard Copy',
    fees: '₹6,000',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop', // writing practice
    category: 'mains',
    previewUrl: 'https://example.com/mains-preview.pdf',
    purchaseUrl: 'https://example.com/mains-download.pdf'
  },
  {
    id: 'current-affairs-compilation',
    title: 'Current Affairs Compilation',
    description: 'Monthly and yearly compilation of current affairs relevant for UPSC.',
    format: 'PDF',
    fees: '₹2,500',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop', // newspapers
    category: 'current',
    previewUrl: 'https://example.com/current-affairs-preview.pdf',
    purchaseUrl: 'https://example.com/current-affairs-download.pdf'
  },
  {
    id: 'optional-subject-material',
    title: 'Optional Subject Materials',
    description: 'Specialized study materials for various optional subjects.',
    format: 'PDF + Hard Copy',
    fees: '₹7,000',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop', // shelves/books
    category: 'optional',
    previewUrl: 'https://example.com/optional-preview.pdf',
    purchaseUrl: 'https://example.com/optional-download.pdf'
  },
];

// Category options for dropdowns
const latestProgramCategories = [
  { value: 'all', label: 'All Latest Programs' },
  { value: 'foundation', label: 'Foundation Courses' },
  { value: 'comprehensive', label: 'Comprehensive Programs' },
  { value: 'repeaters', label: 'Repeaters Batch' },
  { value: 'prelims', label: 'Prelims Courses' },
];

const allProgramCategories = [
  { value: 'all', label: 'All Programs' },
  { value: 'foundation', label: 'Foundation Courses' },
  { value: 'prelims', label: 'Prelims Courses' },
  { value: 'mains', label: 'Mains Courses' },
  { value: 'mentorship', label: 'Mentorship Programs' },
  { value: 'modules', label: 'Module Courses' },
  { value: 'optional', label: 'Optional Subjects' },
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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    type: 'course' | 'material';
    price: number;
    description?: string;
  } | null>(null);

  // Dynamic data from Firebase
  const [dynamicLatestCourses, setDynamicLatestCourses] = useState<any[]>([]);
  const [dynamicStudyMaterials, setDynamicStudyMaterials] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Load dynamic data from Firebase
  const loadDynamicData = async () => {
    try {
      setLoadingData(true);
      
      // Load latest courses from Firebase
      const latestCoursesQuery = query(collection(db, "latestCourses"), orderBy("createdAt", "desc"));
      const latestCoursesSnapshot = await getDocs(latestCoursesQuery);
      const latestCoursesData = latestCoursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Add default values for missing properties
        features: doc.data().features || ['Comprehensive study material', 'Regular assessments', 'Expert guidance'],
        details: doc.data().details || doc.data().description || 'Comprehensive course designed for success',
        category: doc.data().category || 'foundation',
        image: doc.data().image || 'https://ext.same-assets.com/1137026266/2875867135.jpeg' // Default image for courses
      }));
      setDynamicLatestCourses(latestCoursesData);

      // Load study materials from Firebase
      const materialsQuery = query(collection(db, "studyMaterials"), orderBy("createdAt", "desc"));
      const materialsSnapshot = await getDocs(materialsQuery);
      const materialsData = materialsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Add default values for missing properties
        category: doc.data().category || 'general',
        image: doc.data().image || 'https://ext.same-assets.com/1137026266/2875867135.jpeg' // Default image for study materials
      }));
      setDynamicStudyMaterials(materialsData);

    } catch (error) {
      console.error("Error loading dynamic data:", error);
      // Set empty arrays on error to prevent undefined issues
      setDynamicLatestCourses([]);
      setDynamicStudyMaterials([]);
    } finally {
      setLoadingData(false);
    }
  };

  // Combine static and dynamic data (with fallback to empty arrays)
  const allLatestCourses = [...latestCourses, ...(dynamicLatestCourses || [])];
  const allStudyMaterials = [...studyMaterials, ...(dynamicStudyMaterials || [])];

  // No mapping: explicit course/material images are defined per item below

  useEffect(() => {
    const handleAllProgramsHash = () => {
      if (typeof window === 'undefined') {
        return;
      }

      if (window.location.hash === '#all-programs') {
        setActiveTab('all-programs');

        window.requestAnimationFrame(() => {
          const target = document.getElementById('all-programs-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    };

    handleAllProgramsHash();
    window.addEventListener('hashchange', handleAllProgramsHash);

    return () => window.removeEventListener('hashchange', handleAllProgramsHash);
  }, []);

  // Filter functions
  const filteredLatestCourses = latestProgramCategory === 'all'
    ? allLatestCourses
    : allLatestCourses.filter(course => course.category === latestProgramCategory);

  const filteredAllPrograms = allProgramCategory === 'all'
    ? allPrograms
    : allPrograms.filter(program => program.category === allProgramCategory);

  const filteredMaterials = materialCategory === 'all'
    ? allStudyMaterials
    : allStudyMaterials.filter(material => material.category === materialCategory);

  // Load user's enrolled courses and materials when user logs in
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

  useEffect(() => {
    loadUserData();
    loadDynamicData();
  }, [user]);

  // Handle course enrollment
  const handleEnrollment = async (courseId: string, courseTitle: string, courseType = 'course') => {
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

      // Extract price from course data
      const course = allLatestCourses.find(c => c.id.toString() === courseId) || 
                    allPrograms.find(c => c.id === courseId);
      let price = 0;
      if (course) {
        if ('fee' in course) {
          // Check if fee is "Contact Admin" - open WhatsApp modal without payment
          if (course.fee === "Contact Admin") {
            setSelectedProduct({
              id: courseId,
              title: courseTitle,
              type: 'course',
              price: 0, // Set price to 0 for contact admin courses
              description: course?.description
            });
            setPaymentModalOpen(true);
            return;
          }
          price = parseInt(course.fee.replace(/[^\d]/g, '') || '0');
        } else if ('fees' in course) {
          price = parseInt(course.fees.replace(/[^\d]/g, '') || '0');
        }
      }

      // Open payment modal
      setSelectedProduct({
        id: courseId,
        title: courseTitle,
        type: 'course',
        price,
        description: course?.description
      });
      setPaymentModalOpen(true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setSuccessMessage('Failed to enroll in course. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handle material purchase
  const handlePurchase = async (materialId: string, materialTitle: string) => {
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

      // Extract price from material data
      const material = allStudyMaterials.find(m => m.id === materialId);
      let price = 0;
      
      if (material) {
        // Handle both old format (fees) and new format (price)
        if (material.fees) {
          price = parseInt(material.fees.replace(/[^\d]/g, '') || '0');
        } else if (material.price) {
          // For newly added materials from admin panel
          price = parseInt(material.price.toString().replace(/[^\d]/g, '') || '0');
        }
      }

      // Open payment modal
      setSelectedProduct({
        id: materialId,
        title: materialTitle,
        type: 'material',
        price,
        description: material?.description
      });
      setPaymentModalOpen(true);
    } catch (error) {
      console.error('Error purchasing material:', error);
      setSuccessMessage('Failed to purchase material. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handle preview
  const handlePreview = (material: any) => {
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
                            <p className="text-secondary font-bold">For Fee Details</p>
                          </div>
                          {user && (enrolledCourses.has(course.id) || enrolledCourses.has(course.id.toString())) ? (
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
                              onClick={() => handleEnrollment(course.id.toString(), course.title)}
                            >
                              {course.fee === "Contact Admin" ? "Contact Admin" : (user ? 'Enroll Now' : 'Sign In to Enroll')}
                            </Button>
                          )}
                        </CardContent>
                      </div>
                      <div className="md:w-2/3 p-8">
                        <h4 className="text-xl font-bold mb-4">Course Overview</h4>
                        <p className="text-gray-600 mb-6">{course.details || course.description || 'Comprehensive course designed for success'}</p>

                        <h4 className="text-xl font-bold mb-4">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {(course.features || []).map((feature: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: any) => (
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
            <TabsContent value="all-programs" className="space-y-6" id="all-programs-section">
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
                      {user && (enrolledCourses.has(program.id) || enrolledCourses.has(program.id.toString())) ? (
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
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop';
                          }}
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
                          <p className="font-medium">{material.format || material.type || 'PDF'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-medium">
                            {material.fees || (material.price ? `₹${material.price}` : '₹0')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {material.previewUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePreview(material)}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      )}
                      {user && (purchasedMaterials.has(material.id) || purchasedMaterials.has(material.id.toString())) ? (
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
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] mx-auto p-0 sm:p-6">
            <DialogHeader className="px-4 sm:px-0 pb-4">
              <DialogTitle className="text-base sm:text-lg lg:text-xl">
                Preview: {(showPreview as any).title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-full max-h-[calc(90vh-120px)]">
              <div className="flex-1 bg-gray-100 rounded-lg p-2 sm:p-4 mb-3 sm:mb-4 min-h-[200px] sm:min-h-[300px]">
                <div className="h-full flex flex-col">
                  <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">PDF Preview</p>
                  <div className="bg-white rounded border-2 border-dashed border-gray-300 flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                      <Download className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mx-auto mb-2 sm:mb-4 text-gray-400" />
                      <p className="text-gray-500 mb-1 sm:mb-2 text-sm sm:text-base">PDF Preview would appear here</p>
                      <p className="text-xs sm:text-sm text-gray-400">This is a sample preview interface</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 px-4 sm:px-0">
                <Button 
                  variant="outline" 
                  onClick={() => window.open((showPreview as any).previewUrl, '_blank')}
                  className="flex-1 h-10 sm:h-auto text-sm sm:text-base"
                >
                  <Download className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Download Preview</span>
                  <span className="sm:hidden">Preview</span>
                </Button>
                <Button 
                  onClick={() => {
                    handlePurchase((showPreview as any).id, (showPreview as any).title);
                    setShowPreview(null);
                  }}
                  className="flex-1 h-10 sm:h-auto text-sm sm:text-base"
                  disabled={!user}
                >
                  <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {user ? 'Purchase Full Version' : 'Sign In to Purchase'}
                  </span>
                  <span className="sm:hidden">
                    {user ? 'Purchase' : 'Sign In'}
                  </span>
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

      {/* WhatsApp Payment Modal */}
      {selectedProduct && (
        <WhatsAppPaymentModal
          isOpen={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onPaymentSuccess={loadUserData}
        />
      )}
    </div>
  );
}