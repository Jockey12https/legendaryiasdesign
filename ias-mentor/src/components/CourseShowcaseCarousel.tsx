"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Calendar, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/utils/contentManagementService";

interface CourseShowcaseCarouselProps {
  courses?: Course[];
  onEnroll?: (courseId: string) => void;
}

const categoryColors = {
  prelims: 'bg-blue-100 text-blue-800',
  mains: 'bg-green-100 text-green-800',
  interview: 'bg-purple-100 text-purple-800',
  foundation: 'bg-orange-100 text-orange-800',
  'test-series': 'bg-red-100 text-red-800'
};

const categoryLabels = {
  prelims: 'Prelims',
  mains: 'Mains',
  interview: 'Interview',
  foundation: 'Foundation',
  'test-series': 'Test Series'
};

export default function CourseShowcaseCarousel({ courses = [], onEnroll }: CourseShowcaseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalSlides = Math.ceil(courses.length / 3);
  const maxSlide = totalSlides - 1;

  const nextSlide = () => {
    setCurrentSlide(prev => prev === maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? maxSlide : prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isMounted, isAutoPlaying, currentSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getCurrentCourses = () => {
    const startIndex = currentSlide * 3;
    return courses.slice(startIndex, startIndex + 3);
  };

  const getSeatsPercentage = (remaining: number, total: number) => {
    return Math.round((remaining / total) * 100);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
            Featured Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our comprehensive UPSC preparation programs designed by expert mentors
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous courses"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next courses"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentCourses().map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className={categoryColors[course.category]}>
                      {categoryLabels[course.category]}
                    </Badge>
                    {course.isSpecialOffer && (
                      <Badge className="bg-red-600 text-white">
                        Special Offer
                      </Badge>
                    )}
                  </div>

                  {/* Success Rate */}
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{course.successRate}%</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Course Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Batch Starts:</span>
                      </div>
                      <span className="font-semibold">
                        {new Date(course.batchStartDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Duration:</span>
                      </div>
                      <span className="font-semibold">{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Seats:</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{course.seatsRemaining} left</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              getSeatsPercentage(course.seatsRemaining, course.totalSeats) > 50 
                                ? 'bg-green-500' 
                                : getSeatsPercentage(course.seatsRemaining, course.totalSeats) > 20 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${getSeatsPercentage(course.seatsRemaining, course.totalSeats)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        ₹{course.price.toLocaleString()}
                      </span>
                      {course.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => onEnroll?.(course.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Enroll Now
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {course.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
