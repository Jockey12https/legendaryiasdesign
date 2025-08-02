'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCw, 
  Download,
  QrCode,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    type: 'course' | 'material';
    price: number;
    description?: string;
  };
  onPaymentSuccess?: () => void; // Callback for successful payment
}

type PaymentStatus = 'pending' | 'confirmed' | 'rejected' | 'expired';

interface PaymentData {
  id: string;
  status: PaymentStatus;
  upiId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  transactionId?: string;
  adminNotes?: string;
}

export default function WhatsAppPaymentModal({ isOpen, onClose, product, onPaymentSuccess }: PaymentModalProps) {
  const { user } = useAuth();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize payment when modal opens
  useEffect(() => {
    if (isOpen && user && !paymentId && !loading) {
      initializePayment();
    }
  }, [isOpen, user, product.id]); // Add product.id to dependencies to reset when product changes

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPaymentId(null);
      setPaymentData(null);
      setWhatsappUrl(null);
      setError(null);
      setCopied(false);
    }
  }, [isOpen]);

  // Poll payment status
  useEffect(() => {
    if (paymentId && paymentData?.status === 'pending') {
      const interval = setInterval(checkPaymentStatus, 10000); // Check every 10 seconds
      return () => clearInterval(interval);
    }
  }, [paymentId, paymentData?.status]);

  const initializePayment = async () => {
    if (!user || loading) return; // Prevent multiple simultaneous calls

    setLoading(true);
    setError(null);

    try {
      console.log('WhatsAppPaymentModal: Starting payment initialization');
      console.log('WhatsAppPaymentModal: User data:', { uid: user.uid, email: user.email, displayName: user.displayName });
      console.log('WhatsAppPaymentModal: Product data:', product);

      // Check if a pending payment already exists for this user and product
      const checkResponse = await fetch(`/api/payment/check?userId=${user.uid}&productId=${product.id}&productType=${product.type}`);
      const checkData = await checkResponse.json();
      
      if (checkData.success && checkData.payment) {
        console.log('WhatsAppPaymentModal: Found existing payment:', checkData.payment);
        setPaymentId(checkData.payment.id);
        setWhatsappUrl(checkData.payment.whatsappUrl);
        setPaymentData(checkData.payment);
        return;
      }

      const requestBody = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        productId: product.id,
        productTitle: product.title,
        productType: product.type,
        amount: product.price,
        currency: 'INR'
      };

      console.log('WhatsAppPaymentModal: Request body:', requestBody);

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('WhatsAppPaymentModal: Response status:', response.status);
      console.log('WhatsAppPaymentModal: Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('WhatsAppPaymentModal: Response data:', data);

      if (data.success) {
        setPaymentId(data.paymentId);
        setWhatsappUrl(data.whatsappUrl);
        setPaymentData({
          id: data.paymentId,
          status: 'pending',
          upiId: data.upiId,
          amount: product.price,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        console.error('WhatsAppPaymentModal: API returned error:', data.error);
        setError(data.error || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('WhatsAppPaymentModal: Payment initialization error:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    try {
      console.log('Checking payment status for:', paymentId);
      const response = await fetch(`/api/payment?paymentId=${paymentId}&userId=${user?.uid}`);
      console.log('Payment status response:', response.status);
      
      const data = await response.json();
      console.log('Payment status data:', data);

      if (data.success && data.payment) {
        setPaymentData(data.payment);
        
        // If payment is confirmed, close modal after a delay
        if (data.payment.status === 'confirmed') {
          console.log('Payment confirmed, closing modal');
          setTimeout(() => {
            onClose();
            // Call the success callback to refresh enrollment status
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }
          }, 2000);
        }
        
        // If payment is rejected, show rejection message and close modal after a delay
        if (data.payment.status === 'rejected') {
          console.log('Payment rejected, showing rejection message');
          setTimeout(() => {
            onClose();
          }, 5000); // Give user more time to read the rejection message
        }
      } else if (response.status === 404) {
        console.log('Payment not found, might have been deleted');
        setError('Payment not found. It may have been cancelled or deleted.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.error('Payment status check failed:', data.error);
        setError(data.error || 'Failed to check payment status');
      }
    } catch (error) {
      console.error('Payment status check error:', error);
      setError('Failed to check payment status. Please try again.');
    }
  };

  const openWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  const copyUpiId = () => {
    if (paymentData?.upiId) {
      navigator.clipboard.writeText(paymentData.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
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

  const getStatusColor = (status: PaymentStatus) => {
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

  const getStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Payment Confirmed';
      case 'rejected':
        return 'Payment Rejected';
      case 'expired':
        return 'Payment Expired';
      default:
        return 'Payment Pending';
    }
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">Please sign in to proceed with payment.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Payment
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing payment...</p>
          </div>
        )}

        {error && (
          <Alert className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {paymentData && (
          <div className="space-y-4">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-lg">₹{product.price}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="text-sm font-mono">{paymentData.id}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getStatusIcon(paymentData.status)}
                  <span className="ml-2">Payment Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <Badge className={getStatusColor(paymentData.status)}>
                      {getStatusText(paymentData.status)}
                    </Badge>
                  </div>
                  
                  {paymentData.status === 'pending' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>UPI ID:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{paymentData.upiId}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={copyUpiId}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Instructions:</p>
                        <ol className="text-sm space-y-1">
                          <li>1. Send ₹{product.price} to {paymentData.upiId}</li>
                          <li>2. Click "Contact WhatsApp" below</li>
                          <li>3. Send payment screenshot</li>
                          <li>4. Wait for confirmation (2-3 hours)</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {paymentData.status === 'confirmed' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        Payment confirmed! You now have access to {product.title}.
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentData.status === 'rejected' && (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription>
                        Payment rejected: {paymentData.adminNotes || 'No reason provided'}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              {paymentData.status === 'pending' && (
                <>
                  <Button 
                    onClick={openWhatsApp} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact WhatsApp
                  </Button>
                  
                  <Button 
                    onClick={checkPaymentStatus} 
                    variant="outline" 
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>
                </>
              )}

              {paymentData.status === 'rejected' && (
                <Button 
                  onClick={onClose} 
                  variant="outline" 
                  className="w-full"
                >
                  Close
                </Button>
              )}

              {paymentData.status === 'confirmed' && (
                <Button 
                  onClick={() => {
                    onClose();
                    window.location.reload();
                  }} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Access Content
                </Button>
              )}

              {(paymentData.status === 'pending' || paymentData.status === 'confirmed') && (
                <Button 
                  onClick={onClose} 
                  variant="outline" 
                  className="w-full"
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 