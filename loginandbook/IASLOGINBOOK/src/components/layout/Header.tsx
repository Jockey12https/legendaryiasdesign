'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary font-medium' : 'text-foreground hover:text-primary';
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex flex-col">
        {/* Wix Banner - Can be removed later */}
        <div className="bg-[#f1f1f1] text-center py-2 px-4 text-sm">
          This site was designed with the <span className="font-bold">Wix.com</span> website builder. Create your website today.
          <button className="ml-2 bg-white border border-black rounded-full px-3 py-1 text-xs">
            Start Now
          </button>
        </div>

        {/* Main Header */}
        <div className="container-custom py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-oswald text-primary-foreground text-xl">IAS</span>
                </div>
                <div className="hidden md:block">
                  <h1 className="font-oswald uppercase text-2xl tracking-wide">Legendary IAS Mentor</h1>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className={`${isActive('/')} transition-colors`}>
                Home
              </Link>
              <Link href="/about" className={`${isActive('/about')} transition-colors`}>
                About
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`${isActive('/courses')} transition-colors`}>
                    Courses
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-md p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/courses" className="cursor-pointer">
                      All Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses?category=programs" className="cursor-pointer">
                      Programs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses?category=study-materials" className="cursor-pointer">
                      Study Materials
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/book-online" className={`${isActive('/book-online')} transition-colors`}>
                Book Online
              </Link>
              <Link href="/gallery" className={`${isActive('/gallery')} transition-colors`}>
                Gallery
              </Link>
              <Link href="/faq" className={`${isActive('/faq')} transition-colors`}>
                FAQ
              </Link>
              <Link href="/contact" className={`${isActive('/contact')} transition-colors`}>
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <p className="text-sm font-medium">123-456-7890</p>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>

              <div>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Link href="/login">Log In</Link>
                </Button>
              </div>

              {/* Mobile menu button - to be implemented with a mobile menu */}
              <button className="md:hidden p-2 rounded-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
