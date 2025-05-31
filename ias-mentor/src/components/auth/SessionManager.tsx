"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import SessionTimeoutWarning from './SessionTimeoutWarning';

export default function SessionManager() {
  const { user, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [warningTimeLeft, setWarningTimeLeft] = useState(0);

  const { extendSession, getRemainingTime } = useSessionTimeout({
    timeoutMinutes: 30, // 30 minutes session timeout
    warningMinutes: 5,  // Show warning 5 minutes before timeout
    onWarning: () => {
      setWarningTimeLeft(5 * 60); // 5 minutes in seconds
      setShowWarning(true);
    },
    onTimeout: () => {
      setShowWarning(false);
      // Logout is handled by the hook
    },
  });

  const handleExtendSession = () => {
    extendSession();
    setShowWarning(false);
  };

  const handleLogout = async () => {
    setShowWarning(false);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Only render if user is logged in
  if (!user) {
    return null;
  }

  return (
    <SessionTimeoutWarning
      isOpen={showWarning}
      onExtend={handleExtendSession}
      onLogout={handleLogout}
      remainingSeconds={warningTimeLeft}
    />
  );
}
