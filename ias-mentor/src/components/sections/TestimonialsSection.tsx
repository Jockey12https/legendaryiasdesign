"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, SetStateAction } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";

const studentTestimonials = [
  {
    id: 1,
    name: "MEERA P R",
    position: "IPS Officer",
    image: "https://ik.imagekit.io/8vvkoi3dt/meera%20new.png?updatedAt=1748788309140",
    quote: "From clueless to confident, Legendary IAS Mentor transformed my journey. With great mentors like Paulson sir and Nitin Sir, I cracked Prelims, mastered Mains, and aced my optional- proving success in three months is possible!",
    rank: "AIR 160"
  },
  {
    id: 2,
    name: "ROJA",
    position: "IFS Officer",
    image: "https://ik.imagekit.io/8vvkoi3dt/roja%20ifs_testimonial.png?updatedAt=1748788815928",
    quote: "Following my preliminary exam, IS basically went on the search for a mentor, someone with whom I can genuinely connect and who has the knowledge and patience to help me. I found the right one in Nitin sir. In his role as a mentor, he made time for me even at late hours by putting aside his own needs. He was a huge help to me, especially when it came to my mains answer writing.",
    rank: "AIR 108"
  },
  {
    id: 3,
    name: "Aparna M B",
    position: "IAS Officer",
    image: "https://ik.imagekit.io/8vvkoi3dt/Aparna%20IAS%20AIR%2064.png?updatedAt=1748789061625",
    quote: "Nitin Chakravarthy Sir's mentorship pushed me to excel. His constructive feedback practical solutions, and unwavering commitment helped me improve daily.",
    rank: "AIR 64"
  },
  {
    id: 4,
    name: "ARAVIND J",
    position: "IFoS Officer",
    image: "https://ik.imagekit.io/8vvkoi3dt/Aravind%20IFoS.png?updatedAt=1748789403528",
    quote: "I failed many times. Each time it was not sadness but a feeling or maybe an urge to cross the hurdle. It was simply hard work. I never missed newspapers. It was like a ritual every day. Even while traveling, I used to collect all that learned during the previous days",
    rank: "AIR 22"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Auto-slide for testimonials (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === studentTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const handleStartJourney = () => {
    if (loading) return; // Don't do anything while loading

    if (user) {
      // User is signed in, redirect to courses
      router.push('/courses');
    } else {
      // User is not signed in, open auth modal (same as HeroSection)
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
          Success Stories
        </h2>
        <p className="text-xl text-center text-secondary mb-12 max-w-3xl mx-auto">
          Hear from our students who cracked the UPSC examination with flying colors.
        </p>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {studentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-6 md:mb-0 md:mr-8">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-full mx-auto md:mx-0 border-4 border-blue-100"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-blue-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.position}</p>
                        </div>
                        
                        <div className="mt-3 sm:mt-0">
                          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                            {testimonial.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {studentTestimonials.map((_, index) => (
            <Button
              key={`testimonial-dot-${index}`}
              variant="outline"
              size="sm"
              className={`h-2 w-2 rounded-full p-0 border-secondary transition-colors duration-300 ${
                currentIndex === index ? 'bg-secondary' : 'bg-transparent'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-secondary mb-6">Join Our Growing List of Successful Candidates</h3>
          <Button
            onClick={handleStartJourney}
            disabled={loading}
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-primary px-8 py-3 text-lg font-medium transition-all transform hover:scale-105"
          >
            {loading ? 'Loading...' : user ? 'Browse Courses' : 'Start Your Success Journey'}
          </Button>
        </div>
      </div>

      {/* Auth Modal for non-authenticated users */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
}
