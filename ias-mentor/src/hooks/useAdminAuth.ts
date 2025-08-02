'use client';

import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    try {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (adminAuth === 'true' && loginTime) {
        // Check if login is within 24 hours
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAdminAuthenticated(true);
        } else {
          // Session expired
          logout();
        }
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setIsAdminAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    setIsAdminAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setIsAdminAuthenticated(false);
  };

  return {
    isAdminAuthenticated,
    loading,
    login,
    logout,
    checkAdminAuth
  };
}; 