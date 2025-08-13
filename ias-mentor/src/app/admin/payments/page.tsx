'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Eye, 
  MessageCircle,
  Download,
  User,
  Calendar,
  DollarSign,
  Trash2,
  AlertTriangle,
  Shield,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLoginModal from '@/components/auth/AdminLoginModal';

interface PaymentData {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productTitle: string;
  productType: 'course' | 'material';
  amount: number;
  currency: string;
  upiId: string;
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
  whatsappMessage?: string;
  paymentProof?: string;
  adminNotes?: string;
}

export default function AdminPaymentsPage() {
  const { isAdminAuthenticated, loading: authLoading, login, logout } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [duplicates, setDuplicates] = useState<PaymentData[][]>([]);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [cleanupLoading, setCleanupLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchPayments();
    }
  }, [isAdminAuthenticated]);

  // Check for duplicates whenever payments change
  useEffect(() => {
    findDuplicates();
  }, [payments]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      console.log('Admin: Fetching payments...');
      const response = await fetch('/api/admin/payments?admin=true');
      console.log('Admin: Response status:', response.status);
      
      const data = await response.json();
      console.log('Admin: Response data:', data);
      
      if (data.success) {
        console.log('Admin: Setting payments:', data.payments);
        setPayments(data.payments);
      } else {
        console.error('Admin: API error:', data.error);
        setError(data.error || 'Failed to fetch payments');
      }
    } catch (error) {
      console.error('Admin: Error fetching payments:', error);
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string, notes?: string, txnId?: string) => {
    setActionLoading(paymentId);
    try {
      const response = await fetch('/api/payment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          status,
          adminNotes: notes,
          transactionId: txnId
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: status as 'pending' | 'confirmed' | 'rejected' | 'expired', adminNotes: notes, transactionId: txnId }
            : payment
        ));
        setSelectedPayment(null);
        setAdminNotes('');
        setTransactionId('');
      } else {
        setError(data.error || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      setError('Failed to update payment status');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPayments = {
    pending: payments.filter(p => p.status === 'pending'),
    confirmed: payments.filter(p => p.status === 'confirmed'),
    rejected: payments.filter(p => p.status === 'rejected'),
    all: payments
  };

  // Find duplicate payments
  const findDuplicates = () => {
    const duplicatesMap = new Map<string, PaymentData[]>();
    
    // Only consider pending payments for duplicate detection
    const pendingPayments = payments.filter(payment => payment.status === 'pending');
    
    pendingPayments.forEach(payment => {
      const key = `${payment.userId}-${payment.productId}-${payment.productType}`;
      if (!duplicatesMap.has(key)) {
        duplicatesMap.set(key, []);
      }
      duplicatesMap.get(key)!.push(payment);
    });
    
    const duplicatesArray = Array.from(duplicatesMap.values())
      .filter(group => group.length > 1)
      .sort((a, b) => new Date(b[0].createdAt).getTime() - new Date(a[0].createdAt).getTime());
    
    setDuplicates(duplicatesArray);
  };

  // Clean up duplicate payments
  const cleanupDuplicates = async () => {
    setCleanupLoading(true);
    try {
      const response = await fetch('/api/admin/cleanup-duplicates?admin=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Cleanup successful:', data.removedCount, 'duplicates removed');
        await fetchPayments(); // Refresh the payments list
        setShowCleanupDialog(false);
      } else {
        setError(data.error || 'Failed to cleanup duplicates');
      }
    } catch (error) {
      console.error('Error cleaning up duplicates:', error);
      setError('Failed to cleanup duplicates');
    } finally {
      setCleanupLoading(false);
    }
  };

  // Show loading while checking admin auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">
            You need to authenticate as an administrator to access this page.
          </p>
          <Button onClick={() => setShowLoginModal(true)} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Admin Login
          </Button>
        </div>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={login}
          login={login}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Payment Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage WhatsApp payments and confirm access</p>
        </div>
        <Button onClick={logout} variant="outline" size="sm" className="w-full sm:w-auto h-10 sm:h-9">
          <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="p-4 sm:p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Payments</p>
                <p className="text-xl sm:text-2xl font-bold">{payments.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-xl sm:text-2xl font-bold">{filteredPayments.pending.length}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Confirmed</p>
                <p className="text-xl sm:text-2xl font-bold">{filteredPayments.confirmed.length}</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
                <p className="text-xl sm:text-2xl font-bold">{filteredPayments.rejected.length}</p>
              </div>
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Duplicates Warning */}
      {duplicates.length > 0 && (
        <Alert className="mb-4 sm:mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
          <AlertDescription className="text-orange-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-sm sm:text-base">
                <strong>Duplicate Payments Detected:</strong> {duplicates.length} groups of duplicate payments found. 
                This can cause confusion in payment tracking.
              </span>
              <Button
                onClick={() => setShowCleanupDialog(true)}
                size="sm"
                className="w-full sm:w-auto h-9 bg-orange-600 hover:bg-orange-700 text-white text-sm"
              >
                <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Clean Up Duplicates</span>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-4 sm:mb-6">
          <XCircle className="h-4 w-4 flex-shrink-0" />
          <AlertDescription className="text-sm sm:text-base">{error}</AlertDescription>
        </Alert>
      )}

      {/* Payments Table */}
      <Tabs defaultValue="pending" className="w-full">
        <div className="overflow-x-auto mb-4 sm:mb-6">
          <TabsList className="grid w-full grid-cols-4 min-w-max h-10 sm:h-11">
            <TabsTrigger value="pending" className="text-xs sm:text-sm whitespace-nowrap">
              Pending ({filteredPayments.pending.length})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="text-xs sm:text-sm whitespace-nowrap">
              Confirmed ({filteredPayments.confirmed.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm whitespace-nowrap">
              Rejected ({filteredPayments.rejected.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">
              All ({filteredPayments.all.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {['pending', 'confirmed', 'rejected', 'all'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredPayments[status as keyof typeof filteredPayments].length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">No {status} payments found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {filteredPayments[status as keyof typeof filteredPayments].map((payment) => (
                  <Card key={payment.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="flex items-center text-sm sm:text-base">
                            {getStatusIcon(payment.status)}
                            <span className="ml-2 truncate">{payment.productTitle}</span>
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                            Payment ID: {payment.id}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(payment.status)} text-xs sm:text-sm flex-shrink-0`}>
                          {payment.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">User</p>
                          <p className="font-medium text-sm sm:text-base truncate">{payment.userName}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{payment.userEmail}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Product</p>
                          <p className="font-medium text-sm sm:text-base truncate">{payment.productTitle}</p>
                          <p className="text-xs sm:text-sm text-gray-600 capitalize">{payment.productType}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Amount</p>
                          <p className="font-medium text-sm sm:text-base">₹{payment.amount}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">UPI: {payment.upiId}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Date</p>
                          <p className="font-medium text-sm sm:text-base">{formatDate(payment.createdAt)}</p>
                          {payment.transactionId && (
                            <p className="text-xs sm:text-sm text-gray-600 truncate">TXN: {payment.transactionId}</p>
                          )}
                        </div>
                      </div>

                      {payment.adminNotes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Admin Notes:</p>
                          <p className="text-sm">{payment.adminNotes}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-2xl mx-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl">Payment Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Payment ID</p>
                                  <p className="font-mono text-sm">{payment.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Status</p>
                                  <Badge className={getStatusColor(payment.status)}>
                                    {payment.status.toUpperCase()}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">User</p>
                                  <p className="font-medium">{payment.userName}</p>
                                  <p className="text-sm text-gray-600">{payment.userEmail}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Product</p>
                                  <p className="font-medium">{payment.productTitle}</p>
                                  <p className="text-sm text-gray-600 capitalize">{payment.productType}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Amount</p>
                                  <p className="font-medium">₹{payment.amount}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">UPI ID</p>
                                  <p className="font-mono text-sm">{payment.upiId}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Created</p>
                                  <p className="text-sm">{formatDate(payment.createdAt)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Updated</p>
                                  <p className="text-sm">{formatDate(payment.updatedAt)}</p>
                                </div>
                              </div>

                              {payment.transactionId && (
                                <div>
                                  <p className="text-sm text-gray-500">Transaction ID</p>
                                  <p className="font-mono text-sm">{payment.transactionId}</p>
                                </div>
                              )}

                              {payment.adminNotes && (
                                <div>
                                  <p className="text-sm text-gray-500">Admin Notes</p>
                                  <p className="text-sm">{payment.adminNotes}</p>
                                </div>
                              )}

                              {payment.status === 'pending' && (
                                <div className="space-y-4 pt-4 border-t">
                                  <div>
                                    <label className="text-sm font-medium">Transaction ID</label>
                                    <input
                                      type="text"
                                      value={transactionId}
                                      onChange={(e) => setTransactionId(e.target.value)}
                                      className="w-full mt-1 p-2 border rounded-md"
                                      placeholder="Enter transaction ID"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Admin Notes</label>
                                    <textarea
                                      value={adminNotes}
                                      onChange={(e) => setAdminNotes(e.target.value)}
                                      className="w-full mt-1 p-2 border rounded-md"
                                      rows={3}
                                      placeholder="Add notes (optional)"
                                    />
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                      onClick={() => updatePaymentStatus(payment.id, 'confirmed', adminNotes, transactionId)}
                                      disabled={actionLoading === payment.id}
                                      className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                                    >
                                      {actionLoading === payment.id ? (
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                      ) : (
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                      )}
                                      Confirm Payment
                                    </Button>
                                    <Button
                                      onClick={() => updatePaymentStatus(payment.id, 'rejected', adminNotes)}
                                      disabled={actionLoading === payment.id}
                                      variant="outline"
                                      className="border-red-200 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                                    >
                                      {actionLoading === payment.id ? (
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                      ) : (
                                        <XCircle className="h-4 w-4 mr-2" />
                                      )}
                                      Reject Payment
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {payment.status === 'pending' && (
                          <Button
                            onClick={() => updatePaymentStatus(payment.id, 'confirmed')}
                            disabled={actionLoading === payment.id}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                          >
                            {actionLoading === payment.id ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Confirm
                          </Button>
                        )}

                        <Button
                          onClick={fetchPayments}
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Cleanup Duplicates Dialog */}
      <Dialog open={showCleanupDialog} onOpenChange={setShowCleanupDialog}>
        <DialogContent className="w-[95vw] max-w-2xl mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg sm:text-xl">
              <Shield className="h-5 w-5 text-orange-600 mr-2" />
              Clean Up Duplicate Payments
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">What will be cleaned up?</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Duplicate pending payments for the same user and product</li>
                <li>• Only the oldest duplicate will be kept</li>
                <li>• Confirmed payments will not be affected</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>

            {duplicates.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Duplicate Groups Found:</h4>
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {duplicates.map((group, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {group[0].userName} - {group[0].productTitle}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {group.length} duplicates
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        {group.map((payment, pIndex) => (
                          <div key={payment.id} className="flex justify-between">
                            <span>
                              {pIndex === 0 ? '✅ Keep:' : '🗑️ Remove:'} {payment.id}
                            </span>
                            <span>{formatDate(payment.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={cleanupDuplicates}
                disabled={cleanupLoading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {cleanupLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Clean Up {duplicates.reduce((sum, group) => sum + group.length - 1, 0)} Duplicates
              </Button>
              <Button
                onClick={() => setShowCleanupDialog(false)}
                variant="outline"
                disabled={cleanupLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 