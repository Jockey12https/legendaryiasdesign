"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthModal from '@/components/auth/AuthModal';

export default function TestAuthPage() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Authentication Test Page</CardTitle>
          <CardDescription>
            Test the Firebase authentication functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">✅ Authentication Successful!</h3>
                <p className="text-green-700">You are logged in as:</p>
                <div className="mt-2 space-y-1">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                  <p><strong>Profile Complete:</strong> {user.profileComplete ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild>
                  <a href="/dashboard">Go to Dashboard</a>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800">🔐 Not Authenticated</h3>
                <p className="text-blue-700">Please log in to test the authentication system.</p>
              </div>
              
              <Button onClick={() => setIsAuthModalOpen(true)}>
                Open Login Modal
              </Button>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Test Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Make sure you have set up Firebase configuration in .env.local</li>
              <li>Click "Open Login Modal" to test the authentication forms</li>
              <li>Register a new account or login with existing credentials</li>
              <li>After login, you should see your user information displayed</li>
              <li>Test the dashboard by clicking "Go to Dashboard"</li>
              <li>Test logout functionality</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />
    </div>
  );
}
