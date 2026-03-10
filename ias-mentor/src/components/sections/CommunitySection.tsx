"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: 13,
    title: "Anusha A S — AIR 284 | IAS 2025 Result",
    videoId: "VX7vfhMVuqU",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/VX7vfhMVuqU/hqdefault.jpg",
    description: "Celebrating our student Anusha A S who achieved AIR 284 in IAS 2025 — Legendary IAS Mentor"
  },
  {
    id: 14,
    title: "Anusha A S — Journey to AIR 284 | Motivational",
    videoId: "",
    videoSrc: "https://ik.imagekit.io/8vvkoi3dt/Result/VID-20260307-WA0024.mp4?updatedAt=1773153410598",
    type: "mp4" as const,
    thumbnail: "https://ik.imagekit.io/8vvkoi3dt/Result/Anusha.jpg",
    objectPosition: "50% 36%",
    description: "A glimpse into the inspiring journey behind AIR 284 — Legendary IAS Mentor"
  },
  {
    id: 15,
    title: "The Road to Success — Strategic Intervention | Legendary IAS",
    videoId: "",
    videoSrc: "https://ik.imagekit.io/8vvkoi3dt/Result/VID-20260307-WA0038.mp4?updatedAt=1773153453536",
    type: "mp4" as const,
    thumbnail: "https://ik.imagekit.io/8vvkoi3dt/Result/Screenshot%202026-03-10%20204353.png",
    objectPosition: "50% 10%",  // ← move up/down: lower % = higher in image, higher % = lower
    objectScale: 0.95,  // ← zoom: 1 = normal, 1.5 = 50% zoomed in
    description: "Strategic intervention and guidance for every UPSC aspirant — never give up on your dream"
  },
  {
    id: 10,
    title: "UPSC Guidance - Video 1",
    videoId: "IqOWXAC3H10",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/IqOWXAC3H10/maxresdefault.jpg",
    description: "Expert guidance and insights for UPSC aspirants"
  },
  {
    id: 11,
    title: "UPSC Guidance - Video 2",
    videoId: "91FmHWZ811w",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/91FmHWZ811w/maxresdefault.jpg",
    description: "Comprehensive UPSC preparation strategies and tips"
  },
  {
    id: 12,
    title: "UPSC Guidance - Video 3",
    videoId: "6QTexVT3HqU",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/6QTexVT3HqU/maxresdefault.jpg",
    description: "In-depth UPSC coaching and mentorship insights"
  },
  {
    id: 9,
    title: "Interview Preparation Tips - Expert Guidance",
    videoId: "bbjxqN4Uo9w",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/bbjxqN4Uo9w/maxresdefault.jpg",
    description: "Expert tips for UPSC interview preparation and success"
  },
  {
    id: 1,
    title: "Paulson Sir - Expert Guidance",
    videoId: "aBaYt_uA2a0",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/aBaYt_uA2a0/maxresdefault.jpg",
    description: "Learn from Paulson Sir's expert guidance and teaching methodology"
  },
  {
    id: 2,
    title: "Paulson Sir - Advanced Strategies",
    videoId: "YETVg2K_rvk",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/YETVg2K_rvk/maxresdefault.jpg",
    description: "Advanced UPSC preparation strategies by Paulson Sir"
  },
  {
    id: 3,
    title: "Nitin Chakravarthy Sir - Success Insights",
    videoId: "egZ3vsu0CWw",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/egZ3vsu0CWw/maxresdefault.jpg",
    description: "Success insights and preparation tips from Nitin Chakravarthy Sir"
  },
  {
    id: 4,
    title: "Dr. Vineeth AIR 169 - Success Story",
    videoId: "b8c4p33fxZM",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/b8c4p33fxZM/hqdefault.jpg",
    description: "Inspiring success story of Dr. Vineeth who achieved AIR 169"
  },
  {
    id: 8,
    title: "Current Affairs Analysis - Latest Updates",
    videoId: "6WxwvoW68Ec",
    videoSrc: "",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/6WxwvoW68Ec/hqdefault.jpg",
    description: "Stay updated with the latest current affairs for UPSC"
  },
];

export default function CommunitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string | null>(null);
  const [currentVideoType, setCurrentVideoType] = useState<"youtube" | "mp4">("youtube");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || isVideoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
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
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
    setCurrentVideoSrc(null);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
    setCurrentVideoSrc(null);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoPlay = (videoId: string, videoSrc: string, type: "youtube" | "mp4") => {
    setCurrentVideoId(videoId);
    setCurrentVideoSrc(videoSrc);
    setCurrentVideoType(type);
    setIsVideoPlaying(true);
    setIsPlaying(false);
  };

  const handleVideoClose = () => {
    setIsVideoPlaying(false);
    setCurrentVideoId(null);
    setCurrentVideoSrc(null);
    setIsPlaying(true);
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
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Click handlers for desktop navigation
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // If click is in left half, go to previous; right half, go to next
    if (clickX < width / 2) {
      goToPrevious();
    } else {
      goToNext();
    }
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
          <div
            className="relative overflow-hidden cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: (video as { objectPosition?: string }).objectPosition ?? "center",
                        transform: `scale(${(video as { objectScale?: number }).objectScale ?? 1})`,
                        transformOrigin: "center center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Play Button — bottom-right so it never covers faces */}
                    <div className="absolute bottom-20 right-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlay(video.videoId, video.videoSrc, video.type);
                        }}
                        className="group p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-8 h-8 group-hover:w-10 group-hover:h-10 transition-all duration-300"
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
            {videos.map((_, index) => (
              <button
                key={`video-dot-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
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
              style={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Video Modal — supports YouTube and MP4 */}
        {isVideoPlaying && (currentVideoId || currentVideoSrc) && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={handleVideoClose}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
              >
                ✕
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {currentVideoType === "mp4" ? (
                  <video
                    key={currentVideoSrc ?? ""}
                    src={currentVideoSrc ?? ""}
                    autoPlay
                    controls
                    playsInline
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                    title="YouTube video player"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
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