"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent } from "@/utils/contentManagementService";

interface InteractiveCalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const eventIcons = {
  'upsc-exam': AlertCircle,
  'course-start': BookOpen,
  'mock-test': Clock,
  'application-deadline': Calendar,
  'result-date': Users
};

const eventColors = {
  'upsc-exam': 'bg-red-100 text-red-800 border-red-200',
  'course-start': 'bg-green-100 text-green-800 border-green-200',
  'mock-test': 'bg-blue-100 text-blue-800 border-blue-200',
  'application-deadline': 'bg-orange-100 text-orange-800 border-orange-200',
  'result-date': 'bg-purple-100 text-purple-800 border-purple-200'
};

const eventLabels = {
  'upsc-exam': 'UPSC Exam',
  'course-start': 'Course Start',
  'mock-test': 'Mock Test',
  'application-deadline': 'Deadline',
  'result-date': 'Result'
};

export default function InteractiveCalendar({ events = [], onEventClick }: InteractiveCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentDate(new Date());
  }, []);

  if (!isMounted || !currentDate) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
              Interactive Calendar
            </h2>
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === currentMonth;
      const isToday = date.toDateString() === currentDateObj.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayEvents = getEventsForDate(date);

      days.push({
        date,
        isCurrentMonth,
        isToday,
        isSelected,
        events: dayEvents
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const upcomingEvents = getUpcomingEvents();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      if (!prev) return new Date();
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
            Important Dates Calendar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track UPSC exam dates, course schedules, mock tests, and application deadlines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{monthNames[currentMonth]} {currentYear}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                        min-h-[80px] p-2 border border-gray-200 cursor-pointer transition-colors
                        ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50'}
                        ${day.isToday ? 'bg-primary/10 border-primary' : ''}
                        ${day.isSelected ? 'bg-primary/20 border-primary' : ''}
                      `}
                    >
                      <div className="text-sm font-medium mb-1">
                        {day.date.getDate()}
                      </div>
                      
                      {/* Events */}
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map(event => {
                          const Icon = eventIcons[event.type];
                          return (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick?.(event);
                              }}
                              className={`
                                text-xs p-1 rounded border ${eventColors[event.type]}
                                cursor-pointer hover:opacity-80 transition-opacity
                              `}
                            >
                              <div className="flex items-center space-x-1">
                                <Icon className="h-2 w-2" />
                                <span className="truncate">{event.title}</span>
                              </div>
                            </div>
                          );
                        })}
                        {day.events.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500 text-sm">No upcoming events</p>
                  ) : (
                    upcomingEvents.map(event => {
                      const Icon = eventIcons[event.type];
                      return (
                        <div
                          key={event.id}
                          onClick={() => onEventClick?.(event)}
                          className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className="h-4 w-4 mt-0.5 text-gray-600" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <Badge className={eventColors[event.type]}>
                                  {eventLabels[event.type]}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              </div>
                              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                                {event.title}
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Event Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(eventLabels).map(([type, label]) => {
                    const Icon = eventIcons[type as keyof typeof eventIcons];
                    return (
                      <div key={type} className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <Badge className={eventColors[type as keyof typeof eventColors]}>
                          {label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
