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
import UPIQRCode from './UPIQRCode';

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
  const [whatsappSent, setWhatsappSent] = useState<boolean | null>(null);
  const [whatsappError, setWhatsappError] = useState<string | null>(null);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
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
      setWhatsappSent(null);
      setWhatsappError(null);
      setSendingWhatsApp(false);
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
        userPhone: (user as any).phoneNumber || '',
        productId: product.id,
        productTitle: product.title,
        productType: product.type,
        amount: product.price,
        currency: 'INR'
      };

      // Validate all required fields before sending
      const requiredFields = ['userId', 'userEmail', 'userName', 'productId', 'productTitle', 'productType', 'amount'];
      const missingFields = requiredFields.filter(field => !requestBody[field as keyof typeof requestBody]);
      
      if (missingFields.length > 0) {
        console.error('WhatsAppPaymentModal: Missing required fields:', missingFields);
        setError(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

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

  const openWhatsApp = async () => {
    if (!whatsappUrl || !user) return;
    
    setSendingWhatsApp(true);
    setWhatsappSent(null);
    setWhatsappError(null);
    
    try {
      // Define numbers for Contact WhatsApp button (Primary + First manual)
      const numbers = [
        '918921519949', // Primary number (Twilio-enabled)
        '918848559575',  // First manual number
        '918547698407'
      ];
      
      const message = `Hi! I want to purchase ${product.title} for ₹${product.price}.\nName: ${user.displayName || user.email}\nPhone: ${(user as any).phoneNumber || 'Not provided'}\n\nPlease provide payment instructions.\nPayment ID: ${paymentData?.id}`;
      
      // Send WhatsApp messages to multiple numbers
      const response = await fetch('/api/send-whatsapp-multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          numbers: numbers
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setWhatsappSent(true);
        setWhatsappError(null);
        
        // Open first WhatsApp URL if available
        const manualResults = data.results.filter((result: any) => result.method === 'manual' && result.whatsappUrl);
        if (manualResults.length > 0) {
          window.open(manualResults[0].whatsappUrl, '_blank');
        }
      } else {
        setWhatsappSent(false);
        setWhatsappError(data.error || 'Failed to send WhatsApp messages');
        // Fallback to original WhatsApp URL
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sending WhatsApp messages:', error);
      setWhatsappSent(false);
      setWhatsappError('Failed to send WhatsApp messages. Opening WhatsApp manually.');
      // Fallback to original WhatsApp URL
      window.open(whatsappUrl, '_blank');
    } finally {
      setSendingWhatsApp(false);
    }
  };

  const copyUpiId = () => {
    if (paymentData?.upiId) {
      navigator.clipboard.writeText(paymentData.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const informAdmin = () => {
    const adminNumber = '918547698407'; // Second manual number
    const message = `Hi! I want to purchase ${product.title} for ₹${product.price}.\nName: ${user?.displayName || user?.email}\nPhone: ${(user as any)?.phoneNumber || 'Not provided'}\n\nPlease provide payment instructions.\nPayment ID: ${paymentData?.id}`;
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
        <DialogContent className="w-[95vw] max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4 sm:py-6">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Please sign in to proceed with payment.</p>
            <Button onClick={onClose} className="w-full sm:w-auto">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            <MessageCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="break-words">WhatsApp Payment</span>
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="text-center py-4 sm:py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Initializing payment...</p>
          </div>
        )}

        {error && (
          <Alert className="mb-4">
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="text-sm sm:text-base break-words">{error}</AlertDescription>
          </Alert>
        )}

        {paymentData && (
          <div className="space-y-4">
            {/* Product Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg break-words">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Amount:</span>
                  <span className="font-bold text-lg sm:text-xl">₹{product.price}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Payment ID:</span>
                  <span className="text-xs sm:text-sm font-mono break-all">{paymentData.id}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  {getStatusIcon(paymentData.status)}
                  <span className="ml-2 break-words">Payment Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm sm:text-base">Status:</span>
                    <Badge className={`${getStatusColor(paymentData.status)} text-xs sm:text-sm`}>
                      {getStatusText(paymentData.status)}
                    </Badge>
                  </div>
                  
                  {paymentData.status === 'pending' && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm sm:text-base">UPI ID:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs sm:text-sm break-all">{paymentData.upiId}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={copyUpiId}
                            className="h-6 w-6 p-0 flex-shrink-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* UPI QR Code */}
                      <div className="mt-4">
                        <UPIQRCode 
                          upiId={paymentData.upiId}
                          amount={product.price}
                          merchantName="Legendary IAS Mentor"
                          transactionNote={`${product.title} - Payment ID: ${paymentData.id}`}
                        />
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2 font-medium">Instructions:</p>
                        <ol className="text-xs sm:text-sm space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="flex-shrink-0">1.</span>
                            <span>Send ₹{product.price} to <span className="font-mono break-all">{paymentData.upiId}</span></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex-shrink-0">2.</span>
                            <span>Click "Contact WhatsApp" below</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex-shrink-0">3.</span>
                            <span>Send payment screenshot</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex-shrink-0">3.</span>
                            <span>Inform Admin about the payment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex-shrink-0">4.</span>
                            <span>Wait for confirmation (2-3 hours)</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {paymentData.status === 'confirmed' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <AlertDescription className="text-sm sm:text-base break-words">
                        Payment confirmed! You now have access to {product.title}.
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentData.status === 'rejected' && (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <AlertDescription className="text-sm sm:text-base break-words">
                        Payment rejected: {paymentData.adminNotes || 'No reason provided'}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Message Status */}
            {paymentData.status === 'pending' && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <MessageCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="break-words">WhatsApp Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {whatsappSent === true && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <AlertDescription className="text-sm sm:text-base break-words">
                        WhatsApp messages sent successfully! Check your WhatsApp for payment instructions.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {whatsappSent === false && whatsappError && (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <AlertDescription className="text-sm sm:text-base break-words">
                        Failed to send WhatsApp message: {whatsappError}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {sendingWhatsApp && (
                    <div className="text-center py-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Sending WhatsApp message...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {paymentData.status === 'pending' && (
                <>
                  <Button 
                    onClick={openWhatsApp} 
                    disabled={sendingWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-11 text-sm sm:text-base"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="break-words">
                      {sendingWhatsApp ? 'Sending...' : 'Contact WhatsApp'}
                    </span>
                  </Button>
                  
                  <Button 
                    onClick={informAdmin}
                    variant="outline"
                    className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="break-words">Inform Admin</span>
                  </Button>
                  
                  <Button 
                    onClick={checkPaymentStatus} 
                    variant="outline" 
                    className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="break-words">Check Status</span>
                  </Button>
                </>
              )}

              {paymentData.status === 'rejected' && (
                <Button 
                  onClick={onClose} 
                  variant="outline" 
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                >
                  <span className="break-words">Close</span>
                </Button>
              )}

              {paymentData.status === 'confirmed' && (
                <Button 
                  onClick={() => {
                    onClose();
                    if (onPaymentSuccess) {
                      onPaymentSuccess();
                    }
                  }} 
                  className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-11 text-sm sm:text-base"
                >
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="break-words">Access Content</span>
                </Button>
              )}

              {(paymentData.status === 'pending' || paymentData.status === 'confirmed') && (
                <Button 
                  onClick={onClose} 
                  variant="outline" 
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                >
                  <span className="break-words">Close</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 