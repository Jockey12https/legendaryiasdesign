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
    position: "Lead Mentor & Founder",
    image: "https://ik.imagekit.io/8vvkoi3dt/nitin%20sir_new1.jpg?updatedAt=1755003315847"
  },
  {
    id: 2,
    name: "Elsa Baby",
    position: "Senior Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-9.jpg?updatedAt=1755003316192"
  },
  {
    id: 3,
    name: "Paulson Baby",
    position: "Expert Mentor",
    image: "https://ik.imagekit.io/8vvkoi3dt/mentor-5.jpg?updatedAt=1755003315739"
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
  }
];

export default function AboutPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalSlides = Math.ceil(mentors.length / 4);
  const maxSlide = totalSlides - 1;

  const nextSlide = () => {
    setCurrentSlide(prev => prev === maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? maxSlide : prev - 1);
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
              Legendary IAS Mentor is dedicated to providing high-quality education and training in
              the field of civil services examination preparation. Our academy is committed to nurturing
              future leaders with the skills and knowledge required to excel in the highly competitive
              IAS exams. We take pride in offering comprehensive study materials, expert guidance, and
              personalized mentorship to help our students achieve their career goals.
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
                Ready to embark on your journey towards becoming an IAS officer?
                Enroll now to gain access to our top-notch study programs and start your
                preparation with the guidance of seasoned mentors who are dedicated to your success.
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
              className="overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
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
                               mentor.id === 1 ? 'object-top' : ''
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
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-gray-800">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
