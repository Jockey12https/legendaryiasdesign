'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [step, setStep] = useState<'access-code' | 'login'>('access-code');
  const [accessCode, setAccessCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'ADMIN_SECRET';
    
    // Debug: Log the admin secret (remove in production)
    console.log('Admin secret check:', adminSecret ? 'Set' : 'Not set');
    
    if (accessCode === adminSecret) {
      setStep('login');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple admin authentication
      if (username === 'admin' && password === 'admin123') {
        // Store admin session
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        
        onSuccess();
        onClose();
        resetForm();
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('access-code');
    setAccessCode('');
    setUsername('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Admin Access
          </DialogTitle>
        </DialogHeader>

        {step === 'access-code' ? (
          <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
            <div className="text-center py-4">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enter Access Code</h3>
              <p className="text-sm text-gray-600">
                Please enter the admin access code to continue.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                id="accessCode"
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                required
                className="text-center font-mono"
              />
            </div>

            {error && (
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center py-4">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Admin Login</h3>
              <p className="text-sm text-gray-600">
                Enter your admin credentials.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('access-code')}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 