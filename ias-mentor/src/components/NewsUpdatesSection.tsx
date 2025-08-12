"use client";

import { useState } from "react";
import { Bell, Calendar, BookOpen, Trophy, FileText, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsItem } from "@/utils/contentManagementService";

interface NewsUpdatesSectionProps {
  newsItems?: NewsItem[];
  onViewAll?: () => void;
}

const categoryIcons = {
  'upsc-update': Calendar,
  'course-launch': BookOpen,
  'success-story': Trophy,
  'important-date': Calendar,
  'study-material': FileText
};

const categoryColors = {
  'upsc-update': 'bg-blue-100 text-blue-800',
  'course-launch': 'bg-green-100 text-green-800',
  'success-story': 'bg-yellow-100 text-yellow-800',
  'important-date': 'bg-purple-100 text-purple-800',
  'study-material': 'bg-orange-100 text-orange-800'
};

const categoryLabels = {
  'upsc-update': 'UPSC Update',
  'course-launch': 'New Course',
  'success-story': 'Success Story',
  'important-date': 'Important Date',
  'study-material': 'Study Material'
};

export default function NewsUpdatesSection({ newsItems = [], onViewAll }: NewsUpdatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayCount, setDisplayCount] = useState(6);

  const categories = ['all', ...Object.keys(categoryLabels)];
  
  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const displayedNews = filteredNews.slice(0, displayCount);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
            News & Updates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest UPSC notifications, course launches, success stories, and important dates
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category === 'all' ? 'All News' : categoryLabels[category as keyof typeof categoryLabels]}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNews.map((item) => {
            const Icon = categoryIcons[item.category];
            return (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                {item.image && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-red-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={categoryColors[item.category]}>
                      {categoryLabels[item.category]}
                    </Badge>
                    {item.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{item.readTime}</span>
                    </div>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:underline">
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More / View All */}
        {displayedNews.length < filteredNews.length && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="px-8"
            >
              Load More News
            </Button>
          </div>
        )}

        {onViewAll && (
          <div className="text-center mt-8">
            <Button onClick={onViewAll} className="px-8">
              View All News & Updates
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
