"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const successStories = [
  {
    id: 1,
    title: "Success Story 1",
    image: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
    description: "Watch how our student achieved their IAS dream"
  },
  {
    id: 2,
    title: "Success Story 2", 
    image: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
    description: "Another inspiring journey to success"
  },
  {
    id: 3,
    title: "Success Story 3",
    image: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
    description: "From preparation to selection - a complete story"
  },
  {
    id: 4,
    title: "Success Story 4",
    image: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
    description: "Excellence through dedication and guidance"
  },
  {
    id: 5,
    title: "Success Story 5",
    image: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
    description: "Breaking barriers and achieving dreams"
  }
];

export default function CommunitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-secondary font-['Oswald']">
          Join Our Community Today!
        </h2>
        <h3 className="text-xl font-bold mb-8 text-center text-secondary uppercase tracking-wide">
          Watch Our Success Stories
        </h3>

        <div className="relative mx-auto max-w-4xl bg-white rounded-lg overflow-hidden shadow-xl">
          {/* Main Slider */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {successStories.map((story) => (
                <div key={story.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handlePlayPause}
                        className="group p-6 bg-black/70 hover:bg-black/90 rounded-full transition-all duration-300 transform hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-12 h-12 group-hover:w-14 group-hover:h-14 transition-all duration-300"
                        >
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </button>
                    </div>

                    {/* Story Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-lg md:text-xl font-bold mb-2">{story.title}</h4>
                      <p className="text-sm md:text-base opacity-90">{story.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handlePlayPause}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                {isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / successStories.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-primary mt-4 px-8 py-2 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
  );
}