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
              Our Vision
            </h2>
            <p className="text-gray-300 mb-6">
              At Legendary IAS Mentor, our vision is to empower aspirants with the knowledge, skills,
              and confidence to achieve excellence in the civil services examinations. We are committed
              to providing a supportive and enriching learning environment that fosters growth and success.
            </p>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Read More
            </Button>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="https://ext.same-assets.com/2651817114/3574790180.jpeg"
              alt="Our Vision"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
