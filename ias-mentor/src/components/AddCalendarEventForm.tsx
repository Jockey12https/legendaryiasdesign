"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManagementService, CalendarEvent } from "@/utils/contentManagementService";
import { X, Save } from "lucide-react";

interface AddCalendarEventFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingEvent?: CalendarEvent;
}

export default function AddCalendarEventForm({ onClose, onSuccess, editingEvent }: AddCalendarEventFormProps) {
  const [formData, setFormData] = useState({
    title: editingEvent?.title || "",
    description: editingEvent?.description || "",
    date: editingEvent?.date ? new Date(editingEvent.date).toISOString().split('T')[0] : "",
    type: editingEvent?.type || "upsc-exam",
    priority: editingEvent?.priority || "medium",
    isRecurring: editingEvent?.isRecurring ?? false,
    recurringPattern: editingEvent?.recurringPattern || "monthly"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date),
        type: formData.type as CalendarEvent['type'],
        priority: formData.priority as CalendarEvent['priority'],
        isRecurring: formData.isRecurring,
        recurringPattern: formData.isRecurring ? formData.recurringPattern as CalendarEvent['recurringPattern'] : null
      };

      console.log('Saving calendar event data:', eventData);

      if (editingEvent?.id) {
        await ContentManagementService.updateCalendarEvent(editingEvent.id, eventData);
      } else {
        const result = await ContentManagementService.addCalendarEvent(eventData);
        console.log('Calendar event added with ID:', result);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving calendar event:', error);
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
              {editingEvent ? 'Edit Calendar Event' : 'Add Calendar Event'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter event description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Event Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upsc-exam">UPSC Exam</SelectItem>
                    <SelectItem value="course-start">Course Start</SelectItem>
                    <SelectItem value="mock-test">Mock Test</SelectItem>
                    <SelectItem value="application-deadline">Application Deadline</SelectItem>
                    <SelectItem value="result-date">Result Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <Label htmlFor="recurringPattern">Recurring Pattern</Label>
                <Select
                  value={formData.recurringPattern}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, recurringPattern: value }))}
                  disabled={!formData.isRecurring}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isRecurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isRecurring">Recurring Event</Label>
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
                    {editingEvent ? 'Update' : 'Save'}
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
