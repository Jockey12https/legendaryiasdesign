"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManagementService, Course } from "@/utils/contentManagementService";
import { X, Save, Plus, Trash2 } from "lucide-react";

interface AddCourseFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingCourse?: Course;
}

export default function AddCourseForm({ onClose, onSuccess, editingCourse }: AddCourseFormProps) {
  const [formData, setFormData] = useState({
    title: editingCourse?.title || "",
    description: editingCourse?.description || "",
    image: editingCourse?.image || "",
    batchStartDate: editingCourse?.batchStartDate ? new Date(editingCourse.batchStartDate).toISOString().split('T')[0] : "",
    totalSeats: editingCourse?.totalSeats || 50,
    seatsRemaining: editingCourse?.seatsRemaining || 50,
    successRate: editingCourse?.successRate || 85,
    duration: editingCourse?.duration || "6 months",
    price: editingCourse?.price || 25000,
    originalPrice: editingCourse?.originalPrice || 25000,
    isSpecialOffer: editingCourse?.isSpecialOffer ?? false,
    category: editingCourse?.category || "prelims",
    features: editingCourse?.features || [""]
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        batchStartDate: new Date(formData.batchStartDate),
        totalSeats: formData.totalSeats,
        seatsRemaining: formData.seatsRemaining,
        successRate: formData.successRate,
        duration: formData.duration,
        price: formData.price,
        originalPrice: formData.originalPrice,
        isSpecialOffer: formData.isSpecialOffer,
        category: formData.category as Course['category'],
        features: formData.features.filter(feature => feature.trim() !== "")
      };

      console.log('Saving course data:', courseData);

      if (editingCourse?.id) {
        await ContentManagementService.updateCourse(editingCourse.id, courseData);
      } else {
        const result = await ContentManagementService.addCourse(courseData);
        console.log('Course added with ID:', result);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {editingCourse ? 'Edit Course' : 'Add Course'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter course description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/course-image.jpg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prelims">Prelims</SelectItem>
                    <SelectItem value="mains">Mains</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="test-series">Test Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="batchStartDate">Batch Start Date</Label>
                <Input
                  id="batchStartDate"
                  type="date"
                  value={formData.batchStartDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, batchStartDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="6 months"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="totalSeats">Total Seats</Label>
                <Input
                  id="totalSeats"
                  type="number"
                  value={formData.totalSeats || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalSeats: parseInt(e.target.value) || 0 }))}
                  min="1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="seatsRemaining">Seats Remaining</Label>
                <Input
                  id="seatsRemaining"
                  type="number"
                  value={formData.seatsRemaining || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, seatsRemaining: parseInt(e.target.value) || 0 }))}
                  min="0"
                  max={formData.totalSeats}
                  required
                />
              </div>

              <div>
                <Label htmlFor="successRate">Success Rate (%)</Label>
                <Input
                  id="successRate"
                  type="number"
                  value={formData.successRate || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, successRate: parseInt(e.target.value) || 0 }))}
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Current Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseInt(e.target.value) || 0 }))}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSpecialOffer"
                checked={formData.isSpecialOffer}
                onChange={(e) => setFormData(prev => ({ ...prev, isSpecialOffer: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isSpecialOffer">Special Offer</Label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Course Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingCourse ? 'Update' : 'Save'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
