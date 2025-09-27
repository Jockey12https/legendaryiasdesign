"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, BookOpen, Target, Award, Clock, TrendingUp, Zap, Shield, Crown, Play } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import WhatsAppPaymentModal from '@/components/payment/WhatsAppPaymentModal';

export default function CUETPage() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  // Show mobile hint when video starts playing
  useEffect(() => {
    if (isVideoPlaying) {
      setShowMobileHint(true);
      // Hide hint after 4 seconds
      const timer = setTimeout(() => {
        setShowMobileHint(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVideoPlaying]);

  const handleEnrollClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setPaymentModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setShowMobileHint(false);
  };

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Faculty",
      description: "Experienced mentors specializing in CUET domains, aptitude, and language sections"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personalized Mentorship",
      description: "One-to-one guidance to strengthen weak areas and enhance performance"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Study Material",
      description: "Updated, exam-oriented notes, mock tests, and practice sheets"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Regular Mock Tests",
      description: "Simulated CUET exams to build accuracy, speed, and confidence"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Batches",
      description: "Online and offline classes designed to suit school/college schedules"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Proven Results",
      description: "Track record of successful admissions in top universities"
    }
  ];

  const programIncludes = [
    "Coverage of Language, Domain Subjects & General Test",
    "Offline and Online classes with interactive sessions",
    "Doubt-clearing support and practice worksheets",
    "Weekly All-India Mock Tests with performance analysis",
    "Exam-specific strategies and time management techniques"
  ];

  const targetAudience = [
    "Class 11 and 12 students preparing for CUET",
    "Students targeting Central Universities (DU, JNU, BHU, etc.)",
    "Aspiring students for top private universities accepting CUET scores"
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 text-lg">
              🎓 NEW COURSE LAUNCH
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Oswald'] bg-gradient-to-r from-yellow-400 via-white to-blue-300 bg-clip-text text-transparent">
              CUET PREPARATION
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              The Common University Entrance Test (CUET) is the gateway to admissions in top Central, State Universities across India.
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              With lakhs of students competing every year, a focused strategy and expert guidance are essential to secure admission in your dream college.
            </p>
            
            {/* Price Highlight */}
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-2xl shadow-2xl">
              <Crown className="h-8 w-8" />
              <span>Special Launch Price</span>
              <div className="text-3xl font-black">₹9,500</div>
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={handleEnrollClick}
              >
                <Zap className="h-6 w-6 mr-3" />
                Join CUET Program Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 md:px-6 py-2 text-sm md:text-lg">
              🎥 WATCH & LEARN
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-['Oswald'] text-gray-900 px-2">
              Discover Our <span className="text-blue-600">CUET Strategy</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Watch our expert faculty explain the CUET preparation approach and get insights into our teaching methodology
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-2 md:px-0">
            {!isVideoPlaying ? (
              /* Video Thumbnail - Show before playing */
              <div className="relative group cursor-pointer rounded-xl md:rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
                <div className="relative aspect-video bg-black">
                  <Image
                    src="https://ik.imagekit.io/8vvkoi3dt/PODCAST%20THUMBNAIL.png?updatedAt=1758560835184"
                    alt="CUET Preparation Strategy Video"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                      <Play className="h-6 w-6 md:h-8 md:w-8 text-white ml-0.5 md:ml-1" fill="currentColor" />
                    </div>
                  </div>

                </div>

                {/* Touch Handler */}
                <div 
                  className="absolute inset-0 z-10 touch-manipulation"
                  onClick={() => setIsVideoPlaying(true)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setIsVideoPlaying(true);
                  }}
                  title="Tap to play video"
                ></div>
              </div>
            ) : (
              /* Embedded YouTube Video */
              <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/i20MlKiWzqQ?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&showinfo=0&cc_load_policy=0&iv_load_policy=3&fs=1&disablekb=0"
                  title="CUET Preparation Strategy Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                
                {/* Close Button - Positioned to not interfere with video controls */}
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-2 md:top-3 right-2 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-black/70 hover:bg-black/90 active:bg-black text-white rounded-full flex items-center justify-center transition-colors duration-200 touch-manipulation text-base md:text-lg font-bold z-10"
                  title="Close video"
                  style={{ 
                    // Ensure close button doesn't overlap with YouTube controls
                    top: '8px',
                    right: '8px'
                  }}
                >
                  ×
                </button>
                
                {/* Mobile Controls Hint - Auto-hide after 4 seconds */}
                {showMobileHint && (
                  <div className="absolute bottom-2 left-2 md:hidden animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                    <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Tap video for pause/controls</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Description */}
            <div className="mt-6 md:mt-8 text-center px-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                CUET Preparation Masterclass
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed">
                Learn from our experienced faculty about effective CUET preparation strategies, 
                time management techniques, and proven methods to excel in all sections of the exam.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  Expert Tips & Strategies
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  Section-wise Guidance
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  Real Exam Insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Oswald'] text-gray-900">
              Why Choose <span className="text-blue-600">LEGENDARY IAS MENTOR</span> for CUET?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring our proven expertise in competitive exam preparation to help you excel in CUET
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Oswald'] text-gray-900">
                Our CUET Program <span className="text-blue-600">Includes:</span>
              </h2>
              
              <div className="space-y-4 mb-8">
                {programIncludes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-xl"
                onClick={handleEnrollClick}
              >
                <Shield className="h-5 w-5 mr-2" />
                Secure Your Spot Now
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Program Highlights</h3>
                  <p className="text-gray-600">Everything you need to succeed in CUET</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Language Section</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Domain Subjects</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                    <span className="font-semibold text-gray-700">General Test</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Mock Tests</span>
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Oswald'] text-gray-900">
              Who Can <span className="text-blue-600">Join?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This program is designed for students who are serious about securing admission in top universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {index === 0 ? "Class 11 & 12" : index === 1 ? "Central Universities" : "Private Universities"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {audience}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Oswald']">
            Ready to Secure Your <span className="text-yellow-400">Dream University?</span>
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful students who have trusted Legendary IAS Mentor for their competitive exam preparation
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
            <div className="text-4xl font-black text-yellow-400 mb-2">₹9,500</div>
            <div className="text-lg text-blue-100 mb-4">Limited Time Special Price</div>
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-200">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Expert Faculty
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Personalized Mentorship
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mock Tests
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={handleEnrollClick}
          >
            <Crown className="h-6 w-6 mr-3" />
            Enroll Now - Limited Seats Available!
          </Button>
          
          <p className="text-sm text-blue-200 mt-4">
            ⚡ Early Bird Discount - Save ₹2,000 on regular price
          </p>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultMode="login"
      />

      {/* Payment Modal */}
      <WhatsAppPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        product={{
          id: 'cuet-program',
          title: 'CUET Preparation Program',
          price: 9500,
          type: 'course',
          description: 'Comprehensive CUET preparation with expert faculty, personalized mentorship, and regular mock tests'
        }}
        onPaymentSuccess={() => setPaymentModalOpen(false)}
      />
    </MainLayout>
  );
}
