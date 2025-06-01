import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Enrollment from './components/Enrollment';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="font-sans">
      <Helmet>
  <title>Legendary IAS Mentor</title>
  {/* Standard favicon */}
  <link
    rel="icon"
    type="image/png"
    href="https://ext.same-assets.com/2651817114/1248459215.png"
    sizes="32x32"
  />
  {/* High-resolution for Android */}
  <link
    rel="icon"
    type="image/png"
    href="https://ext.same-assets.com/2651817114/1248459215.png"
    sizes="192x192"
  />
  {/* Apple Touch Icon */}
  <link
    rel="apple-touch-icon"
    href="https://ext.same-assets.com/2651817114/1248459215.png"
  />
</Helmet>


      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <Courses />
      <About />
      <Testimonials />
      <FAQ />
      <Enrollment />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
