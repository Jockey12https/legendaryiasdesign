import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://ext.same-assets.com/2651817114/79685678.jpeg"
            alt="Hero Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            className="opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Legendary IAS Mentor</h1>
            <p className="text-lg md:text-xl mb-8">
              Legendary IAS Mentor is a leading online academy for individuals aspiring to excel in the field of civil services.
              Our platform provides comprehensive courses and expert guidance to help students achieve success in the IAS examinations.
              Join us to embark on a transformative learning journey and unlock your true potential.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md">
              <Link href="/courses">Enroll Now</Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Request Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-white/20 text-white placeholder-white/70 p-2 rounded-md" />
                <input type="text" placeholder="Last Name" className="bg-white/20 text-white placeholder-white/70 p-2 rounded-md" />
                <input type="email" placeholder="Email" className="bg-white/20 text-white placeholder-white/70 p-2 rounded-md col-span-2" />
                <input type="tel" placeholder="Phone" className="bg-white/20 text-white placeholder-white/70 p-2 rounded-md col-span-2" />
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 col-span-2">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Admission Banner */}
      <section className="bg-primary/20 py-4 overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite]">
          <div className="flex items-center space-x-8 whitespace-nowrap">
            {["civil", "upsc", "ias", "cse", "mains", "prelims", "interview", "optional", "study", "admission"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <span className="font-medium">NEW ADMISSION OPEN</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Course 1 */}
            <Card className="overflow-hidden">
              <CardHeader className="p-6">
                <CardTitle>HSC</CardTitle>
                <CardDescription className="mt-2">Comprehensive Preparation for Civil Services</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-gray-600">
                  Explore our specialized IAS Foundation Course designed to equip aspirants with the necessary knowledge and skills to excel in the UPSC examinations.
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href="/courses" className="text-primary hover:underline font-medium">
                  Read More
                </Link>
              </CardFooter>
            </Card>

            {/* Course 2 */}
            <Card className="overflow-hidden">
              <CardHeader className="p-6">
                <CardTitle>GED</CardTitle>
                <CardDescription className="mt-2">Personalized Guidance for Optional Subjects</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-gray-600">
                  Discover our tailored coaching for optional subjects, delivered by experienced mentors to enhance your preparation and performance.
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href="/courses" className="text-primary hover:underline font-medium">
                  Read More
                </Link>
              </CardFooter>
            </Card>

            {/* Course 3 */}
            <Card className="overflow-hidden">
              <CardHeader className="p-6">
                <CardTitle>ESL</CardTitle>
                <CardDescription className="mt-2">Effective Test Series for Preliminary and Mains Exams</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-gray-600">
                  Access our meticulously designed test series to evaluate your readiness and improve your exam-taking strategies for both preliminary and mains examinations.
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href="/courses" className="text-primary hover:underline font-medium">
                  Read More
                </Link>
              </CardFooter>
            </Card>

            {/* Course 4 */}
            <Card className="overflow-hidden">
              <CardHeader className="p-6">
                <CardTitle>GRC</CardTitle>
                <CardDescription className="mt-2">Guidance for Successful Interview Process</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-gray-600">
                  Prepare for the crucial interview stage with our comprehensive guidance and mock interview sessions conducted by seasoned professionals.
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href="/courses" className="text-primary hover:underline font-medium">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 bg-primary/20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Today!</h2>
          <h3 className="text-xl mb-8">WATCH OUR SUCCESS STORIES</h3>

          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden">
            <div className="relative bg-gray-200 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-8 text-center">
                  <h3 className="font-medium mb-2">Youtube</h3>
                  <p className="text-gray-600">videos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="mb-6">
              At Legendary IAS Mentor, our vision is to empower aspirants with the knowledge, skills, and confidence to achieve excellence in the civil services examinations. We are committed to providing a supportive and enriching learning environment that fosters growth and success.
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
              <Link href="/about">Read More</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-video bg-white/10 rounded-lg overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2651817114/3574790180.jpeg"
                alt="Our Vision"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary/20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Student Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                The guidance and resources provided by Legendary IAS Mentor have been instrumental in my success journey. I highly recommend their courses to all IAS aspirants.
              </p>
              <p className="font-medium">Ananya Roy</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                I am immensely grateful to the mentors at Legendary IAS Mentor for their unwavering support and personalized attention. Their approach has truly enhanced my preparation.
              </p>
              <p className="font-medium">Karan Sharma</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                Joining Legendary IAS Mentor was a game-changer for me. The insightful guidance and comprehensive study materials have significantly boosted my confidence and performance.
              </p>
              <p className="font-medium">Neha Patel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            Connect with Legendary IAS Mentor for expert guidance and support. Embark on your IAS preparation journey with us.
          </p>

          <div className="max-w-2xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="md:col-span-2">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
