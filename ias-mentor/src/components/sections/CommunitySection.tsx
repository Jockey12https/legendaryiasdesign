"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CommunitySection() {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-secondary font-['Oswald']">
          Join Our Community Today!
        </h2>
        <h3 className="text-xl font-bold mb-8 text-center text-secondary uppercase tracking-wide">
          Watch Our Success Stories
        </h3>

        <div className="relative mx-auto max-w-4xl bg-white rounded-lg overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[300px] md:h-[400px] w-full">
                  <Image
                    src="https://ext.same-assets.com/2651817114/3887927883.jpeg"
                    alt="Success Story"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-6 bg-black/70 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-12 h-12"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              {/* Additional carousel items could be added here */}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-white border-white"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-transparent border-white"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-2 w-2 rounded-full p-0 bg-transparent border-white"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-primary mt-4"
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
  );
}
