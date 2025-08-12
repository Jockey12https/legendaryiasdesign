"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManagementService, NewsItem } from "@/utils/contentManagementService";
import { X, Save } from "lucide-react";

interface AddNewsFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingNews?: NewsItem;
}

export default function AddNewsForm({ onClose, onSuccess, editingNews }: AddNewsFormProps) {
  const [formData, setFormData] = useState({
    title: editingNews?.title || "",
    content: editingNews?.content || "",
    category: editingNews?.category || "upsc-update",
    priority: editingNews?.priority || "medium",
    image: editingNews?.image || "",
    readTime: editingNews?.readTime || "5 min read",
    isFeatured: editingNews?.isFeatured ?? false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newsData = {
        title: formData.title,
        content: formData.content,
        category: formData.category as NewsItem['category'],
        priority: formData.priority as NewsItem['priority'],
        image: formData.image || null,
        readTime: formData.readTime,
        isFeatured: formData.isFeatured
      };

      console.log('Saving news data:', newsData);

      if (editingNews?.id) {
        await ContentManagementService.updateNewsItem(editingNews.id, newsData);
      } else {
        const result = await ContentManagementService.addNewsItem(newsData);
        console.log('News item added with ID:', result);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving news item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {editingNews ? 'Edit News Item' : 'Add News Item'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter news title"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter news content"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="upsc-update">UPSC Update</SelectItem>
                    <SelectItem value="course-launch">Course Launch</SelectItem>
                    <SelectItem value="success-story">Success Story</SelectItem>
                    <SelectItem value="important-date">Important Date</SelectItem>
                    <SelectItem value="study-material">Study Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                placeholder="5 min read"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isFeatured">Featured News</Label>
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
                    {editingNews ? 'Update' : 'Save'}
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
