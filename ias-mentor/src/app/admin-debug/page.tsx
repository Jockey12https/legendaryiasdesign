'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDebugPage() {
  const { isAdminAuthenticated, loading, login, logout, checkAdminAuth } = useAdminAuth();
  const [localStorageData, setLocalStorageData] = useState<any>({});

  useEffect(() => {
    // Get localStorage data
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    setLocalStorageData({
      adminAuthenticated: adminAuth,
      adminLoginTime: loginTime,
      loginTimeParsed: loginTime ? new Date(loginTime).toLocaleString() : null
    });
  }, []);

  const handleManualLogin = () => {
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminLoginTime', new Date().toISOString());
    checkAdminAuth();
    setLocalStorageData({
      adminAuthenticated: 'true',
      adminLoginTime: new Date().toISOString(),
      loginTimeParsed: new Date().toLocaleString()
    });
  };

  const handleManualLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    checkAdminAuth();
    setLocalStorageData({
      adminAuthenticated: null,
      adminLoginTime: null,
      loginTimeParsed: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Authentication Debug</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Is Admin Authenticated:</strong> {isAdminAuthenticated ? 'Yes' : 'No'}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleManualLogin} variant="outline">
                  Manual Login
                </Button>
                <Button onClick={handleManualLogout} variant="outline">
                  Manual Logout
                </Button>
                <Button onClick={checkAdminAuth} variant="outline">
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LocalStorage Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(localStorageData, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <strong>NEXT_PUBLIC_ADMIN_SECRET:</strong> {process.env.NEXT_PUBLIC_ADMIN_SECRET || 'Not set (using default: ADMIN_SECRET)'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full">
                <a href="/admin">Go to /admin</a>
              </Button>
              <Button asChild className="w-full">
                <a href="/admin/payments">Go to /admin/payments</a>
              </Button>
              <Button asChild className="w-full">
                <a href="/">Go to Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Check the authentication status above</li>
                <li>Use "Manual Login" to simulate admin login</li>
                <li>Use "Manual Logout" to clear admin session</li>
                <li>Test the links to see if admin routes work</li>
                <li>Check browser console for any errors</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 