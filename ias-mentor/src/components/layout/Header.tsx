"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Shield, ChevronDown, Users, BookOpen, FileText, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AuthModal from "@/components/auth/AuthModal";
import AdminLoginModal from "@/components/auth/AdminLoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Book Online", href: "/book-online" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isAdminAuthenticated, logout: adminLogout, login } = useAdminAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling on body and html
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      
      // Also prevent scrolling on html element
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup function to ensure scrolling is restored
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || 'User';
  };

  const handleLogout = async () => {
    try {
      if (user) {
        await logout();
      } else if (isAdminAuthenticated) {
        adminLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"}`}>
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="flex items-center justify-between h-12 lg:h-12"> {/* Increased mobile height */}
      {/* Logo - responsive sizing */}
      <Link href="/" className="flex items-center h-full translate-x-[-15px] sm:translate-x-[-20px] md:translate-x-[-25px] lg:translate-x-[-30px]">
        <div className="relative h-[4rem] w-[4rem] sm:h-[4rem] sm:w-[4rem] md:h-[4.5rem] md:w-[4.5rem] lg:h-[5rem] lg:w-[5rem]"> {/* Larger mobile logo */}
          <Image
            src="https://ext.same-assets.com/2651817114/1248459215.png"
            alt="Legendary IAS Mentor"
            width={250}
            height={250}
            className="object-contain"
            style={{
              transform: 'scale(1.1) sm:scale(1.08) md:scale(1.1)', // Larger mobile scaling
              transformOrigin: 'left center'
            }}
          />
        </div>

            <span className="text-secondary font-bold text-lg sm:text-base md:text-lg lg:text-2xl uppercase tracking-wider font-['Oswald'] hidden sm:inline-block translate-x-[15px] sm:translate-x-[20px] md:translate-x-[25px] lg:translate-x-[30px]">
              Legendary IAS Mentor
            </span>
            <span className="text-secondary font-bold text-lg uppercase tracking-wider font-['Oswald'] sm:hidden">
              Legendary IAS Mentor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative group whitespace-nowrap ${
                  pathname === item.href ? "text-primary" : "text-secondary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    pathname === item.href ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <span className="text-secondary text-sm hidden lg:inline">+91 8129313575</span>
            <div className="flex space-x-1">
              <Link href="https://www.instagram.com/legendaryiasmentor/" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary hover:text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-3.5 w-3.5">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </Button>
              </Link>
              <Link href="https://www.youtube.com/@Legendary-ias-mentor" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary hover:text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-3.5 w-3.5">
                    <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                  </svg>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/company/" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary hover:text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-3.5 w-3.5">
                    <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </Button>
              </Link>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-7 w-7 rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.photoURL || ''} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a 
                      href="https://legendaryiasmentor.ezexam.in/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Exam</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isAdminAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-secondary/90 flex transition-all text-sm px-3 py-1.5 h-8">
                    <Shield className="mr-1.5 h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Admin</span>
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 sm:w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/payments" className="flex items-center py-2 sm:py-3">
                      <Shield className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Payments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/analytics" className="flex items-center py-2 sm:py-3">
                      <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Analytics</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/manage-courses" className="flex items-center py-2 sm:py-3">
                      <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Manage Courses</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/content-management" className="flex items-center py-2 sm:py-3">
                      <Bell className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Content Management</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="py-2 sm:py-3">
                    <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-secondary/90 hidden sm:flex transition-all text-sm px-3 py-1.5 h-8">
                    <User className="mr-1.5 h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Log In</span>
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 sm:w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={openAuthModal} className="py-2 sm:py-3">
                    <User className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base">User Login</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openAdminModal} className="py-2 sm:py-3">
                    <Shield className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Admin Login</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-secondary" />
            ) : (
              <Menu className="h-6 w-6 text-secondary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        style={{ top: "60px" }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Scrollable container */}
          <div className="overflow-y-auto h-full p-6 overscroll-contain">
            <nav className="flex flex-col space-y-6 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary font-bold" : "text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-4 mb-4">
                <Link href="https://www.instagram.com/legendaryiasmentor/" target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                    </svg>
                  </Button>
                </Link>
                <Link href="https://www.youtube.com/@Legendary-ias-mentor" target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5">
                      <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/company/" target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                      <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </Button>
                </Link>
              </div>
              <p className="text-center text-secondary mb-4">+91 8129313575</p>
              {user ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mx-auto mb-3">
                      <AvatarImage src={user.photoURL || ''} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-base">{getUserDisplayName()}</p>
                    <p className="text-sm text-muted-foreground break-words">{user.email}</p>
                  </div>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/dashboard" className="flex items-center justify-center">
                      <User className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/dashboard/profile" className="flex items-center justify-center">
                      <User className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Profile</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <a 
                      href="https://legendaryiasmentor.ezexam.in/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Exam</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 text-sm sm:text-base text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : isAdminAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <Avatar className="h-12 w-12 mx-auto mb-3">
                      <AvatarFallback className="bg-secondary text-white text-lg">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-base">Admin</p>
                    <p className="text-sm text-muted-foreground">Administrator</p>
                  </div>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/admin/payments" className="flex items-center justify-center">
                      <Shield className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Payments</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/admin/analytics" className="flex items-center justify-center">
                      <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Analytics</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/admin/manage-courses" className="flex items-center justify-center">
                      <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Manage Courses</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 text-sm sm:text-base">
                    <Link href="/admin/content-management" className="flex items-center justify-center">
                      <Bell className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Content Management</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 text-sm sm:text-base text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full h-11 text-sm sm:text-base bg-secondary text-white hover:bg-secondary/90"
                    onClick={openAuthModal}
                  >
                    <User className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>User Login</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 text-sm sm:text-base border-secondary text-secondary hover:bg-secondary hover:text-white"
                    onClick={openAdminModal}
                  >
                    <Shield className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Admin Login</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultMode="login"
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={closeAdminModal}
        onSuccess={() => {
          closeAdminModal();
          // Redirect to admin analytics dashboard
          window.location.href = '/admin/analytics';
        }}
        login={login}
      />
    </header>
  );
}