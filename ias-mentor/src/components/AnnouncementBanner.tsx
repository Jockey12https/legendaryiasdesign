"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X, Bell, Calendar, BookOpen, Trophy, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useContentManagement } from "@/contexts/ContentManagementContext";
import { ContentManagementService, Announcement } from "@/utils/contentManagementService";

interface AnnouncementBannerProps {
  announcements: Announcement[];
  isEnabled: boolean;
  onToggleAnnouncement?: (id: string, isActive: boolean) => void;
}

const categoryIcons = {
  urgent: Bell,
  'upsc-update': Calendar,
  'course-launch': BookOpen,
  'success-story': Trophy,
  'important-date': Calendar,
  'study-material': FileText
};

const categoryColors = {
  urgent: 'bg-red-600',
  'upsc-update': 'bg-blue-600',
  'course-launch': 'bg-green-600',
  'success-story': 'bg-yellow-600',
  'important-date': 'bg-purple-600',
  'study-material': 'bg-orange-600'
};

const categoryLabels = {
  urgent: 'Urgent',
  'upsc-update': 'UPSC Update',
  'course-launch': 'New Course',
  'success-story': 'Success Story',
  'important-date': 'Important Date',
  'study-material': 'Study Material'
};

export default function AnnouncementBanner({ announcements, isEnabled, onToggleAnnouncement }: AnnouncementBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [firebaseAnnouncements, setFirebaseAnnouncements] = useState<Announcement[]>([]);
  const { state } = useContentManagement();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load announcements from Firebase
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await ContentManagementService.getAnnouncements();
        setFirebaseAnnouncements(data);
      } catch (error) {
        console.error('Error loading announcements:', error);
      }
    };

    if (state.announcementsEnabled) {
      loadAnnouncements();
    }
  }, [state.announcementsEnabled]);

  // Use Firebase data if available, otherwise use props
  const activeAnnouncements = firebaseAnnouncements.length > 0 
    ? firebaseAnnouncements.filter(announcement => announcement.isActive)
    : announcements.filter(announcement => announcement.isActive);

  useEffect(() => {
    if (activeAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnnouncementIndex((prev) => 
          prev === activeAnnouncements.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activeAnnouncements.length]);

  if (!isMounted || !state.announcementsEnabled || activeAnnouncements.length === 0 || !isVisible) {
    return null;
  }

  const currentAnnouncement = activeAnnouncements[currentAnnouncementIndex];
  const CategoryIcon = categoryIcons[currentAnnouncement.category];

  return (
    <div className="relative">
      {/* Main Announcement Banner */}
      <div className={`${categoryColors[currentAnnouncement.category]} text-white py-2 sm:py-3 px-3 sm:px-4 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                <Badge variant="secondary" className="text-xs w-fit">
                  {categoryLabels[currentAnnouncement.category]}
                </Badge>
                <span className="font-semibold text-xs sm:text-sm truncate">
                  {currentAnnouncement.title}
                </span>
              </div>
              {isExpanded && (
                <p className="text-xs sm:text-sm mt-1 opacity-90">
                  {currentAnnouncement.content}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {activeAnnouncements.length > 1 && (
              <div className="hidden sm:flex space-x-1">
                {activeAnnouncements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAnnouncementIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAnnouncementIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8 p-0"
            >
              {isExpanded ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8 p-0"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Announcements Panel */}
      {isExpanded && (
        <div className="bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activeAnnouncements.map((announcement, index) => {
                const Icon = categoryIcons[announcement.category];
                return (
                  <div
                    key={announcement.id}
                    className={`p-3 sm:p-4 rounded-lg border-l-4 ${categoryColors[announcement.category]} border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer`}
                    onClick={() => setCurrentAnnouncementIndex(index)}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[announcement.category]}
                          </Badge>
                          {announcement.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {announcement.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
