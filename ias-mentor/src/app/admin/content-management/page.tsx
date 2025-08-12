"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useContentManagement } from "@/contexts/ContentManagementContext";
import { ContentManagementService, Announcement, NewsItem, Course, CalendarEvent } from "@/utils/contentManagementService";
import AddAnnouncementForm from "@/components/AddAnnouncementForm";
import AddNewsForm from "@/components/AddNewsForm";
import AddCourseForm from "@/components/AddCourseForm";
import AddCalendarEventForm from "@/components/AddCalendarEventForm";
import { 
  Bell, 
  Calendar, 
  BookOpen, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Save,
  X,
  Loader2
} from "lucide-react";



export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("announcements");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showCalendarForm, setShowCalendarForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | undefined>();
  const [editingNews, setEditingNews] = useState<NewsItem | undefined>();
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>();
  const { 
    state, 
    setAnnouncementsEnabled, 
    setLiveUpdatesEnabled, 
    setNewsSectionEnabled, 
    setCourseShowcaseEnabled, 
    setCalendarEnabled 
  } = useContentManagement();

  // State for Firebase data
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Load data from Firebase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [announcementsData, newsData, coursesData, eventsData] = await Promise.all([
          ContentManagementService.getAllAnnouncements(),
          ContentManagementService.getNewsItems(),
          ContentManagementService.getCourses(),
          ContentManagementService.getCalendarEvents()
        ]);
        
        console.log('Loaded announcements:', announcementsData);
        setAnnouncements(announcementsData);
        setNewsItems(newsData);
        setCourses(coursesData);
        setCalendarEvents(eventsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggleAnnouncement = async (id: string, isActive: boolean) => {
    try {
      if (id && typeof id === 'string') {
        await ContentManagementService.updateAnnouncement(id, { isActive });
        // Update local state
        setAnnouncements(prev => 
          prev.map(announcement => 
            announcement.id === id 
              ? { ...announcement, isActive } 
              : announcement
          )
        );
      }
    } catch (error) {
      console.error('Error toggling announcement:', error);
    }
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const handleSaveAnnouncement = async (announcement: Announcement) => {
    try {
      if (announcement.id && typeof announcement.id === 'string') {
        await ContentManagementService.updateAnnouncement(announcement.id, announcement);
      } else {
        await ContentManagementService.addAnnouncement(announcement);
      }
      // Refresh announcements
      const updatedAnnouncements = await ContentManagementService.getAllAnnouncements();
      setAnnouncements(updatedAnnouncements);
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  };

  const handleDeleteAnnouncementFromFirebase = async (id: string) => {
    try {
      if (id && typeof id === 'string') {
        await ContentManagementService.deleteAnnouncement(id);
        setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleAddAnnouncement = () => {
    setEditingAnnouncement(undefined);
    setShowAnnouncementForm(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowAnnouncementForm(true);
  };

  const handleAnnouncementSuccess = async () => {
    // Refresh announcements
    const updatedAnnouncements = await ContentManagementService.getAllAnnouncements();
    setAnnouncements(updatedAnnouncements);
  };

  const handleNewsSuccess = async () => {
    // Refresh news items
    const updatedNewsItems = await ContentManagementService.getNewsItems();
    setNewsItems(updatedNewsItems);
  };

  const handleCourseSuccess = async () => {
    // Refresh courses
    const updatedCourses = await ContentManagementService.getCourses();
    setCourses(updatedCourses);
  };

  const handleCalendarSuccess = async () => {
    // Refresh calendar events
    const updatedEvents = await ContentManagementService.getCalendarEvents();
    setCalendarEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage announcements, news, courses, and calendar events</p>
        </div>

        {/* Global Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Global Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="announcements-enabled"
                    checked={state.announcementsEnabled}
                    onCheckedChange={setAnnouncementsEnabled}
                  />
                  <Label htmlFor="announcements-enabled">Enable Announcements Banner</Label>
                </div>
                <Badge variant={state.announcementsEnabled ? "default" : "secondary"}>
                  {state.announcementsEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="live-updates-enabled"
                    checked={state.liveUpdatesEnabled}
                    onCheckedChange={setLiveUpdatesEnabled}
                  />
                  <Label htmlFor="live-updates-enabled">Enable Live Updates Widget</Label>
                </div>
                <Badge variant={state.liveUpdatesEnabled ? "default" : "secondary"}>
                  {state.liveUpdatesEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="news-section-enabled"
                    checked={state.newsSectionEnabled}
                    onCheckedChange={setNewsSectionEnabled}
                  />
                  <Label htmlFor="news-section-enabled">Enable News & Updates Section</Label>
                </div>
                <Badge variant={state.newsSectionEnabled ? "default" : "secondary"}>
                  {state.newsSectionEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="course-showcase-enabled"
                    checked={state.courseShowcaseEnabled}
                    onCheckedChange={setCourseShowcaseEnabled}
                  />
                  <Label htmlFor="course-showcase-enabled">Enable Course Showcase Carousel</Label>
                </div>
                <Badge variant={state.courseShowcaseEnabled ? "default" : "secondary"}>
                  {state.courseShowcaseEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="calendar-enabled"
                    checked={state.calendarEnabled}
                    onCheckedChange={setCalendarEnabled}
                  />
                  <Label htmlFor="calendar-enabled">Enable Interactive Calendar</Label>
                </div>
                <Badge variant={state.calendarEnabled ? "default" : "secondary"}>
                  {state.calendarEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="announcements" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>News & Updates</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar Events</span>
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="mt-6">
            <Card>
              <CardHeader>
                                  <div className="flex items-center justify-between">
                    <CardTitle>Manage Announcements</CardTitle>
                    <Button className="flex items-center space-x-2" onClick={handleAddAnnouncement}>
                      <Plus className="h-4 w-4" />
                      <span>Add Announcement</span>
                    </Button>
                  </div>
              </CardHeader>
                             <CardContent>
                 {isLoading ? (
                   <div className="text-center py-8">
                     <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                     <p>Loading announcements...</p>
                   </div>
                 ) : announcements.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                     <p>No announcements yet. Add your first announcement to get started.</p>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{announcement.title}</h3>
                            <Badge variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}>
                              {announcement.priority}
                            </Badge>
                            <Badge variant="outline">
                              {announcement.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{announcement.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Created: {announcement.createdAt.toLocaleDateString()}</span>
                            {announcement.expiresAt && (
                              <span>Expires: {announcement.expiresAt.toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={announcement.isActive}
                              onCheckedChange={(checked: boolean) => announcement.id && handleToggleAnnouncement(announcement.id, checked)}
                            />
                            {announcement.isActive ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditAnnouncement(announcement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => announcement.id && handleDeleteAnnouncementFromFirebase(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                                                 </div>
                       </div>
                     </div>
                   ))}
                   </div>
                 )}
               </CardContent>
            </Card>
          </TabsContent>

                     {/* News Tab */}
           <TabsContent value="news" className="mt-6">
             <Card>
               <CardHeader>
                 <div className="flex items-center justify-between">
                   <CardTitle>Manage News & Updates</CardTitle>
                   <Button className="flex items-center space-x-2" onClick={() => {
                     setEditingNews(undefined);
                     setShowNewsForm(true);
                   }}>
                     <Plus className="h-4 w-4" />
                     <span>Add News Item</span>
                   </Button>
                 </div>
               </CardHeader>
               <CardContent>
                 {isLoading ? (
                   <div className="text-center py-8">
                     <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                     <p>Loading news items...</p>
                   </div>
                 ) : newsItems.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                     <p>No news items yet. Add your first news item to get started.</p>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {newsItems.map((newsItem) => (
                       <div
                         key={newsItem.id}
                         className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                       >
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <div className="flex items-center space-x-2 mb-2">
                               <h3 className="font-semibold text-lg">{newsItem.title}</h3>
                               <Badge variant={newsItem.priority === 'high' ? 'destructive' : 'secondary'}>
                                 {newsItem.priority}
                               </Badge>
                               <Badge variant="outline">
                                 {newsItem.category}
                               </Badge>
                               {newsItem.isFeatured && (
                                 <Badge variant="default" className="bg-yellow-500">
                                   Featured
                                 </Badge>
                               )}
                             </div>
                             <p className="text-gray-600 mb-2">{newsItem.content}</p>
                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                               <span>Published: {newsItem.publishedAt?.toLocaleDateString()}</span>
                               <span>Read Time: {newsItem.readTime}</span>
                               {newsItem.image && (
                                 <span>Has Image</span>
                               )}
                             </div>
                           </div>
                           <div className="flex items-center space-x-2">
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => {
                                 setEditingNews(newsItem);
                                 setShowNewsForm(true);
                               }}
                             >
                               <Edit className="h-4 w-4" />
                             </Button>
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => newsItem.id && ContentManagementService.deleteNewsItem(newsItem.id).then(() => {
                                 setNewsItems(prev => prev.filter(item => item.id !== newsItem.id));
                               })}
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </CardContent>
             </Card>
           </TabsContent>

                     {/* Courses Tab */}
           <TabsContent value="courses" className="mt-6">
             <Card>
               <CardHeader>
                 <div className="flex items-center justify-between">
                   <CardTitle>Manage Courses</CardTitle>
                   <Button className="flex items-center space-x-2" onClick={() => {
                     setEditingCourse(undefined);
                     setShowCourseForm(true);
                   }}>
                     <Plus className="h-4 w-4" />
                     <span>Add Course</span>
                   </Button>
                 </div>
               </CardHeader>
               <CardContent>
                 {isLoading ? (
                   <div className="text-center py-8">
                     <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                     <p>Loading courses...</p>
                   </div>
                 ) : courses.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                     <p>No courses yet. Add your first course to get started.</p>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {courses.map((course) => (
                       <div
                         key={course.id}
                         className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                       >
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <div className="flex items-center space-x-2 mb-2">
                               <h3 className="font-semibold text-lg">{course.title}</h3>
                               <Badge variant="outline">
                                 {course.category}
                               </Badge>
                               {course.isSpecialOffer && (
                                 <Badge variant="default" className="bg-red-500">
                                   Special Offer
                                 </Badge>
                               )}
                             </div>
                             <p className="text-gray-600 mb-2">{course.description}</p>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                               <div>
                                 <span className="font-medium">Duration:</span> {course.duration}
                               </div>
                               <div>
                                 <span className="font-medium">Price:</span> ₹{course.price.toLocaleString()}
                               </div>
                               <div>
                                 <span className="font-medium">Seats:</span> {course.seatsRemaining}/{course.totalSeats}
                               </div>
                               <div>
                                 <span className="font-medium">Success Rate:</span> {course.successRate}%
                               </div>
                             </div>
                             <div className="mt-2 text-sm text-gray-500">
                               <span className="font-medium">Start Date:</span> {course.batchStartDate?.toLocaleDateString()}
                             </div>
                           </div>
                           <div className="flex items-center space-x-2">
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => {
                                 setEditingCourse(course);
                                 setShowCourseForm(true);
                               }}
                             >
                               <Edit className="h-4 w-4" />
                             </Button>
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => course.id && ContentManagementService.deleteCourse(course.id).then(() => {
                                 setCourses(prev => prev.filter(c => c.id !== course.id));
                               })}
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </CardContent>
             </Card>
           </TabsContent>

                     {/* Calendar Tab */}
           <TabsContent value="calendar" className="mt-6">
             <Card>
               <CardHeader>
                 <div className="flex items-center justify-between">
                   <CardTitle>Manage Calendar Events</CardTitle>
                   <Button className="flex items-center space-x-2" onClick={() => {
                     setEditingEvent(undefined);
                     setShowCalendarForm(true);
                   }}>
                     <Plus className="h-4 w-4" />
                     <span>Add Event</span>
                   </Button>
                 </div>
               </CardHeader>
               <CardContent>
                 {isLoading ? (
                   <div className="text-center py-8">
                     <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                     <p>Loading calendar events...</p>
                   </div>
                 ) : calendarEvents.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                     <p>No calendar events yet. Add your first event to get started.</p>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {calendarEvents.map((event) => (
                       <div
                         key={event.id}
                         className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                       >
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <div className="flex items-center space-x-2 mb-2">
                               <h3 className="font-semibold text-lg">{event.title}</h3>
                               <Badge variant={event.priority === 'high' ? 'destructive' : 'secondary'}>
                                 {event.priority}
                               </Badge>
                               <Badge variant="outline">
                                 {event.type}
                               </Badge>
                               {event.isRecurring && (
                                 <Badge variant="default" className="bg-blue-500">
                                   Recurring
                                 </Badge>
                               )}
                             </div>
                             <p className="text-gray-600 mb-2">{event.description}</p>
                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                               <span>Date: {event.date?.toLocaleDateString()}</span>
                               {event.isRecurring && event.recurringPattern && (
                                 <span>Pattern: {event.recurringPattern}</span>
                               )}
                             </div>
                           </div>
                           <div className="flex items-center space-x-2">
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => {
                                 setEditingEvent(event);
                                 setShowCalendarForm(true);
                               }}
                             >
                               <Edit className="h-4 w-4" />
                             </Button>
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => event.id && ContentManagementService.deleteCalendarEvent(event.id).then(() => {
                                 setCalendarEvents(prev => prev.filter(e => e.id !== event.id));
                               })}
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </CardContent>
             </Card>
           </TabsContent>
        </Tabs>
      </div>

             {/* Form Modals */}
       {showAnnouncementForm && (
         <AddAnnouncementForm
           onClose={() => setShowAnnouncementForm(false)}
           onSuccess={handleAnnouncementSuccess}
           editingAnnouncement={editingAnnouncement}
         />
       )}

       {showNewsForm && (
         <AddNewsForm
           onClose={() => setShowNewsForm(false)}
           onSuccess={handleNewsSuccess}
           editingNews={editingNews}
         />
       )}

       {showCourseForm && (
         <AddCourseForm
           onClose={() => setShowCourseForm(false)}
           onSuccess={handleCourseSuccess}
           editingCourse={editingCourse}
         />
       )}

       {showCalendarForm && (
         <AddCalendarEventForm
           onClose={() => setShowCalendarForm(false)}
           onSuccess={handleCalendarSuccess}
           editingEvent={editingEvent}
         />
       )}
     </div>
   );
 }
