"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Gallery data
const galleryData = [
  {
    id: 1,
    category: "Campus",
    images: [
      {
        id: "campus-1",
        src: "https://ext.same-assets.com/2651817114/1408891149.jpeg",
        title: "Main Campus Building",
        description: "Our state-of-the-art campus in New Delhi"
      },
      {
        id: "campus-2",
        src: "https://ext.same-assets.com/2003590844/4277505869.jpeg",
        title: "Library",
        description: "Our extensive library with UPSC-focused resources"
      },
      {
        id: "campus-3",
        src: "https://ext.same-assets.com/2651817114/3574790180.jpeg",
        title: "Study Hall",
        description: "Quiet study spaces for focused preparation"
      }
    ]
  },
  {
    id: 2,
    category: "Events",
    images: [
      {
        id: "event-1",
        src: "https://ext.same-assets.com/2651817114/3887927883.jpeg",
        title: "Annual Conference",
        description: "Annual gathering of IAS aspirants and officers"
      },
      {
        id: "event-2",
        src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Orientation Program",
        description: "Welcome session for new batch students"
      },
      {
        id: "event-3",
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Alumni Meet",
        description: "Successful alumni sharing their experiences with current students"
      },
      {
        id: "event-4",
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Workshop",
        description: "Special workshop on Economics by guest faculty"
      }
    ]
  },
  {
    id: 3,
    category: "Success Stories",
    images: [
      {
        id: "success-1",
        src: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Batch of 2023",
        description: "Our successful candidates from the 2023 UPSC CSE"
      },
      {
        id: "success-2",
        src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Rank Holders",
        description: "Students who achieved top 50 ranks in UPSC"
      },
      {
        id: "success-3",
        src: "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Interview Preparation",
        description: "Special interview preparation sessions for Mains qualifiers"
      }
    ]
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                  onClick={() => setActiveCategory(category.id)}
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

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-lg font-bold">{image.title}</h3>
                    <p className="text-gray-200 text-sm">{image.description}</p>
                  </div>
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
                        alt={image.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-black/50 p-4 text-white">
                      <h3 className="text-lg font-bold">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.description}</p>
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
