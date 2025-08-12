"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManagementService } from "@/utils/contentManagementService";

export default function TestFirebasePage() {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testAddAnnouncement = async () => {
    setIsLoading(true);
    try {
      const testAnnouncement = {
        title: "Test Announcement",
        content: "This is a test announcement to verify Firebase connectivity.",
        category: "upsc-update" as const,
        priority: "medium" as const,
        isActive: true,
        expiresAt: undefined
      };

      const id = await ContentManagementService.addAnnouncement(testAnnouncement);
      setTestResult(`✅ Announcement added successfully with ID: ${id}`);
    } catch (error) {
      setTestResult(`❌ Error adding announcement: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetAnnouncements = async () => {
    setIsLoading(true);
    try {
      const announcements = await ContentManagementService.getAllAnnouncements();
      setTestResult(`✅ Retrieved ${announcements.length} announcements: ${JSON.stringify(announcements, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Error getting announcements: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSettings = async () => {
    setIsLoading(true);
    try {
      const settings = await ContentManagementService.getContentSettings();
      setTestResult(`✅ Retrieved settings: ${JSON.stringify(settings, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Error getting settings: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Firebase Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={testAddAnnouncement} disabled={isLoading}>
                  Test Add Announcement
                </Button>
                <Button onClick={testGetAnnouncements} disabled={isLoading}>
                  Test Get Announcements
                </Button>
                <Button onClick={testSettings} disabled={isLoading}>
                  Test Get Settings
                </Button>
              </div>
              
              {testResult && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Test Result:</h3>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                    {testResult}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
