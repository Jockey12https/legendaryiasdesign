import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(supabase.auth.getUser());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and Brand Name */}
            <div className="flex items-center flex-shrink-0">
              <img 
                src="https://ext.same-assets.com/2651817114/1248459215.png" 
                alt="Logo" 
                className="h-50 w-50 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold text-blue-900 ml-2 whitespace-nowrap">
                Legendary IAS Mentor
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#home" className="text-blue-800 hover:text-orange-500 font-medium transition">Home</a>
              <a href="#courses" className="text-blue-800 hover:text-orange-500 font-medium transition">Courses</a>
              <a href="#about" className="text-blue-800 hover:text-orange-500 font-medium transition">About</a>
              <a href="#testimonials" className="text-blue-800 hover:text-orange-500 font-medium transition">Success Stories</a>
              <a href="#faq" className="text-blue-800 hover:text-orange-500 font-medium transition">FAQ</a>
              <a href="#contact" className="text-blue-800 hover:text-orange-500 font-medium transition">Contact</a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-blue-800">
                    <User className="h-5 w-5 mr-2" />
                    <span className="truncate max-w-[150px]">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-blue-800 hover:text-orange-500 transition"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center text-blue-800 hover:text-orange-500 transition"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  <span>Login</span>
                </button>
              )}
              <a 
                href="#enroll" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-all transform hover:scale-105 whitespace-nowrap"
              >
                Enroll Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-blue-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-0 right-0 mx-4">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#home" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#courses" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </a>
                <a 
                  href="#about" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#testimonials" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  Success Stories
                </a>
                <a 
                  href="#faq" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </a>
                <a 
                  href="#contact" 
                  className="text-blue-800 hover:text-orange-500 py-2 font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
                {user ? (
                  <>
                    <div className="flex items-center text-blue-800 py-2">
                      <User className="h-5 w-5 mr-2" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center text-blue-800 hover:text-orange-500 py-2 font-medium"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center text-blue-800 hover:text-orange-500 py-2 font-medium"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </button>
                )}
                <a 
                  href="#enroll" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-center" 
                  onClick={() => setIsOpen(false)}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;