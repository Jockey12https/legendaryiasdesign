"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-secondary font-bold text-xl mb-4">Contact Information</h3>
            <p className="text-secondary mb-2"> Legendary IAS Mentor Civil Service Academy, 2nd Floor, Mudumbil,<br />Tower Plamood signal, Plamoodu, Road, Pattom,Thiruvananthapuram, Kerala 695004</p>
            <p className="text-secondary mb-2">
              <a href="tel:+918129313575" className="hover:text-primary">
                +91-8129313575
              </a>
            </p>
            <p className="text-secondary">
              <a href="mailto:legendaryiasmentor@gmail.com" className="hover:text-primary">
                legendaryiasmentor@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="mb-4 text-center md:text-right">
              <h4 className="text-secondary font-bold text-lg mb-2">Legendary IAS Mentor</h4>
              <p className="text-secondary text-sm max-w-xs">
                Leading institute for UPSC preparation with expert guidance from our legendary mentors. Your success is our mission.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/legendaryiasmentor/" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </Button>
              </Link>
              <Link href="https://www.youtube.com/@Legendary-ias-mentor" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Legendary IAS Mentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
