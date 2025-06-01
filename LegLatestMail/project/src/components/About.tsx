import React from 'react';
import { Award, Users, BookOpen, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://ik.imagekit.io/8vvkoi3dt/Untitled%20design.png?updatedAt=1748792379731" 
                alt="Our Legendary Mentors" 
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-amber-50/90 p-4 rounded text-black">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-400" />
                  <p className="font-medium">The Pillars of Legendary IAS Mentor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Meet Our Legendary Mentors</h2>
            
            <p className="text-gray-700 mb-6">
              With over 15 years of experience in guiding UPSC aspirants, our mentors have established themselves among India's most respected and successful mentors in the field of civil services coaching.
            </p>
            
            <p className="text-gray-700 mb-6">
              Having mentored thousands of successful candidates, his teaching methodology focuses on conceptual clarity, strategic approach, and personalized guidance to help students achieve their dream of joining the prestigious civil services.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">50+</h3>
                  <p className="text-gray-600">Successful candidates in UPSC</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">15+</h3>
                  <p className="text-gray-600">Years of teaching experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">4.9/5</h3>
                  <p className="text-gray-600">Average student rating</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">20+</h3>
                  <p className="text-gray-600">Recognitions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-8">
              <p className="text-blue-900 italic">
                "Our teaching philosophy is simple - understand each student's unique strengths and weaknesses, and create a personalized strategy that works for them. There is no one-size-fits-all approach in UPSC preparation."
              </p>
              <p className="text-blue-900 font-bold mt-2">- Legendary IAS Mentor</p>
            </div>
            
            <a 
              href="#enroll" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-all transform hover:scale-105"
            >
              Learn from the Best
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;