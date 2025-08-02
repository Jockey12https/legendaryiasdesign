'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestPaymentPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/test');
      const data = await response.json();
      setTestResults({ type: 'firebase', ...data });
    } catch (error) {
      setTestResults({ 
        type: 'firebase', 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const testPaymentAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'test-user-123',
          userEmail: 'test@example.com',
          userName: 'Test User',
          productId: 'test-course-123',
          productTitle: 'Test Course',
          productType: 'course',
          amount: 100,
          currency: 'INR'
        }),
      });

      const data = await response.json();
      setTestResults({ type: 'payment', ...data });
    } catch (error) {
      setTestResults({ 
        type: 'payment', 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const checkEnvironmentVariables = () => {
    const envVars = {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
      UPI_ID: process.env.UPI_ID,
    };

    const missingVars = Object.entries(envVars)
      .filter(([key, value]) => !value || value === '')
      .map(([key]) => key);

    setTestResults({
      type: 'environment',
      success: missingVars.length === 0,
      envVars,
      missingVars,
      message: missingVars.length === 0 
        ? 'All environment variables are set' 
        : `Missing environment variables: ${missingVars.join(', ')}`
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Payment System Debug Page</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkEnvironmentVariables} className="w-full">
              Check Environment Variables
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Firebase Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testFirebaseConnection} 
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Test Firebase
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment API</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testPaymentAPI} 
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Test Payment API
            </Button>
          </CardContent>
        </Card>
      </div>

      {testResults && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {testResults.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              Test Results: {testResults.type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.success ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  {testResults.message || 'Test passed successfully'}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  {testResults.error || testResults.message || 'Test failed'}
                </AlertDescription>
              </Alert>
            )}
            
            {testResults.envVars && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Environment Variables:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify(testResults.envVars, null, 2)}
                </pre>
              </div>
            )}
            
            {testResults.details && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Details:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify(testResults.details, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">How to use this page:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "Check Environment Variables" to verify Firebase config</li>
                <li>Click "Test Firebase" to check database connection</li>
                <li>Click "Test Payment API" to test payment creation</li>
                <li>Check the results for any errors</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Common Issues:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Missing environment variables - Create .env.local file</li>
                <li>Firebase not initialized - Check API keys</li>
                <li>Database permission errors - Check Firestore rules</li>
                <li>Network errors - Check if dev server is running</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 