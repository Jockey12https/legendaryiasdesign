"use client";

import { useState, useEffect } from "react";
import { Bell, X, ChevronDown, ChevronUp, Clock, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useContentManagement } from "@/contexts/ContentManagementContext";

interface LiveUpdate {
  id: string;
  title: string;
  content: string;
  type: 'upsc-notification' | 'exam-date' | 'study-material' | 'batch-announcement' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  isRead: boolean;
  isActive: boolean;
}

interface LiveUpdatesWidgetProps {
  updates: LiveUpdate[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const updateIcons = {
  'upsc-notification': Info,
  'exam-date': Clock,
  'study-material': CheckCircle,
  'batch-announcement': Bell,
  'urgent': AlertCircle
};

const updateColors = {
  'upsc-notification': 'bg-blue-100 text-blue-800',
  'exam-date': 'bg-purple-100 text-purple-800',
  'study-material': 'bg-green-100 text-green-800',
  'batch-announcement': 'bg-orange-100 text-orange-800',
  'urgent': 'bg-red-100 text-red-800'
};

const updateLabels = {
  'upsc-notification': 'UPSC Update',
  'exam-date': 'Exam Date',
  'study-material': 'Study Material',
  'batch-announcement': 'Batch Update',
  'urgent': 'Urgent'
};

export default function LiveUpdatesWidget({ updates, onMarkAsRead, onDismiss }: LiveUpdatesWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { state } = useContentManagement();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeUpdates = updates.filter(update => update.isActive);

  useEffect(() => {
    const count = activeUpdates.filter(update => !update.isRead).length;
    setUnreadCount(count);
  }, [activeUpdates]);

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead?.(id);
  };

  const handleDismiss = (id: string) => {
    onDismiss?.(id);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (!isMounted || !state.liveUpdatesEnabled || !isVisible || activeUpdates.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50 w-[calc(100vw-1rem)] sm:w-auto sm:max-w-sm">
      {/* Live Updates Toggle Button */}
      <div className="flex justify-end mb-2">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg text-xs sm:text-sm px-3 sm:px-4"
          size="sm"
        >
          <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Live Updates</span>
          <span className="sm:hidden">Updates</span>
          {unreadCount > 0 && (
            <Badge className="ml-1 sm:ml-2 bg-red-600 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
          {isExpanded ? <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" /> : <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />}
        </Button>
      </div>

      {/* Updates Panel */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 sm:max-h-96 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-semibold text-sm sm:text-base">Live Updates</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-600 text-white text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 h-5 w-5 sm:h-6 sm:w-6 p-0"
            >
              <X className="h-2 w-2 sm:h-3 sm:w-3" />
            </Button>
          </div>

          {/* Updates List */}
          <div className="max-h-60 sm:max-h-80 overflow-y-auto">
            {activeUpdates.length === 0 ? (
              <div className="p-3 sm:p-4 text-center text-gray-500 text-sm">
                No updates at the moment
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activeUpdates.map((update) => {
                  const Icon = updateIcons[update.type];
                  return (
                    <div
                      key={update.id}
                      className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors ${
                        !update.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 ${
                          update.type === 'urgent' ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 space-y-1 sm:space-y-0">
                            <Badge className={updateColors[update.type]}>
                              {updateLabels[update.type]}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(update.timestamp)}
                              </span>
                              {update.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  High
                                </Badge>
                              )}
                            </div>
                          </div>
                          <h4 className={`font-semibold text-sm mb-1 ${
                            !update.isRead ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {update.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {update.content}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                            <div className="flex space-x-2">
                              {!update.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(update.id)}
                                  className="text-xs h-6 px-2 text-blue-600 hover:text-blue-800"
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDismiss(update.id)}
                              className="text-xs h-6 px-2 text-gray-500 hover:text-gray-700"
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-3 sm:px-4 py-2 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
              <span>Auto-refresh every 30s</span>
              <span>{activeUpdates.length} updates</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
