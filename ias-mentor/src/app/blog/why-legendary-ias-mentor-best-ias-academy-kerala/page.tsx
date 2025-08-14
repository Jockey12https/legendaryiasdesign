import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, BookOpen, Clock, Target, Star } from "lucide-react";
import SEOStructuredData from "@/components/SEOStructuredData";

export const metadata: Metadata = {
  title: "Legendary IAS Mentor - Why We're the Best IAS Academy in Kerala | 2025 Guide",
  description: "Discover why Legendary IAS Mentor is recognized as the #1 IAS Academy in Kerala. Expert faculty, proven success rates, comprehensive study material, and personalized guidance for UPSC preparation.",
  keywords: [
    "Best IAS Academy in Kerala",
    "IAS Academy Ernakulam", 
    "UPSC Coaching Kerala",
    "Best UPSC Institute India",
    "Civil Services Coaching Kerala",
    "IAS Academy Near Me",
    "UPSC Preparation Kerala"
  ],
  openGraph: {
    title: "Legendary IAS Mentor - Why We're the Best IAS Academy in Kerala | 2025 Guide",
    description: "Discover why Legendary IAS Mentor is recognized as the #1 IAS Academy in Kerala. Expert faculty, proven success rates, comprehensive study material.",
    type: 'article',
    publishedTime: '2025-01-15T10:00:00Z',
    authors: ['Legendary IAS Mentor'],
    images: ['https://ext.same-assets.com/2651817114/1248459215.png'],
  },
};

export default function BlogPost() {
  return (
    <>
      <SEOStructuredData type="article" />
      
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Link href="/blog" className="text-primary hover:text-primary/80 mb-4 inline-block">
              ← Back to Blog
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['Oswald']">
            Why Legendary IAS Mentor is the <span className="text-primary">Best IAS Academy in Kerala</span> | 2025 Guide
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>By Legendary IAS Mentor</span>
            <span>•</span>
            <span>January 15, 2025</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
          
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
              alt="Best IAS Academy in Kerala - Legendary IAS Mentor"
              fill
              className="object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8">
            When it comes to choosing the <strong>best IAS academy in Kerala</strong>, aspirants are often overwhelmed with options. 
            However, <strong>Legendary IAS Mentor</strong> has consistently emerged as the <strong>#1 IAS Academy in Kerala</strong> 
            and among the <strong>best UPSC coaching institutes in India</strong>. But what makes us stand out? Let's explore the 
            comprehensive reasons why thousands of successful IAS aspirants choose Legendary IAS Mentor.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">🏆 Proven Track Record: Success Stories That Speak</h2>
          
          <p className="mb-6">
            Our success rate speaks volumes about our commitment to excellence. With hundreds of students clearing UPSC examinations 
            and securing top ranks, including the remarkable achievement of <strong>AIR 45 in CSE 2024</strong>, we have established 
            ourselves as the <strong>best IAS academy in Ernakulam</strong> and beyond.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Success Highlights:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span><strong>AIR 45 in CSE 2024</strong> - Our student Priya Sharma's remarkable achievement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span><strong>85% success rate</strong> in UPSC Prelims 2024</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span><strong>500+ successful candidates</strong> in the last 5 years</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span><strong>92% interview success rate</strong> for our interview preparation program</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-primary">👨‍🏫 Expert Faculty: The Backbone of Our Success</h2>
          
          <p className="mb-6">
            What truly sets us apart as the <strong>best IAS academy in Kerala</strong> is our exceptional faculty team. 
            Our mentors include former IAS officers, PhD holders, and subject matter experts with years of experience in UPSC preparation.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">📚 Comprehensive Study Material: Your Complete Resource</h2>
          
          <p className="mb-6">
            As the <strong>best UPSC coaching institute in Kerala</strong>, we provide comprehensive study material that covers 
            every aspect of the UPSC examination including structured curriculum, current affairs compilation, practice questions, 
            and detailed analysis of previous year papers.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">🎯 Personalized Guidance: One-on-One Mentoring</h2>
          
          <p className="mb-6">
            Unlike other coaching institutes, we believe in personalized attention. Our <strong>IAS academy in Ernakulam</strong> 
            offers individual mentoring, custom study plans, regular assessments, and 24/7 doubt clearing support.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">💻 Modern Learning Infrastructure</h2>
          
          <p className="mb-6">
            As the <strong>best IAS academy in Kerala</strong>, we leverage technology to provide the best learning experience 
            with live online classes, recorded lectures, mobile app access, regular mock tests, and interactive discussion forums.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">📍 Strategic Location: Best IAS Academy in Ernakulam</h2>
          
          <p className="mb-6">
            Located in the heart of <strong>Ernakulam</strong>, our academy is easily accessible from all parts of Kerala. 
            Our central location makes us the <strong>best IAS academy near me</strong> for students from Kochi, Trivandrum, 
            Calicut, and other major cities in Kerala.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">💰 Affordable Excellence: Value for Money</h2>
          
          <p className="mb-6">
            Quality education shouldn't be expensive. Our <strong>UPSC coaching in Kerala</strong> offers the best value for money 
            with foundation courses starting at ₹20,000 and prelims courses at ₹25,000, with special discounts for deserving students.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-primary">⭐ Student Reviews: What Our Students Say</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">"Legendary IAS Mentor is truly the best IAS academy in Kerala. The faculty is exceptional and the study material is comprehensive."</p>
                <div className="font-semibold">- Priya Sharma, AIR 45 CSE 2024</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">"The personalized guidance and mock tests were game-changers for my preparation. Highly recommended!"</p>
                <div className="font-semibold">- Rahul Kumar, CSE 2024</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-primary">🚀 Take the First Step Towards Your IAS Dream</h2>
          
          <p className="mb-8">
            Ready to join the <strong>best IAS academy in Kerala</strong>? Don't let your dreams wait. 
            Contact Legendary IAS Mentor today and take the first step towards becoming an IAS officer.
          </p>

          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Start Your IAS Journey Today</h3>
            <p className="mb-6">Join thousands of successful aspirants who chose Legendary IAS Mentor</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/courses">View Courses</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  <Link href="/blog/complete-guide-upsc-preparation-kerala" className="hover:text-primary">
                    Complete Guide to UPSC Preparation in Kerala
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">Everything you need to know about preparing for UPSC in Kerala</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  <Link href="/blog/success-stories-ias-officers" className="hover:text-primary">
                    Success Stories: How Our Students Became IAS Officers
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">Inspiring stories of students who achieved their IAS dreams</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>
    </>
  );
}
