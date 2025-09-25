"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const mentors = [
  {
    id: 1,
    name: "Nitin Chakravarthy",
    position: "Chief Mentor & Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/nitin%20sir_new1.jpg?updatedAt=1755003315847"
  },
  {
    id: 2,
    name: "Elsa Baby",
    position: "Senior Mentor",
    image:"https://ik.imagekit.io/8vvkoi3dt/ELSA%20BABY%20UPSC%20Faculty.jpg?updatedAt=1758805693395"
  },
  {
    id: 3,
    name: "Paulson Baby",
    position: "Expert UPSC Mentor & Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/PAULSON%20.JPG?updatedAt=1758474931488"
  },
  {
    id: 4,
    name: "Rose Binoy",
    position: "Senior Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-2.jpg?updatedAt=1755003315782"
  },
  {
    id: 5,
    name: "Antony John",
    position: "Expert Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-10.jpg?updatedAt=1755003315793"
  },
  {
    id: 6,
    name: "Adithya G Mohan",
    position: "Senior Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-4.jpg?updatedAt=1755003315787"
  },
  {
    id: 7,
    name: "Azeem Akram",
    position: "Expert Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-1.jpg?updatedAt=1755003315843"
  },
  {
    id: 8,
    name: "Akhil V K",
    position: "Senior Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-11.jpg?updatedAt=1755003315865"
  },
  {
    id: 9,
    name: "Gowrisankar B",
    position: "CUET Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/GOWRISANKAR%20B%20%20CUET%20FACULTY.JPG?updatedAt=1758474933317"
  },
  {
    id: 10,
    name: "Parvathy",
    position: "Indian Polity Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/Parvathy%20Indian%20polity%20faculty.JPG?updatedAt=1758474933196"
  },
  {
    id: 11,
    name: "Taniya Elizabeth",
    position: "CUET Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/TANIYA%20ELIZABETH%20CUET%20FACULTY.JPG?updatedAt=1758474796113"
  },
  {
    id: 12,
    name: "Sreekuttan",
    position: "CUET Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/SREEKUTTAN%20CUET%20FACULTY.JPG?updatedAt=1758474684946"
  },
  {
    id: 13,
    name: "Amritha Nair",
    position: "CUET Faculty",
    image: "https://ik.imagekit.io/8vvkoi3dt/AMRITHA%20NAIR%20CUET%20FACULTY.JPG?updatedAt=1758474683115"
  }
];

export default function AboutPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive slide calculation
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const totalSlides = isMobile ? mentors.length : Math.ceil(mentors.length / 4);
  const maxSlide = totalSlides - 1;

  const nextSlide = () => {
    setCurrentSlide(prev => prev === maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? maxSlide : prev - 1);
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
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Click handlers for desktop navigation
  const handleCarouselClick = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    const rect = carouselRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const carouselWidth = rect.width;
    const clickPosition = clickX / carouselWidth;
    
    // Click on left half = previous slide, right half = next slide
    if (clickPosition < 0.5) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleEnrollClick = () => {
    router.push('/courses');
  };

  return (
    <div>
      {/* Welcome Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-['Oswald']">
            Welcome to Legendary IAS Mentor
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-center">
            Legendary IAS mentor is an initiative of nationally reputed civil service faculties and mentors having high success rate in civil service examinations. Our team consists of Renowned Faculties, IAS Rank Holders, Subject Experts, Alumni from Premium Institutions like IITs and renowned faculties from Delhi and Calcutta providing wide exposure of experience. 
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Oswald'] text-secondary">
                Join Us
              </h2>
              <p className="text-secondary mb-8">
              We believe that individual attention, strategic UPSC preparation, and structured study plans are the keys to cracking the IAS, IPS, and IFS exams. With proven methodologies, in-depth subject expertise, and continuous motivation, we ensure that every aspirant is equipped with the right tools to excel in UPSC Prelims, Mains, and Interview.
              </p>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="https://ext.same-assets.com/2003590844/4277505869.jpeg"
                alt="Join Us"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Mentors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Oswald']">
            Meet Our Mentors
          </h2>

          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="overflow-hidden cursor-pointer select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleCarouselClick}
            >
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {isMobile ? (
                  // Mobile: Show one mentor at a time with full width
                  mentors.map((mentor) => (
                    <div key={mentor.id} className="w-full flex-shrink-0">
                      <div className="text-center group px-4">
                        <div className="relative h-96 w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                              mentor.id === 1 ? 'object-top' : mentor.id === 2 ? 'object-[center_20%]' : ''
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.position}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Desktop: Show 4 mentors per slide (original behavior)
                  <>
                    {/* First Slide - Mentors 1-4 */}
                    <div className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.slice(0, 4).map((mentor) => (
                          <div 
                            key={mentor.id} 
                            className="text-center group"
                          >
                            <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                            <Image
                              src={mentor.image}
                              alt={mentor.name}
                              fill
                              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                mentor.id === 1 ? 'object-top' : mentor.id === 2 ? 'object-[center_25%]' : ''
                              }`}
                            />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.position}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Second Slide - Mentors 5-8 */}
                    <div className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.slice(4, 8).map((mentor) => (
                          <div 
                            key={mentor.id} 
                            className="text-center group"
                          >
                            <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                              <Image
                                src={mentor.image}
                                alt={mentor.name}
                                fill
                                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                  mentor.id === 1 ? 'object-top' : mentor.id === 2 ? 'object-top' : ''
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.position}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Third Slide - Mentors 9-12 */}
                    <div className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.slice(8, 12).map((mentor) => (
                          <div 
                            key={mentor.id} 
                            className="text-center group"
                          >
                            <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                              <Image
                                src={mentor.image}
                                alt={mentor.name}
                                fill
                                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                  mentor.id === 1 ? 'object-top' : mentor.id === 2 ? 'object-top' : ''
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.position}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fourth Slide - Mentor 13 */}
                    <div className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.slice(12, 13).map((mentor) => (
                          <div 
                            key={mentor.id} 
                            className="text-center group"
                          >
                            <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                              <Image
                                src={mentor.image}
                                alt={mentor.name}
                                fill
                                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                  mentor.id === 1 ? 'object-top' : mentor.id === 2 ? 'object-top' : ''
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.position}</p>
                          </div>
                        ))}
                        {/* Empty divs to maintain grid layout */}
                        <div className="hidden lg:block"></div>
                        <div className="hidden lg:block"></div>
                        <div className="hidden lg:block"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>



            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
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
    </div>
  );
}
