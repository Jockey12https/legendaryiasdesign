"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const youtubeVideos = [
  {
    id: 1,
    title: "IAS Success Story - From Preparation to Selection",
    videoId: "0M-NmVcpqyc",
    thumbnail: "https://img.youtube.com/vi/0M-NmVcpqyc/maxresdefault.jpg",
    description: "Watch how our student achieved their IAS dream through dedicated preparation"
  },
  {
    id: 2,
    title: "UPSC Preparation Strategy - Complete Guide",
    videoId: "D_tg_0NSzN0",
    thumbnail: "https://img.youtube.com/vi/D_tg_0NSzN0/maxresdefault.jpg",
    description: "Comprehensive strategy for UPSC Civil Services examination"
  },
  {
    id: 3,
    title: "Current Affairs Analysis - Latest Updates",
    videoId: "6WxwvoW68Ec",
    thumbnail: "https://img.youtube.com/vi/6WxwvoW68Ec/maxresdefault.jpg",
    description: "Stay updated with the latest current affairs for UPSC"
  },
  {
    id: 4,
    title: "Interview Preparation Tips - Expert Guidance",
    videoId: "bbjxqN4Uo9w",
    thumbnail: "https://img.youtube.com/vi/bbjxqN4Uo9w/maxresdefault.jpg",
    description: "Expert tips for UPSC interview preparation and success"
  },
  {
    id: 5,
    title: "Optional Subject Selection - Strategic Approach",
    videoId: "fpnRYrFJn1E",
    thumbnail: "https://img.youtube.com/vi/fpnRYrFJn1E/maxresdefault.jpg",
    description: "How to choose the right optional subject for UPSC mains"
  }
];

export default function CommunitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === youtubeVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isVideoPlaying]);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? youtubeVideos.length - 1 : prevIndex - 1
    );
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === youtubeVideos.length - 1 ? 0 : prevIndex + 1
    );
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoPlay = (videoId: string) => {
    setCurrentVideoId(videoId);
    setIsVideoPlaying(true);
    setIsPlaying(false); // Pause auto-slide when video is playing
  };

  const handleVideoClose = () => {
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
    setIsPlaying(true); // Resume auto-slide when video is closed
  };

  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-secondary font-['Oswald']">
          Join Our Community Today!
        </h2>
        <h3 className="text-xl font-bold mb-8 text-center text-secondary uppercase tracking-wide">
          Watch Our YouTube Videos
        </h3>

        <div className="relative mx-auto max-w-4xl bg-white rounded-lg overflow-hidden shadow-xl">
          {/* Main Slider */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {youtubeVideos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => handleVideoPlay(video.videoId)}
                        className="group p-6 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-110"
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

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-lg md:text-xl font-bold mb-2">{video.title}</h4>
                      <p className="text-sm md:text-base opacity-90">{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {/*<button
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
          </button>*/}

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {youtubeVideos.map((_, index) => (
              <button
                key={`video-dot-${index}`}
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
              style={{ width: `${((currentIndex + 1) / youtubeVideos.length) * 100}%` }}
            />
          </div>
        </div>

        {/* YouTube Video Modal */}
        {isVideoPlaying && currentVideoId && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={handleVideoClose}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
              >
                ✕
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                  title="YouTube video player"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

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