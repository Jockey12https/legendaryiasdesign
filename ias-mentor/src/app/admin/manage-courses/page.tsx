"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLoginModal from "@/components/auth/AdminLoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, BookOpen, FileText, ShoppingCart, LogOut, Shield } from "lucide-react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  fee: string;
  duration: string;
  image?: string;
  createdAt: any;
}

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  image?: string;
  createdAt: any;
}

interface BookOnlineCourse {
  id: string;
  title: string;
  description: string;
  fees: string;
  duration: string;
  image?: string;
  createdAt: any;
}

export default function ManageCoursesPage() {
  const { isAdminAuthenticated, logout } = useAdminAuth();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [bookOnlineCourses, setBookOnlineCourses] = useState<BookOnlineCourse[]>([]);

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    fee: "",
    duration: "",
    image: ""
  });

  const [materialForm, setMaterialForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    image: ""
  });

  const [bookOnlineForm, setBookOnlineForm] = useState({
    title: "",
    description: "",
    fees: "",
    duration: "",
    image: ""
  });

  // Dialog states
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [materialDialogOpen, setMaterialDialogOpen] = useState(false);
  const [bookOnlineDialogOpen, setBookOnlineDialogOpen] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadData();
    }
  }, [isAdminAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load courses (Latest Programs)
      const coursesQuery = query(collection(db, "latestCourses"), orderBy("createdAt", "desc"));
      const coursesSnapshot = await getDocs(coursesQuery);
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);

      // Load study materials
      const materialsQuery = query(collection(db, "studyMaterials"), orderBy("createdAt", "desc"));
      const materialsSnapshot = await getDocs(materialsQuery);
      const materialsData = materialsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyMaterial[];
      setStudyMaterials(materialsData);

      // Load book online courses
      const bookOnlineQuery = query(collection(db, "bookOnlineCourses"), orderBy("createdAt", "desc"));
      const bookOnlineSnapshot = await getDocs(bookOnlineQuery);
      const bookOnlineData = bookOnlineSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BookOnlineCourse[];
      setBookOnlineCourses(bookOnlineData);

    } catch (error) {
      console.error("Error loading data:", error);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    try {
      setSaving(true);
      const courseData = {
        ...courseForm,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, "latestCourses"), courseData);
      setMessage({ type: 'success', text: 'Course added successfully!' });
      setCourseForm({ title: "", description: "", fee: "", duration: "", image: "" });
      setCourseDialogOpen(false);
      loadData();
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage({ type: 'error', text: 'Failed to add course' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddStudyMaterial = async () => {
    try {
      setSaving(true);
      const materialData = {
        ...materialForm,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, "studyMaterials"), materialData);
      setMessage({ type: 'success', text: 'Study material added successfully!' });
      setMaterialForm({ title: "", description: "", price: "", type: "", image: "" });
      setMaterialDialogOpen(false);
      loadData();
    } catch (error) {
      console.error("Error adding study material:", error);
      setMessage({ type: 'error', text: 'Failed to add study material' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddBookOnlineCourse = async () => {
    try {
      setSaving(true);
      const bookOnlineData = {
        ...bookOnlineForm,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, "bookOnlineCourses"), bookOnlineData);
      setMessage({ type: 'success', text: 'Book online course added successfully!' });
      setBookOnlineForm({ title: "", description: "", fees: "", duration: "", image: "" });
      setBookOnlineDialogOpen(false);
      loadData();
    } catch (error) {
      console.error("Error adding book online course:", error);
      setMessage({ type: 'error', text: 'Failed to add book online course' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage({ type: 'error', text: 'Failed to delete item' });
    }
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the admin panel.</p>
          <Button onClick={openAdminModal} className="bg-secondary text-white hover:bg-secondary/90">
            <Shield className="mr-2 h-4 w-4" />
            Admin Login
          </Button>
          <AdminLoginModal isOpen={isAdminModalOpen} onClose={closeAdminModal} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Courses</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/payments">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Shield className="mr-2 h-4 w-4" />
                  Payments
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 min-w-max h-10 sm:h-11">
              <TabsTrigger value="courses" className="text-xs sm:text-sm whitespace-nowrap">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses ({courses.length})
              </TabsTrigger>
              <TabsTrigger value="materials" className="text-xs sm:text-sm whitespace-nowrap">
                <FileText className="mr-2 h-4 w-4" />
                Study Materials ({studyMaterials.length})
              </TabsTrigger>
              <TabsTrigger value="bookOnline" className="text-xs sm:text-sm whitespace-nowrap">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Book Online ({bookOnlineCourses.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Latest Programs</h2>
              <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-secondary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add New Course</DialogTitle>
                    <DialogDescription>Add a new course to the Latest Programs section.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course-title">Title</Label>
                        <Input
                          id="course-title"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                          placeholder="Course title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-fee">Fee</Label>
                        <Input
                          id="course-fee"
                          value={courseForm.fee}
                          onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                          placeholder="₹499"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="course-duration">Duration</Label>
                      <Input
                        id="course-duration"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        placeholder="3 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea
                        id="course-description"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        placeholder="Course description"
                        rows={3}
                      />
                    </div>
                                         <div>
                       <Label htmlFor="course-image">Image URL (Optional)</Label>
                       <Input
                         id="course-image"
                         value={courseForm.image}
                         onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                         placeholder="https://example.com/image.jpg"
                       />
                       <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
                     </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleAddCourse} disabled={saving} className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto">
                        {saving ? "Adding..." : "Add Course"}
                      </Button>
                      <Button variant="outline" onClick={() => setCourseDialogOpen(false)} className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading courses...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fee:</strong> {course.fee}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Added:</strong> {course.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                                                 <Button
                           variant="outline"
                           size="sm"
                           onClick={() => handleDelete("latestCourses", course.id)}
                           className="text-red-600 hover:text-red-700"
                         >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Study Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Study Materials</h2>
              <Dialog open={materialDialogOpen} onOpenChange={setMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-secondary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add New Study Material</DialogTitle>
                    <DialogDescription>Add a new study material to the collection.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="material-title">Title</Label>
                        <Input
                          id="material-title"
                          value={materialForm.title}
                          onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                          placeholder="Material title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="material-price">Price</Label>
                        <Input
                          id="material-price"
                          value={materialForm.price}
                          onChange={(e) => setMaterialForm({ ...materialForm, price: e.target.value })}
                          placeholder="₹299"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="material-type">Type</Label>
                      <Select value={materialForm.type} onValueChange={(value) => setMaterialForm({ ...materialForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                          <SelectItem value="Document">Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="material-description">Description</Label>
                      <Textarea
                        id="material-description"
                        value={materialForm.description}
                        onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                        placeholder="Material description"
                        rows={3}
                      />
                    </div>
                                         <div>
                       <Label htmlFor="material-image">Image URL (Optional)</Label>
                       <Input
                         id="material-image"
                         value={materialForm.image}
                         onChange={(e) => setMaterialForm({ ...materialForm, image: e.target.value })}
                         placeholder="https://example.com/image.jpg"
                       />
                       <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
                     </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleAddStudyMaterial} disabled={saving} className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto">
                        {saving ? "Adding..." : "Add Material"}
                      </Button>
                      <Button variant="outline" onClick={() => setMaterialDialogOpen(false)} className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading study materials...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyMaterials.map((material) => (
                  <Card key={material.id} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">{material.title}</CardTitle>
                      <CardDescription className="text-sm">{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Price:</strong> {material.price}</p>
                        <p><strong>Type:</strong> {material.type}</p>
                        <p><strong>Added:</strong> {material.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete("studyMaterials", material.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Book Online Tab */}
          <TabsContent value="bookOnline" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Book Online Courses</h2>
              <Dialog open={bookOnlineDialogOpen} onOpenChange={setBookOnlineDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-secondary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add New Book Online Course</DialogTitle>
                    <DialogDescription>Add a new course to the Book Online section.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bookOnline-title">Title</Label>
                        <Input
                          id="bookOnline-title"
                          value={bookOnlineForm.title}
                          onChange={(e) => setBookOnlineForm({ ...bookOnlineForm, title: e.target.value })}
                          placeholder="Course title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bookOnline-fees">Fees</Label>
                        <Input
                          id="bookOnline-fees"
                          value={bookOnlineForm.fees}
                          onChange={(e) => setBookOnlineForm({ ...bookOnlineForm, fees: e.target.value })}
                          placeholder="₹999"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bookOnline-duration">Duration</Label>
                      <Input
                        id="bookOnline-duration"
                        value={bookOnlineForm.duration}
                        onChange={(e) => setBookOnlineForm({ ...bookOnlineForm, duration: e.target.value })}
                        placeholder="6 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookOnline-description">Description</Label>
                      <Textarea
                        id="bookOnline-description"
                        value={bookOnlineForm.description}
                        onChange={(e) => setBookOnlineForm({ ...bookOnlineForm, description: e.target.value })}
                        placeholder="Course description"
                        rows={3}
                      />
                    </div>
                                         <div>
                       <Label htmlFor="bookOnline-image">Image URL (Optional)</Label>
                       <Input
                         id="bookOnline-image"
                         value={bookOnlineForm.image}
                         onChange={(e) => setBookOnlineForm({ ...bookOnlineForm, image: e.target.value })}
                         placeholder="https://example.com/image.jpg"
                       />
                       <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
                     </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleAddBookOnlineCourse} disabled={saving} className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto">
                        {saving ? "Adding..." : "Add Course"}
                      </Button>
                      <Button variant="outline" onClick={() => setBookOnlineDialogOpen(false)} className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading book online courses...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookOnlineCourses.map((course) => (
                  <Card key={course.id} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fees:</strong> {course.fees}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Added:</strong> {course.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete("bookOnlineCourses", course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 