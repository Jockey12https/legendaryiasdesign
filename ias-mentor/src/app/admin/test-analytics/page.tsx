'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoginModal from '@/components/auth/AdminLoginModal';
import { Button } from '@/components/ui/button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Shield, LogOut } from 'lucide-react';

export default function TestAnalyticsPage() {
  const { isAdminAuthenticated, logout, login } = useAdminAuth();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [paymentsData, setPaymentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadData();
    }
  }, [isAdminAuthenticated]);

  const loadData = async () => {
    try {
      console.log('Loading test data...');
      
      // Load all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      
      console.log('Users loaded:', users.length);
      console.log('Sample user:', users[0]);

      // Load all payments
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const payments = paymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('Payments loaded:', payments.length);
      console.log('Sample payment:', payments[0]);

      setUsersData(users);
      setPaymentsData(payments);
    } catch (error) {
      console.error('Error loading test data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = () => {
    const confirmedPayments = paymentsData.filter(payment => payment.status === 'confirmed');
    const total = confirmedPayments.reduce((total, payment) => total + (payment.amount || 0), 0);
    return { confirmedPayments: confirmedPayments.length, total };
  };

  const getTotalEnrollments = () => {
    return usersData.reduce((total, user) => {
      const courses = user.enrolledCourses || [];
      return total + courses.length;
    }, 0);
  };

  const getTotalPurchases = () => {
    return usersData.reduce((total, user) => {
      const materials = user.purchasedMaterials || [];
      return total + materials.length;
    }, 0);
  };

  // Show login modal if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
            <p className="text-gray-600">Please log in to access the test analytics.</p>
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const revenue = calculateRevenue();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics Test Page</h1>
        <Button
          onClick={logout}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-4 rounded">
          <h3 className="font-bold">Users</h3>
          <p>Total: {usersData.length}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold">Payments</h3>
          <p>Total: {paymentsData.length}</p>
          <p>Confirmed: {revenue.confirmedPayments}</p>
          <p>Revenue: ₹{revenue.total}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold">Enrollments</h3>
          <p>Total: {getTotalEnrollments()}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold">Purchases</h3>
          <p>Total: {getTotalPurchases()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Sample User Data</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-96">
            {JSON.stringify(usersData[0], null, 2)}
          </pre>
        </div>
        <div>
          <h3 className="font-bold mb-2">Sample Payment Data</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-96">
            {JSON.stringify(paymentsData[0], null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">All Confirmed Payments</h3>
        <div className="space-y-2">
          {paymentsData
            .filter(payment => payment.status === 'confirmed')
            .map(payment => (
              <div key={payment.id} className="border p-2 rounded">
                <p><strong>ID:</strong> {payment.id}</p>
                <p><strong>User:</strong> {payment.userName} ({payment.userEmail})</p>
                <p><strong>Product:</strong> {payment.productTitle} ({payment.productType})</p>
                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                <p><strong>Date:</strong> {payment.createdAt}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 