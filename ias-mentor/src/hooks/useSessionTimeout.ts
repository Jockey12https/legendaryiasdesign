"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseSessionTimeoutProps {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onWarning?: () => void;
  onTimeout?: () => void;
}

export const useSessionTimeout = ({
  timeoutMinutes = 30, // 30 minutes default
  warningMinutes = 5,  // 5 minutes warning
  onWarning,
  onTimeout,
}: UseSessionTimeoutProps = {}) => {
  const { user, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    if (!user) return;

    // Set warning timer
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    warningRef.current = setTimeout(() => {
      onWarning?.();
    }, warningTime);

    // Set timeout timer
    const timeoutTime = timeoutMinutes * 60 * 1000;
    timeoutRef.current = setTimeout(async () => {
      try {
        await logout();
        onTimeout?.();
      } catch (error) {
        console.error('Auto-logout error:', error);
      }
    }, timeoutTime);
  }, [user, logout, timeoutMinutes, warningMinutes, onWarning, onTimeout]);

  const handleActivity = useCallback(() => {
    if (user) {
      resetTimer();
    }
  }, [user, resetTimer]);

  useEffect(() => {
    if (!user) {
      // Clear timers when user logs out
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }
      return;
    }

    // Start the timer when user logs in
    resetTimer();

    // Activity events to track
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }
    };
  }, [user, handleActivity, resetTimer]);

  const getRemainingTime = useCallback(() => {
    if (!user) return 0;
    
    const elapsed = Date.now() - lastActivityRef.current;
    const remaining = (timeoutMinutes * 60 * 1000) - elapsed;
    
    return Math.max(0, Math.floor(remaining / 1000)); // Return seconds
  }, [user, timeoutMinutes]);

  const extendSession = useCallback(() => {
    if (user) {
      resetTimer();
    }
  }, [user, resetTimer]);

  return {
    getRemainingTime,
    extendSession,
    resetTimer,
  };
};
