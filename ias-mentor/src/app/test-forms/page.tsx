"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddNewsForm from "@/components/AddNewsForm";
import AddCourseForm from "@/components/AddCourseForm";
import AddCalendarEventForm from "@/components/AddCalendarEventForm";

export default function TestFormsPage() {
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showCalendarForm, setShowCalendarForm] = useState(false);

  const handleNewsSuccess = () => {
    console.log('News form submitted successfully');
    setShowNewsForm(false);
  };

  const handleCourseSuccess = () => {
    console.log('Course form submitted successfully');
    setShowCourseForm(false);
  };

  const handleCalendarSuccess = () => {
    console.log('Calendar form submitted successfully');
    setShowCalendarForm(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Content Management Forms</h1>
      
      <div className="space-y-4">
        <Button onClick={() => setShowNewsForm(true)}>
          Test News Form
        </Button>
        
        <Button onClick={() => setShowCourseForm(true)}>
          Test Course Form
        </Button>
        
        <Button onClick={() => setShowCalendarForm(true)}>
          Test Calendar Form
        </Button>
      </div>

      {showNewsForm && (
        <AddNewsForm
          onClose={() => setShowNewsForm(false)}
          onSuccess={handleNewsSuccess}
        />
      )}

      {showCourseForm && (
        <AddCourseForm
          onClose={() => setShowCourseForm(false)}
          onSuccess={handleCourseSuccess}
        />
      )}

      {showCalendarForm && (
        <AddCalendarEventForm
          onClose={() => setShowCalendarForm(false)}
          onSuccess={handleCalendarSuccess}
        />
      )}
    </div>
  );
}
