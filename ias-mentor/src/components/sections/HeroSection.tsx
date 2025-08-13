"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";
import { CheckCircle, Users, Award, BookOpen, Clock, Target } from "lucide-react";

export default function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation complete after initial animations
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      title: "Expert Mentors",
      description: "Learn from experienced IAS officers and subject matter experts"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Curriculum",
      description: "Structured learning path covering all UPSC subjects"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personalized Guidance",
      description: "One-on-one mentoring tailored to your learning style"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to materials"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Proven Results",
      description: "Track record of successful IAS candidates"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Mock Tests",
      description: "Regular assessments to evaluate your progress"
    }
  ];

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
        style={{
          backgroundImage: "url(https://ext.same-assets.com/2651817114/1408891149.jpeg)",
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-0"></div>

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
            <motion.p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Legendary IAS Mentor is a leading online academy for individuals aspiring to excel in
              the field of civil services. Our platform provides comprehensive courses and expert
              guidance to help students achieve success in the IAS examinations.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Join us to embark on a transformative learning journey and unlock your true potential.
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
