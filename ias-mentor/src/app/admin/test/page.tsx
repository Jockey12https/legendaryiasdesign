'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoginModal from '@/components/auth/AdminLoginModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, Shield, LogOut } from 'lucide-react';

export default function AdminTestPage() {
  const { isAdminAuthenticated, logout, login } = useAdminAuth();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing admin API...');
      const response = await fetch('/api/admin/payments?admin=true');
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setPayments(data.payments || []);
        console.log('Payments loaded:', data.payments?.length || 0);
      } else {
        setError(data.error || 'Failed to fetch payments');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchPayments();
    }
  }, [isAdminAuthenticated]);

  // Show login modal if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
            <p className="text-gray-600">Please log in to access the admin test page.</p>
          </div>
          <Button 
            onClick={() => setIsAdminModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-secondary"
          >
            Admin Login
          </Button>
        </div>
        
        <AdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSuccess={login}
          login={login}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Test Page</h1>
        <Button
          onClick={logout}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin API Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchPayments} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Test Admin API
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Payments Found: {payments.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{payment.productTitle}</h3>
                      <p className="text-sm text-gray-600">ID: {payment.id}</p>
                      <p className="text-sm text-gray-600">User: {payment.userName}</p>
                      <p className="text-sm text-gray-600">Amount: ₹{payment.amount}</p>
                      <p className="text-sm text-gray-600">Status: {payment.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {payments.length === 0 && !loading && !error && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">No payments found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 