"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManagementService, Announcement } from "@/utils/contentManagementService";
import { X, Save } from "lucide-react";

interface AddAnnouncementFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingAnnouncement?: Announcement;
}

export default function AddAnnouncementForm({ onClose, onSuccess, editingAnnouncement }: AddAnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: editingAnnouncement?.title || "",
    content: editingAnnouncement?.content || "",
    category: editingAnnouncement?.category || "upsc-update",
    priority: editingAnnouncement?.priority || "medium",
    isActive: editingAnnouncement?.isActive ?? true,
    expiresAt: editingAnnouncement?.expiresAt ? new Date(editingAnnouncement.expiresAt).toISOString().split('T')[0] : ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const announcementData = {
        title: formData.title,
        content: formData.content,
        category: formData.category as Announcement['category'],
        priority: formData.priority as Announcement['priority'],
        isActive: formData.isActive,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined
      };

      console.log('Saving announcement data:', announcementData);

      if (editingAnnouncement?.id) {
        await ContentManagementService.updateAnnouncement(editingAnnouncement.id, announcementData);
      } else {
        const result = await ContentManagementService.addAnnouncement(announcementData);
        console.log('Announcement added with ID:', result);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving announcement:', error);
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
              {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
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
                placeholder="Enter announcement title"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter announcement content"
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
                    <SelectItem value="urgent">Urgent</SelectItem>
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
              <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
              <Input
                id="expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isActive">Active</Label>
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
                    {editingAnnouncement ? 'Update' : 'Save'}
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
