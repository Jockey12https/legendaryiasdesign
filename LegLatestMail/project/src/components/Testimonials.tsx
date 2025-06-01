import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-blue-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Hear from our students who cracked the UPSC examination with flying colors.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-6 md:mb-0 md:mr-8">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-24 h-24 object-cover rounded-full mx-auto md:mx-0 border-4 border-blue-100"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                          ))}
                        </div>
                        
                        <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                        
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
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg focus:outline-none z-10 hover:bg-gray-100 transition-colors md:-translate-x-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-blue-900" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg focus:outline-none z-10 hover:bg-gray-100 transition-colors md:translate-x-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-blue-900" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-blue-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Join Our Growing List of Successful Candidates</h3>
          <a 
            href="#enroll" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-all transform hover:scale-105"
          >
            Start Your Success Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;