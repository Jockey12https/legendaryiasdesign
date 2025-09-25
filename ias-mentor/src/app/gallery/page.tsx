"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Gallery data
// To adjust image positioning, add an optional 'objectPosition' property to any image
// Examples: "50% 20%" (center top), "50% 10%" (center very top), "center" (default)
// Only add this property to images that need custom positioning
const galleryData = [
  {
    id: 1,
    category: "Campus",
    images: [
      {
        id: "campus-1",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC04907.jpg?updatedAt=1758807366561",
        objectPosition: "50% 20%" // Optional: center top positioning
      },
      {
        id: "campus-2",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC04886.jpg?updatedAt=1758807130762"
      },
      {
        id: "campus-3",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC04767.jpg?updatedAt=1758807131319",
        objectPosition: "50% 42%" 
      },
      {
        id: "campus-4",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/DSC_3606.JPG?updatedAt=1758807209431",
        
      },
    ]
  },
  {
    id: 2,
    category: "Events",
    images: [
      {
        id: "event-3",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC05737.jpg?updatedAt=1758807366561",
        objectPosition: "50% 10%" 
      },
      {
        id: "event-4",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC05642.jpg?updatedAt=1758807366990",
        objectPosition: "50% 15%" // Optional: center top positioning
      },
      {
        id: "event-5",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC06199.jpg?updatedAt=1758807356373"
      },
      {
        id: "event-6",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC05344.jpg?updatedAt=1758807356542"
      },
      {
        id: "event-7",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC06188.jpg?updatedAt=1758807359109"
      },
      {
        id: "event-8",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/DSC04745.jpg?updatedAt=1758807359364"
      }
    ]
  },
  {
    id: 3,
    category: "Success Stories",
    images: [
      {
        id: "success-1",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/photo_2024-04-24_12-19-50.jpg?updatedAt=1758807129719",
        objectPosition: "50% 30%"
      },
      {
        id: "success-2",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/prelims2024%20.jpg?updatedAt=1758808312982"
      },
      {
        id: "success-3",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/pics2/prelims%20success%20celebration.JPG?updatedAt=1758808336753"
      },
      {
        id: "success-4",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/Screenshot%202025-09-25%20194331.png?updatedAt=1758809650757",
        objectPosition: "50% 10%" // Optional: center top positioning for screenshots
      },
      {
        id: "success-5",
        src: "https://ik.imagekit.io/8vvkoi3dt/Legendary/Screenshot%202025-09-25%20194016.png?updatedAt=1758809663628",
        objectPosition: "50% 2%" // Optional: center top positioning for screenshots
      }
    ]
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');

  // Get images from active category
  const activeImages = galleryData.find(cat => cat.id === activeCategory)?.images || [];

  // Function to handle image click for lightbox
  const openLightbox = (imageId: string) => {
    setSelectedImage(imageId);
  };

  // Function to close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Function to handle category change and reset image index
  const handleCategoryChange = (categoryId: number) => {
    setActiveCategory(categoryId);
    setCurrentImageIndex(0);
  };

  // Function to navigate to next image in mobile slider
  const nextImage = () => {
    if (activeImages.length > 1) {
      setAnimationDirection('right');
      setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
    }
  };

  // Function to navigate to previous image in mobile slider
  const prevImage = () => {
    if (activeImages.length > 1) {
      setAnimationDirection('left');
      setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
    }
  };

  // Function to handle click on image areas
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeImages.length <= 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    // If click is on left half, go to previous image
    if (clickX < imageWidth / 2) {
      prevImage();
    } else {
      // If click is on right half, go to next image
      nextImage();
    }
  };

  // Touch/swipe support for mobile slider
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <div>
      {/* Gallery Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-lg max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our campus, events, and success stories through our image gallery.
          </motion.p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
               {galleryData.map((category) => (
                 <button
                   key={category.id}
                   onClick={() => handleCategoryChange(category.id)}
                   className={`px-4 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 ${
                     activeCategory === category.id
                       ? "bg-primary text-secondary font-bold"
                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                   }`}
                 >
                   {category.category}
                 </button>
               ))}
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="block md:hidden">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Image Container with Continuous Animation */}
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-md">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ 
                      x: animationDirection === 'right' ? '100%' : '-100%'
                    }}
                    animate={{ x: 0 }}
                    exit={{ 
                      x: animationDirection === 'right' ? '-100%' : '100%'
                    }}
                    transition={{ 
                      type: "tween", 
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImages[currentImageIndex]?.src || ''}
                      alt="Gallery image"
                      fill
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: activeImages[currentImageIndex]?.objectPosition || 'center' }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Click Areas for Navigation */}
              {activeImages.length > 1 && (
                <>
                  {/* Left Click Area */}
                  <div 
                    className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
                    onClick={handleImageClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />
                  {/* Right Click Area */}
                  <div 
                    className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
                    onClick={handleImageClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />
                </>
              )}

              {/* Tap to Open Lightbox (only when single image) */}
              {activeImages.length === 1 && (
                <div 
                  className="absolute inset-0 cursor-pointer z-20"
                  onClick={() => openLightbox(activeImages[currentImageIndex]?.id || '')}
                />
              )}
            </motion.div>
          </div>

          {/* Desktop Grid */}
          <motion.div
            className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => openLightbox(image.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              >
                 <div className="relative h-64 w-full">
                   <Image
                     src={image.src}
                     alt="Gallery image"
                     fill
                     sizes="(max-width: 1024px) 50vw, 33vw"
                     className="object-cover transition-transform duration-500 group-hover:scale-110"
                     style={{ objectPosition: image.objectPosition || 'center' }}
                   />
                 </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {activeImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] px-4">
            <button
              className="absolute -top-12 right-4 text-white text-2xl font-bold"
              onClick={closeLightbox}
            >
              ✕
            </button>
            {activeImages.map((image) => {
              if (image.id === selectedImage) {
                return (
                  <div key={image.id} className="relative h-full">
                     <div className="relative h-[70vh]">
                       <Image
                         src={image.src}
                         alt="Gallery image"
                         fill
                         className="object-contain"
                         style={{ objectPosition: image.objectPosition || 'center' }}
                       />
                     </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
