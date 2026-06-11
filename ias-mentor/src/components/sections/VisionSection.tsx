"use client";

import Link from "next/link";
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
            <p className="text-gray-300 mb-4 text-lg leading-relaxed">
              <strong className="text-white">Legendary IAS Mentor</strong> was built with one clear goal — to be the <strong className="text-white">best IAS academy in Kerala</strong> where ambition meets achievement. Furthermore, we bridge the gap between hard work and results through dedicated <strong className="text-white">IAS mentorship</strong> at every step of the Civil Services journey.
            </p>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              As a trusted <strong className="text-white">IAS academy in Kerala</strong>, we understand that clearing the UPSC exam requires more than persistence — it needs the right guidance at the right time. Consequently, every aspirant here receives personal care from experienced <strong className="text-white">UPSC mentors</strong> who know their strengths, challenges, and potential to serve the nation.
            </p>

            <Button
              variant="outline"
              className="border-white text-black"
              asChild
            >
              <Link href="/about">Read More</Link>
            </Button>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="https://ik.imagekit.io/8vvkoi3dt/Legendary/legendary%20%20(2).jpg?tr=f-webp,q-80,w-800,h-600"
              alt="Best IAS Academy in Kerala - Legendary IAS Mentor UPSC Coaching"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
