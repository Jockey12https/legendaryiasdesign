"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Oswald']">
              Our Vision: Transforming Civil Services Aspirants into Success Stories
            </h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              <strong className="text-white">Legendary IAS Mentor</strong> was born from a visionary purpose—to bridge the gap between ambition and achievement through <strong className="text-white">unparalleled IAS mentorship</strong>. We believe that clearing the <strong className="text-white">Civil Services exam</strong> is not just about persistence; it's about the right guidance at the right time. Here, every <strong className="text-white">IAS aspirant</strong> is nurtured under the personal care of dedicated <strong className="text-white">UPSC mentors</strong> who understand their journey, their struggles, and their potential to become India's next generation of civil servants.
            </p>
           
            <Button
              variant="outline"
              className="border-white text-black"
            >
              Read More
            </Button>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="https://ext.same-assets.com/2651817114/3574790180.jpeg"
              alt="Legendary IAS Mentor Vision - Civil Services Exam Preparation and UPSC Mentorship"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
