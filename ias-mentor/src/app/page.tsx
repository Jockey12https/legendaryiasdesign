"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import CoursesSection from "@/components/sections/CoursesSection";
import CommunitySection from "@/components/sections/CommunitySection";
import VisionSection from "@/components/sections/VisionSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import NewsUpdatesSection from "@/components/NewsUpdatesSection";
import CourseShowcaseCarousel from "@/components/CourseShowcaseCarousel";
import InteractiveCalendar from "@/components/InteractiveCalendar";
import ClientOnly from "@/components/ClientOnly";
import { useContentManagement } from "@/contexts/ContentManagementContext";
import { ContentManagementService, NewsItem, Course, CalendarEvent } from "@/utils/contentManagementService";

// Mock data - replace with actual data from your backend
const mockNewsItems = [
  {
    id: "1",
    title: "UPSC 2025 Prelims Notification Released",
    content: "The Union Public Service Commission has officially released the notification for Civil Services Prelims 2025. This year's exam is scheduled for May 26, 2025, with applications opening from February 1st to February 20th, 2025.",
    category: "upsc-update" as const,
    priority: "high" as const,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-15T10:00:00Z"),
    readTime: "3 min read",
    isFeatured: true,
  },
  {
    id: "2",
    title: "New Foundation Course Launched",
    content: "We are excited to announce our comprehensive foundation course designed specifically for beginners. This course covers all essential topics with expert guidance from our legendary mentors.",
    category: "course-launch" as const,
    priority: "medium" as const,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-14T10:00:00Z"), // 1 day ago
    readTime: "2 min read",
    isFeatured: false,
  },
  {
    id: "3",
    title: "Student Success Story: AIR 45 in CSE 2024",
    content: "Congratulations to our student Priya Sharma who secured All India Rank 45 in Civil Services Examination 2024. Her journey from a small town to becoming an IAS officer is truly inspiring.",
    category: "success-story" as const,
    priority: "high" as const,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-13T10:00:00Z"), // 2 days ago
    readTime: "4 min read",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Important: Mock Test Schedule Updated",
    content: "Due to popular demand, we have updated our mock test schedule. The next full-length mock test will be conducted on February 15th, 2025. Register now to secure your spot.",
    category: "important-date" as const,
    priority: "medium" as const,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-12T10:00:00Z"), // 3 days ago
    readTime: "1 min read",
    isFeatured: false,
  },
  {
    id: "5",
    title: "New Study Material: Current Affairs January 2025",
    content: "Our comprehensive current affairs compilation for January 2025 is now available. This includes all important events, government schemes, and international developments relevant for UPSC preparation.",
    category: "study-material" as const,
    priority: "medium" as const,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-11T10:00:00Z"), // 4 days ago
    readTime: "2 min read",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Interview Preparation Workshop",
    content: "Join our exclusive interview preparation workshop conducted by former IAS officers. Learn the art of personality development and interview techniques from the experts.",
    category: "course-launch" as const,
    priority: "low" as const,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    publishedAt: new Date("2025-01-10T10:00:00Z"), // 5 days ago
    readTime: "3 min read",
    isFeatured: false,
  }
];

const mockCourses = [
  {
    id: "1",
    title: "UPSC Prelims 2025 Complete Course",
    description: "Comprehensive preparation for UPSC Civil Services Prelims 2025 with expert guidance and extensive study material.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-03-01"),
    totalSeats: 100,
    seatsRemaining: 25,
    successRate: 85,
    duration: "6 months",
    price: 25000,
    originalPrice: 30000,
    isSpecialOffer: true,
    features: ["Live Classes", "Mock Tests", "Study Material", "Doubt Sessions"],
    category: "prelims" as const,
  },
  {
    id: "2",
    title: "UPSC Mains 2025 Preparation",
    description: "Advanced preparation for UPSC Civil Services Mains examination with specialized subject coaching.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-04-15"),
    totalSeats: 50,
    seatsRemaining: 15,
    successRate: 78,
    duration: "8 months",
    price: 35000,
    originalPrice: 40000,
    isSpecialOffer: true,
    features: ["Essay Writing", "Answer Writing", "Subject Specialization", "Personal Mentoring"],
    category: "mains" as const,
  },
  {
    id: "3",
    title: "Interview Preparation Program",
    description: "Specialized coaching for UPSC Civil Services Interview with mock interviews and personality development.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-01-20"),
    totalSeats: 30,
    seatsRemaining: 8,
    successRate: 92,
    duration: "2 months",
    price: 15000,
    originalPrice: 18000,
    isSpecialOffer: true,
    features: ["Mock Interviews", "Personality Development", "Current Affairs", "Expert Guidance"],
    category: "interview" as const,
  },
  {
    id: "4",
    title: "Foundation Course for Beginners",
    description: "Perfect starting point for UPSC aspirants with basic concepts and fundamental knowledge building.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-02-01"),
    totalSeats: 80,
    seatsRemaining: 35,
    successRate: 70,
    duration: "12 months",
    price: 20000,
    originalPrice: 25000,
    isSpecialOffer: true,
    features: ["Basic Concepts", "NCERT Coverage", "Regular Tests", "Doubt Clearing"],
    category: "foundation" as const,
  },
  {
    id: "5",
    title: "Test Series 2025",
    description: "Comprehensive test series with detailed analysis and performance tracking for UPSC preparation.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-01-15"),
    totalSeats: 200,
    seatsRemaining: 120,
    successRate: 75,
    duration: "Ongoing",
    price: 5000,
    originalPrice: 6000,
    isSpecialOffer: true,
    features: ["20 Full Tests", "Detailed Analysis", "Performance Tracking", "Video Solutions"],
    category: "test-series" as const,
  },
  {
    id: "6",
    title: "Current Affairs Special",
    description: "Focused preparation on current affairs with daily updates and monthly compilations.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=250&fit=crop",
    batchStartDate: new Date("2025-01-01"),
    totalSeats: 150,
    seatsRemaining: 60,
    successRate: 80,
    duration: "12 months",
    price: 8000,
    originalPrice: 10000,
    isSpecialOffer: true,
    features: ["Daily Updates", "Monthly Compilations", "Topic-wise Analysis", "Practice Questions"],
    category: "prelims" as const,
  }
];

const mockCalendarEvents = [
  {
    id: "1",
    title: "UPSC Prelims 2025",
    description: "Civil Services Preliminary Examination 2025",
    date: new Date("2025-05-26"),
    type: "upsc-exam" as const,
    priority: "high" as const,
    isRecurring: false,
  },
  {
    id: "2",
    title: "Foundation Course Start",
    description: "New batch of foundation course begins",
    date: new Date("2025-02-01"),
    type: "course-start" as const,
    priority: "medium" as const,
    isRecurring: false,
  },
  {
    id: "3",
    title: "Mock Test - Full Length",
    description: "Complete mock test simulating actual UPSC prelims",
    date: new Date("2025-02-15"),
    type: "mock-test" as const,
    priority: "medium" as const,
    isRecurring: true,
    recurringPattern: "monthly" as const,
  },
  {
    id: "4",
    title: "UPSC Application Deadline",
    description: "Last date to submit UPSC 2025 application",
    date: new Date("2025-02-20"),
    type: "application-deadline" as const,
    priority: "high" as const,
    isRecurring: false,
  },
  {
    id: "5",
    title: "Interview Results Expected",
    description: "UPSC CSE 2024 interview results likely to be declared",
    date: new Date("2025-03-15"),
    type: "result-date" as const,
    priority: "high" as const,
    isRecurring: false,
  }
];

export default function Home() {
  const router = useRouter();
  const { state } = useContentManagement();
  const [firebaseNewsItems, setFirebaseNewsItems] = useState<NewsItem[]>([]);
  const [firebaseCourses, setFirebaseCourses] = useState<Course[]>([]);
  const [firebaseCalendarEvents, setFirebaseCalendarEvents] = useState<CalendarEvent[]>([]);
  const [showLaunchPopup, setShowLaunchPopup] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Load data from Firebase when features are enabled
  useEffect(() => {
    const loadData = async () => {
      try {
        if (state.newsSectionEnabled) {
          const newsData = await ContentManagementService.getNewsItems();
          setFirebaseNewsItems(newsData);
        }
        if (state.courseShowcaseEnabled) {
          const coursesData = await ContentManagementService.getCourses();
          setFirebaseCourses(coursesData);
        }
        if (state.calendarEnabled) {
          const eventsData = await ContentManagementService.getCalendarEvents();
          setFirebaseCalendarEvents(eventsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [state.newsSectionEnabled, state.courseShowcaseEnabled, state.calendarEnabled]);

  // Show launch popup after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLaunchPopup(true);
    }, 2000); // Show popup after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle rocket scroll to CUET section
  const handleRocketScroll = () => {
    setIsScrolling(true);
    setShowLaunchPopup(false);
    
    // Add rocket animation class to body
    document.body.classList.add('rocket-scroll');
    
    setTimeout(() => {
      const cuetSection = document.getElementById('cuet-section');
      if (cuetSection) {
        cuetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Remove rocket class after animation
      setTimeout(() => {
        document.body.classList.remove('rocket-scroll');
        setIsScrolling(false);
      }, 1500);
    }, 500);
  };

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      
      {/* CUET Launch Section */}
      <section id="cuet-section" className="relative py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
                <span>🎓</span>
                <span>NEW COURSE LAUNCH</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Oswald'] text-secondary">
                CUET <span className="text-white">Preparation</span>
              </h2>
              
              <p className="text-xl mb-8 text-secondary leading-relaxed">
                The gateway to admissions in top Central, State, and Private Universities across India. 
                Join our comprehensive CUET preparation program designed by experts.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-secondary font-medium">Expert Faculty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-secondary font-medium">Personalized Mentorship</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-secondary font-medium">Mock Tests & Analysis</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-secondary">₹9,500</div>
                  <div className="text-sm text-secondary/80">Special Launch Price</div>
                </div>
                <button 
                  onClick={() => router.push('/cuet')}
                  className="bg-secondary text-white hover:bg-secondary/90 font-bold px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Explore CUET Program →
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-center text-secondary font-['Oswald']">Program Highlights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <span className="text-secondary font-medium">Language, Domain & General Test Coverage</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <span className="text-secondary font-medium">Daily Interactive Classes</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <span className="text-secondary font-medium">Weekly All-India Mock Tests</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <span className="text-secondary font-medium">One-to-One Mentorship</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-secondary/80 text-sm mb-2">Perfect for Class 11 & 12 students</p>
                  <p className="text-secondary font-bold">Limited Seats Available!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {state.newsSectionEnabled && (
        <ClientOnly>
          <NewsUpdatesSection newsItems={firebaseNewsItems.length > 0 ? firebaseNewsItems : mockNewsItems} />
        </ClientOnly>
      )}
      {state.courseShowcaseEnabled && (
        <ClientOnly>
          <CourseShowcaseCarousel 
            courses={firebaseCourses.length > 0 ? firebaseCourses : mockCourses} 
            onEnroll={(courseId) => {
              // Redirect to courses page
              router.push('/courses');
            }}
          />
        </ClientOnly>
      )}
      {state.calendarEnabled && (
        <ClientOnly>
          <InteractiveCalendar events={firebaseCalendarEvents.length > 0 ? firebaseCalendarEvents : mockCalendarEvents} />
        </ClientOnly>
      )}
      <CoursesSection />
      <CommunitySection />
      <VisionSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Launch Popup */}
      {showLaunchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-yellow-50 via-yellow-100 to-orange-50 rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-500 border border-yellow-200">
            {/* Close button */}
            <button
              onClick={() => setShowLaunchPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-300 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🚀</span>
              </div>
              
              <h3 className="text-2xl font-bold text-secondary mb-2 font-['Oswald']">
                New Course Launched!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Exciting news! We've launched our new <span className="font-bold text-secondary">CUET Preparation Program</span> designed specifically for university entrance exams.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleRocketScroll}
                  disabled={isScrolling}
                  className={`w-full py-3 px-6 rounded-full font-bold text-white transition-all duration-300 transform ${
                    isScrolling 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-yellow-300 to-red-200 hover:from-yellow-400 hover:to-red-300 hover:scale-105 shadow-lg'
                  }`}
                >
                  {isScrolling ? '🚀 Flying to CUET...' : '🚀 Explore CUET Program'}
                </button>
                
                <button
                  onClick={() => setShowLaunchPopup(false)}
                  className="w-full py-2 px-6 rounded-full font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rocket Animation Styles */}
      <style jsx global>{`
        .rocket-scroll {
          animation: rocketFly 2s ease-in-out;
        }
        
        @keyframes rocketFly {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(-5deg);
          }
          50% {
            transform: translateY(-40px) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
