'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default function TestAnalyticsPage() {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [paymentsData, setPaymentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const revenue = calculateRevenue();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Test Page</h1>
      
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