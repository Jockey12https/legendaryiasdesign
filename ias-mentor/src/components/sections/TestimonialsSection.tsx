"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const clientTestimonials = [
  {
    id: 1,
    name: "Robert Rose",
    role: "Product Designer",
    quote: "Testimonials provide a sense of what it's like to work with you, or what it's like to use your products and services.",
    image: "https://ext.same-assets.com/2651817114/1670980876.png"
  },
  // Additional testimonials would go here
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
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Client Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
            Our Clients Say
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {clientTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
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
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-secondary border-secondary"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-transparent border-secondary"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-transparent border-secondary"
            />
          </div>
        </div>

        {/* Student Testimonials */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
            Student Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 text-4xl text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-bold text-secondary">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
