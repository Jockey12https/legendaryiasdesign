"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation complete after initial animations
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    // Show success message or redirect
    alert("Thank you for your interest! We'll contact you soon.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
        style={{
          backgroundImage: "url(https://ext.same-assets.com/2651817114/1408891149.jpeg)",
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-0"></div>

      <div className="relative z-10 py-12 md:py-16 lg:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-['Oswald'] uppercase tracking-wide text-primary"
              variants={itemVariants}
            >
              Legendary IAS Mentor
            </motion.h1>
            <motion.p
              className="text-base md:text-lg mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Legendary IAS Mentor is a leading online academy for individuals aspiring to excel in
              the field of civil services. Our platform provides comprehensive courses and expert
              guidance to help students achieve success in the IAS examinations.
            </motion.p>
            <motion.p
              className="text-base md:text-lg mb-6 md:mb-8 max-w-xl"
              variants={itemVariants}
            >
              Join us to embark on a transformative learning journey and unlock your true potential.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                variant="default"
                size="lg"
                className="bg-primary text-secondary hover:bg-primary/90 transform transition-transform duration-300 hover:scale-105"
              >
                Enroll Now
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="bg-black/60 p-5 md:p-6 rounded-lg border border-gray-700 max-w-md mx-auto lg:ml-auto w-full"
            variants={itemVariants}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    className="bg-transparent border-gray-600 text-white"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    className="bg-transparent border-gray-600 text-white"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-gray-600 text-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  name="phone"
                  placeholder="Phone"
                  className="bg-transparent border-gray-600 text-white"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-secondary hover:bg-primary/90 transform transition-transform duration-300 hover:scale-105"
              >
                Submit
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
      <div className="bg-primary text-secondary w-full py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
          <div className="mx-4 text-sm font-semibold uppercase">New Admission Open</div>
        </div>
      </div>
    </section>
  );
}
