"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Blog data
const blogPosts = [
  {
    id: "blog-1",
    title: "Why Legendary IAS Mentor is the Best IAS Academy in Kerala",
    slug: "why-legendary-ias-mentor-best-ias-academy-kerala",
    excerpt: "Discover why Legendary IAS Mentor is recognized as the #1 IAS Academy in Kerala. Expert faculty, proven success rates, and comprehensive study material for UPSC preparation.",
    content: "When it comes to choosing the best IAS academy in Kerala, aspirants are often overwhelmed with options. However, Legendary IAS Mentor has consistently emerged as the #1 IAS Academy in Kerala...",
    author: "Legendary IAS Mentor",
    authorRole: "Leading IAS Academy",
    date: "January 15, 2025",
    category: "IAS Academy",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    featured: true
  },
  {
    id: "blog-2",
    title: "Complete Guide to UPSC Preparation in Kerala",
    slug: "complete-guide-upsc-preparation-kerala",
    excerpt: "Master UPSC preparation in Kerala with our comprehensive guide. Expert tips, study strategies, and resources for IAS aspirants in Kerala.",
    content: "Kerala has emerged as a hub for UPSC preparation with its excellent educational infrastructure and dedicated aspirants. This comprehensive guide will help you navigate your IAS preparation journey...",
    author: "Legendary IAS Mentor",
    authorRole: "Leading IAS Academy",
    date: "January 16, 2025",
    category: "UPSC Preparation",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    featured: true
  },
  {
    id: "blog-3",
    title: "How to Prepare for UPSC Prelims in 3 Months",
    slug: "prepare-upsc-prelims-3-months",
    excerpt: "A focused strategy to maximize your preparation in the crucial last 3 months before the UPSC Preliminary examination.",
    content: "The last three months before your UPSC Prelims can be crucial in determining your success. Here's how to make the most of this time...",
    author: "Dr. Rajesh Kumar",
    authorRole: "Senior Faculty & UPSC Expert",
    date: "April 8, 2025",
    category: "Exam Strategy",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: "blog-4",
    title: "Mastering Optional Subjects: Economics & Public Administration",
    slug: "mastering-optionals-economics-public-admin",
    excerpt: "A comprehensive guide to scoring high in two popular optional subjects that can boost your overall UPSC CSE score.",
    content: "Selecting the right optional subject is one of the most important decisions in your UPSC journey...",
    author: "Priya Sharma",
    authorRole: "Economics Faculty",
    date: "April 2, 2025",
    category: "Optional Subjects",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: "blog-5",
    title: "Current Affairs: How to Stay Updated Without Getting Overwhelmed",
    slug: "current-affairs-stay-updated",
    excerpt: "Practical tips to efficiently track and remember important current events for your UPSC preparation.",
    content: "Current affairs form the backbone of UPSC preparation, but the sheer volume of information can be daunting...",
    author: "Amit Verma",
    authorRole: "Current Affairs Specialist",
    date: "March 27, 2025",
    category: "Current Affairs",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: "blog-6",
    title: "Effective Answer Writing Techniques for UPSC Mains",
    slug: "effective-answer-writing-upsc-mains",
    excerpt: "Learn the art of crafting compelling answers that impress UPSC examiners and boost your Mains score.",
    content: "The difference between an average and a top-scoring candidate often comes down to answer writing skills...",
    author: "Dr. Sunil Gupta",
    authorRole: "Essay & Answer Writing Expert",
    date: "March 22, 2025",
    category: "Answer Writing",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true
  },
  {
    id: "blog-7",
    title: "Mental Health During UPSC Preparation: Self-Care Strategies",
    slug: "mental-health-upsc-preparation",
    excerpt: "Crucial advice on maintaining mental well-being during the challenging journey of UPSC preparation.",
    content: "The UPSC preparation journey can be mentally and emotionally taxing. Here's how to maintain your mental equilibrium...",
    author: "Dr. Meena Sharma",
    authorRole: "Counseling Psychologist",
    date: "March 18, 2025",
    category: "Mental Health",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: "blog-8",
    title: "Geography for UPSC: Maps, Diagrams, and Conceptual Understanding",
    slug: "geography-upsc-maps-diagrams",
    excerpt: "A visual approach to mastering Geography for both Prelims and Mains examinations.",
    content: "Geography is a visual subject that requires a different approach compared to text-heavy subjects...",
    author: "Prof. Karthik Rao",
    authorRole: "Geography Expert",
    date: "March 12, 2025",
    category: "Subject Guide",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  }
];

// Categories for filtering
const categories = [
  "All",
  "IAS Academy",
  "UPSC Preparation",
  "Exam Strategy",
  "Optional Subjects",
  "Current Affairs",
  "Answer Writing",
  "Mental Health",
  "Subject Guide"
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Get featured posts for the hero section
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div>
      {/* Blog Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            IAS Preparation Blog
          </motion.h1>
          <motion.p
            className="text-lg max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Expert insights, tips, and strategies to help you succeed in your UPSC journey.
          </motion.p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-primary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-['Oswald']">Featured Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative h-60 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 flex-nowrap md:flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-primary text-secondary border-primary"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 h-full"
                  variants={itemVariants}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-4">{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-800">{post.author}</p>
                        <p className="text-gray-500">{post.authorRole}</p>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="link" className="text-primary p-0 h-auto">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No articles found matching your criteria.</p>
              <Button onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary text-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-['Oswald']">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-8 text-gray-300">
              Get the latest UPSC preparation tips, current affairs summaries, and study resources
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-primary text-secondary hover:bg-primary/90 whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
