import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img src="https://ext.same-assets.com/2651817114/1248459215.png" alt="Logo" className="h-8 w-8 text-orange-400 mr-2" />
              <span className="text-2xl font-bold">Legendary IAS Mentor</span>
            </div>
            <p className="text-blue-200 mb-6">
              Leading institute for UPSC preparation with expert guidance from our legendary mentors. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" 
      rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com/" target="_blank" 
      rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/legendaryiasmentor/" target="_blank" 
      rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/@Legendary-ias-mentor" target="_blank" 
      rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-blue-200 hover:text-orange-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Courses</a>
              </li>
              <li>
                <a href="#about" className="text-blue-200 hover:text-orange-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#testimonials" className="text-blue-200 hover:text-orange-400 transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#faq" className="text-blue-200 hover:text-orange-400 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-blue-200 hover:text-orange-400 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#enroll" className="text-blue-200 hover:text-orange-400 transition-colors">Enroll Now</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Our Courses</h3>
            <ul className="space-y-3">
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Comprehensive UPSC Course</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Prelims Special Batch</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Interview Guidance Program</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Optional Subject Courses</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Test Series</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Weekend Batches</a>
              </li>
              <li>
                <a href="#courses" className="text-blue-200 hover:text-orange-400 transition-colors">Online Study Materials</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <address className="not-italic text-blue-200 space-y-3">
              <p>Legendary IAS Mentor Civil Service Academy, 2nd Floor, Mudumbil,<br />Tower Plamood signal, Plamoodu, Road, Pattom,Thiruvananthapuram, Kerala 695004</p>
              <p>
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">+91-8129313575</a>
              </p>
              <p>
                <a href="mailto:info@legendaryiasmentor.com" className="hover:text-orange-400 transition-colors">legendaryiasmentor@gmail.com</a>
              </p>
            </address>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Subscribe to Our Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 bg-blue-800 text-white placeholder-blue-300 border border-blue-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400 flex-grow"
                />
                <button 
                  type="button" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Legendary IAS Mentor. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-300 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-300 hover:text-orange-400 text-sm transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;