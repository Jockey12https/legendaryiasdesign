'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';

interface UPIQRCodeProps {
  upiId: string;
  amount: number;
  merchantName?: string;
  transactionNote?: string;
}

export default function UPIQRCode({ upiId, amount, merchantName = "Legendary IAS Mentor", transactionNote = "Study Material Payment" }: UPIQRCodeProps) {
  const [copied, setCopied] = React.useState(false);

  // Generate UPI QR code data
  const generateUPIQRData = () => {
    const qrData = {
      vpa: upiId,
      name: merchantName,
      amount: amount,
      tn: transactionNote
    };
    
    // Format as UPI QR code string
    return `upi://pay?pa=${qrData.vpa}&pn=${encodeURIComponent(qrData.name)}&am=${qrData.amount}&tn=${encodeURIComponent(qrData.tn)}`;
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    // In a real implementation, you would generate an actual QR code image
    // For now, we'll create a simple canvas-based QR code
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple QR-like pattern (this is just a placeholder)
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#fff';
      ctx.fillRect(10, 10, 180, 180);
      ctx.fillStyle = '#000';
      ctx.fillRect(20, 20, 160, 160);
      
      // Add text
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('UPI QR Code', 100, 190);
    }
    
    const link = document.createElement('a');
    link.download = 'upi-qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">UPI Payment QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-2">
                <div className="text-xs text-gray-500 text-center">
                  QR Code<br />
                  Would Appear<br />
                  Here
                </div>
              </div>
              <p className="text-xs text-gray-500">Scan to pay ₹{amount}</p>
            </div>
          </div>
        </div>

        {/* UPI ID Display */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">UPI ID:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
              {upiId}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={copyUpiId}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-600">UPI ID copied!</p>
          )}
        </div>

        {/* Payment Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Merchant:</span>
            <span className="font-medium">{merchantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Note:</span>
            <span className="font-medium">{transactionNote}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={downloadQRCode}
            variant="outline" 
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR Code
          </Button>
          
          <div className="text-xs text-gray-500 text-center">
            <p>Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Scan QR code with any UPI app</li>
              <li>Or copy UPI ID and pay manually</li>
              <li>Send payment screenshot via WhatsApp</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 