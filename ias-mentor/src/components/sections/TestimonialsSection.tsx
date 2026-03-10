"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, SetStateAction } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";

const ANUSHA_VIDEO_SRC = "https://ik.imagekit.io/8vvkoi3dt/Result/VID-20260307-WA0039.mp4?updatedAt=1773153453549";

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
    name: "SABRI SREEPRAKASH",
    position: "UPSC Aspirant",
    quote: "Legendary IAS mains test series, 2024 program has a high predictive power and some questions from it have been actually asked in the Mains examination, 2024. What makes Legendary IAS stands apart from other institutions is their dedicated bodhisattva model of mentorship. This made my second mains journey much more calmer and confident one.",
    rank: "Test Series Success"
  },
  {
    id: 5,
    name: "Sidharth Thottathil",
    position: "UPSC Aspirant",
    quote: "Test Series along with booster classes and PYQ Analysis helped me develop as an aspirant. I am very grateful that I joined Legendary IAS, without which cracking prelims would have been an impossible dream for me.",
    rank: "Prelims Success"
  },
  {
    id: 6,
    name: "AMRUTHA SASIKUMAR",
    position: "UPSC Aspirant",
    quote: "Each Prelims test followed by discussion and individual mentorship, helped me strengthen the prelims game through logic training and content enrichment. The questions are well conformed to the original prelims standards.",
    rank: "Prelims Success"
  },
  {
    id: 7,
    name: "PARVATHY L",
    position: "UPSC Aspirant",
    quote: "The Mains Combat program and Mains Test Series by Legendary IAS Mentor, not only streamlined my preparation, but also provided insightful predictions that mirrored the actual UPSC Mains exam. The detailed evaluations and personalised feedback highlighted my weaknesses and guided me through tasks that strengthened my writing and analytical skills.",
    rank: "Mains Success"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) =>
        prevIndex === studentTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
    if (isRightSwipe) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? studentTestimonials.length - 1 : prevIndex - 1
      );
    }
  };

  // Click handlers for desktop navigation
  const handleCarouselClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const carouselWidth = rect.width;
    const clickPosition = clickX / carouselWidth;

    // Click on left half = previous slide, right half = next slide
    if (clickPosition < 0.5) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? studentTestimonials.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === studentTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
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

        {/* ── Featured Result: Anusha A S AIR 284 ── */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #1a0a00 100%)",
            border: "1px solid rgba(212,175,55,0.35)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-[-3px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #FFD700, #FFA500, #FFE066, #FFD700)",
                  animation: "spinRingT 4s linear infinite",
                  borderRadius: "9999px",
                }}
              />
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
                style={{ border: "3px solid #1a0a00" }}
              >
                <Image
                  src="https://ik.imagekit.io/8vvkoi3dt/Result/Anusha.jpg"
                  alt="Anusha A S — AIR 284"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-2">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "rgba(212,175,55,0.15)", color: "#FFD700", border: "1px solid rgba(212,175,55,0.4)" }}
                >
                  🏆 IAS 2025 Final Result
                </span>
              </div>
              <h3 className="text-white font-black text-xl md:text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Anusha A S
              </h3>
              <p className="font-black text-3xl md:text-4xl my-1"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Oswald', sans-serif",
                }}
              >
                AIR 284
              </p>
              <p className="text-sm md:text-base italic mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                &quot;This achievement is just the beginning. Legendary IAS Mentor gave me the guidance, confidence, and clarity to crack the Civil Services Examination.&quot;
              </p>
            </div>

            {/* Watch Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="group flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#1a1a1a",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                Watch
              </button>
            </div>
          </div>
        </div>

        {/* Result Video Modal */}
        {videoModalOpen && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
              >
                ✕
              </button>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <video
                  key={ANUSHA_VIDEO_SRC}
                  src={ANUSHA_VIDEO_SRC}
                  autoPlay
                  controls
                  playsInline
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                />
              </div>
            </div>
          </div>
        )}
        <div
          className="relative overflow-hidden cursor-pointer select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleCarouselClick}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {studentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
                  <div className={`${testimonial.image ? 'flex flex-col md:flex-row md:items-center' : 'text-center'}`}>
                    {testimonial.image && (
                      <div className="mb-6 md:mb-0 md:mr-8 flex justify-center">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded-full border-4 border-blue-100"
                        />
                      </div>
                    )}

                    <div className={`${testimonial.image ? 'flex-1' : 'w-full'}`}>
                      <div className={`flex items-center mb-4 ${testimonial.image ? '' : 'justify-center'}`}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>

                      <div className={`flex ${testimonial.image ? 'flex-col sm:flex-row sm:items-center justify-between' : 'flex-col items-center'}`}>
                        <div>
                          <h4 className="text-xl font-bold text-secondary mb-1">{testimonial.name}</h4>
                          <p className="text-gray-600 mb-3">{testimonial.position}</p>
                        </div>

                        <div className={`${testimonial.image ? 'mt-3 sm:mt-0' : ''}`}>
                          <span className="inline-block bg-primary text-secondary px-4 py-2 rounded-full font-bold">
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
              className={`h-2 w-2 rounded-full p-0 border-secondary transition-colors duration-300 ${currentIndex === index ? 'bg-secondary' : 'bg-transparent'
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

      <style jsx global>{`
        @keyframes spinRingT {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
