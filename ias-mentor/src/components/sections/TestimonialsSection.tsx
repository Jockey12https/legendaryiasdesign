"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, SetStateAction } from "react";

const clientTestimonials = [
  {
    id: 1,
    name: "Robert Rose",
    role: "Product Designer",
    quote: "Testimonials provide a sense of what it's like to work with you, or what it's like to use your products and services.",
    image: "https://ext.same-assets.com/2651817114/1670980876.png"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    quote: "The level of professionalism and attention to detail exceeded our expectations. Highly recommend their services.",
    image: "https://ext.same-assets.com/2651817114/1670980876.png"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Business Owner",
    quote: "Working with this team has been a game-changer for our business. Their expertise is unmatched.",
    image: "https://ext.same-assets.com/2651817114/1670980876.png"
  }
];

const studentTestimonials = [
  {
    id: 1,
    name: "Ananya Roy",
    quote: "The guidance and resources provided by Legendary IAS Mentor have been instrumental in my success journey. I highly recommend their courses to all IAS aspirants."
  },
  {
    id: 2,
    name: "Karan Sharma",
    quote: "I am immensely grateful to the mentors at Legendary IAS Mentor for their unwavering support and personalized attention. Their approach has truly enhanced my preparation."
  },
  {
    id: 3,
    name: "Neha Patel",
    quote: "Joining Legendary IAS Mentor was a game-changer for me. The insightful guidance and comprehensive study materials have significantly boosted my confidence and performance."
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    quote: "The structured approach and expert mentorship provided here helped me clear the exam on my first attempt. Forever grateful!"
  },
  {
    id: 5,
    name: "Priya Gupta",
    quote: "Exceptional teaching methodology and constant motivation from the faculty made my IAS preparation journey smooth and successful."
  }
];

export default function TestimonialsSection() {
  const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  // Auto-slide for client testimonials (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientIndex((prevIndex) => 
        prevIndex === clientTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-slide for student testimonials (continuous infinite scroll)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStudentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToClientSlide = (index: SetStateAction<number>) => {
    setCurrentClientIndex(index);
  };

  const goToStudentSlide = (index: SetStateAction<number>) => {
    setCurrentStudentIndex(index);
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Client Testimonials Slider */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
            Our Clients Say
          </h2>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentClientIndex * 100}%)` }}
            >
              {clientTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden mx-2">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex flex-col h-full justify-center">
                        <p className="text-xl italic mb-4 text-gray-700">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonials Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {clientTestimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`h-2 w-2 rounded-full p-0 border-secondary transition-colors duration-300 ${
                  currentClientIndex === index ? 'bg-secondary' : 'bg-transparent'
                }`}
                onClick={() => goToClientSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Student Testimonials Slider */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
            Student Testimonials
          </h2>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-linear"
              style={{ transform: `translateX(-${(currentStudentIndex * 100) / 3}%)` }}
              onTransitionEnd={() => {
                if (currentStudentIndex >= studentTestimonials.length) {
                  setCurrentStudentIndex(0);
                }
              }}
            >
              {/* Render testimonials twice for seamless loop */}
              {[...studentTestimonials, ...studentTestimonials].map((testimonial, index) => (
                <div key={`${testimonial.id}-${Math.floor(index / studentTestimonials.length)}`} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <Card className="bg-white border-none shadow-sm h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 text-4xl text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 mb-4 italic flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <p className="font-bold text-secondary">
                        {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Student Testimonials Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {studentTestimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`h-2 w-2 rounded-full p-0 border-secondary transition-colors duration-300 ${
                  (currentStudentIndex % studentTestimonials.length) === index ? 'bg-secondary' : 'bg-transparent'
                }`}
                onClick={() => goToStudentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}