'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function AdminTestPage() {
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
    fetchPayments();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Test Page</h1>
      
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