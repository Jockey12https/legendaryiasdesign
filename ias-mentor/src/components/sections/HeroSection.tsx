"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";
import { CheckCircle, Users, Award, BookOpen, Clock, Target } from "lucide-react";

export default function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  // Hero background images from gallery
  const heroBackgrounds = [
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/Screenshot%202025-09-25%20194331.png?updatedAt=1758809650757",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/prelims%20success%20celebration.JPG?updatedAt=1758808336753",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC04701.jpg?updatedAt=1758807359686",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC04886.jpg?updatedAt=1758807130762",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/prelims2024%20.jpg?updatedAt=1758808312982",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC_3606.JPG?updatedAt=1758807209431",
    "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC05642.jpg?updatedAt=1758807366990"
  ];

  useEffect(() => {
    // Set animation complete after initial animations
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  const handleEnrollNow = () => {
    if (user) {
      // User is logged in, redirect to courses
      router.push('/courses');
    } else {
      // User is not logged in, open auth modal
      setIsAuthModalOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personal Mentorship",
      description: "Personal mentorship by UPSC toppers, IAS mentors & expert faculty"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Strategic Preparation",
      description: "Strategic UPSC preparation tailored to individual strengths"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Coaching",
      description: "Comprehensive IAS coaching for Prelims, Mains & Interview"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Focus Areas",
      description: "Focus on answer writing, current affairs, and conceptual clarity"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Proven Success",
      description: "Proven success in producing IAS, IPS, and IFS officers in a short time"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to materials"
    }
  ];

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBackgroundIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBackgrounds[currentBackgroundIndex]})`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </AnimatePresence>
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-0"></div>
      
      {/* Background Navigation Dots */}
      <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBackgroundIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentBackgroundIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-24 max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 font-['Oswald'] uppercase tracking-wide text-primary leading-tight"
              variants={itemVariants}
            >
             Legendary IAS Mentor
            </motion.h1>
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-white"
              variants={itemVariants}
            >
              #1 Best IAS Academy in Kerala
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Legendary IAS Mentor is the <strong>#1 IAS Academy in Kerala</strong> and among the <strong>Best UPSC coaching institutes in India</strong>. With expert faculty, proven success rates, and comprehensive study material, we help aspirants achieve their IAS dreams.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Join us with successful IAS aspirants who chose the <strong>best IAS academy in Trivandrum</strong> for their UPSC preparation journey.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                variant="default"
                size="lg"
                className="bg-primary text-secondary hover:bg-primary/90 transform transition-transform duration-300 hover:scale-105"
                onClick={handleEnrollNow}
              >
                {user ? 'View Courses' : 'Enroll Now'}
              </Button>
            </motion.div>
          </div>
          
          {/* Key Features Grid */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-black/60 p-3 sm:p-4 rounded-lg border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:bg-black/80 group cursor-pointer"
                  variants={itemVariants}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="text-primary group-hover:text-primary/80 transition-colors duration-300 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Additional CTA */}
            <motion.div
              className="text-center pt-4"
              variants={itemVariants}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-400 mb-3">
                Ready to start your IAS journey?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-secondary"
                onClick={handleEnrollNow}
              >
                {user ? 'Explore Courses' : 'Get Started Today'}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="bg-primary text-primary w-full py-2 sm:py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-8 sm:mx-16 text-xs sm:text-sm font-semibold uppercase">New Admission Open</div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="register"
      />
    </section>
  );
}
