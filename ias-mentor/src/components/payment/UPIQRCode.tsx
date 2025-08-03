'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface UPIQRCodeProps {
  upiId: string;
  amount: number;
  merchantName?: string;
  transactionNote?: string;
}

export default function UPIQRCode({ upiId, amount, merchantName = "Legendary IAS Mentor", transactionNote = "Study Material Payment" }: UPIQRCodeProps) {
  const [copied, setCopied] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Check if mobile for responsive QR code size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate UPI QR code data
  const generateUPIQRData = React.useMemo(() => {
    const qrData = {
      vpa: upiId,
      name: merchantName,
      amount: amount,
      tn: transactionNote
    };
    
    // Format as UPI QR code string
    return `upi://pay?pa=${qrData.vpa}&pn=${encodeURIComponent(qrData.name)}&am=${qrData.amount}&tn=${encodeURIComponent(qrData.tn)}`;
  }, [upiId, merchantName, amount, transactionNote]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-sm sm:text-base">UPI Payment QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3 sm:p-4">
        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center p-2">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-1 sm:mb-2">
                <QRCodeCanvas 
                  value={generateUPIQRData} 
                  size={isMobile ? 64 : 80}
                  level="M"
                  includeMargin={true}
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-gray-500">Scan to pay ₹{amount}</p>
            </div>
          </div>
        </div>

        {/* UPI ID Display */}
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm font-medium text-gray-700">UPI ID:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-mono break-all">
              {upiId}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={copyUpiId}
              className="shrink-0 h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-600">UPI ID copied!</p>
          )}
        </div>

        {/* Payment Details */}
        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Merchant:</span>
            <span className="font-medium truncate ml-2">{merchantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Note:</span>
            <span className="font-medium truncate ml-2 text-xs">{transactionNote}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-500 text-center">
          <p className="font-medium mb-1">Instructions:</p>
          <ol className="list-decimal list-inside space-y-0.5">
            <li>Scan QR code with any UPI app</li>
            <li>Or copy UPI ID and pay manually</li>
            <li>Send payment screenshot via WhatsApp</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
} 