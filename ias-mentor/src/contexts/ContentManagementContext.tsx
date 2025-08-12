"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContentManagementService, ContentSettings } from '@/utils/contentManagementService';

interface ContentManagementState {
  announcementsEnabled: boolean;
  liveUpdatesEnabled: boolean;
  newsSectionEnabled: boolean;
  courseShowcaseEnabled: boolean;
  calendarEnabled: boolean;
}

interface ContentManagementContextType {
  state: ContentManagementState;
  setAnnouncementsEnabled: (enabled: boolean) => void;
  setLiveUpdatesEnabled: (enabled: boolean) => void;
  setNewsSectionEnabled: (enabled: boolean) => void;
  setCourseShowcaseEnabled: (enabled: boolean) => void;
  setCalendarEnabled: (enabled: boolean) => void;
  isAnyFeatureEnabled: () => boolean;
  isLoading: boolean;
}

const defaultState: ContentManagementState = {
  announcementsEnabled: false,
  liveUpdatesEnabled: false,
  newsSectionEnabled: false,
  courseShowcaseEnabled: false,
  calendarEnabled: false,
};

const ContentManagementContext = createContext<ContentManagementContextType | undefined>(undefined);

export function ContentManagementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentManagementState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from Firebase on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const settings = await ContentManagementService.getContentSettings();
        setState(settings);
      } catch (error) {
        console.error('Error loading content settings:', error);
        // Fallback to localStorage if Firebase fails
        const savedState = localStorage.getItem('contentManagementState');
        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState);
            setState(parsedState);
          } catch (error) {
            console.error('Error parsing saved content management state:', error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save state to Firebase and localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const saveSettings = async () => {
        try {
          await ContentManagementService.updateContentSettings(state);
          localStorage.setItem('contentManagementState', JSON.stringify(state));
        } catch (error) {
          console.error('Error saving content settings:', error);
          // Fallback to localStorage only
          localStorage.setItem('contentManagementState', JSON.stringify(state));
        }
      };

      saveSettings();
    }
  }, [state, isLoading]);

  const setAnnouncementsEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, announcementsEnabled: enabled }));
  };

  const setLiveUpdatesEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, liveUpdatesEnabled: enabled }));
  };

  const setNewsSectionEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, newsSectionEnabled: enabled }));
  };

  const setCourseShowcaseEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, courseShowcaseEnabled: enabled }));
  };

  const setCalendarEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, calendarEnabled: enabled }));
  };

  const isAnyFeatureEnabled = () => {
    return Object.values(state).some(enabled => enabled);
  };

  return (
    <ContentManagementContext.Provider
      value={{
        state,
        setAnnouncementsEnabled,
        setLiveUpdatesEnabled,
        setNewsSectionEnabled,
        setCourseShowcaseEnabled,
        setCalendarEnabled,
        isAnyFeatureEnabled,
        isLoading,
      }}
    >
      {children}
    </ContentManagementContext.Provider>
  );
}

export function useContentManagement() {
  const context = useContext(ContentManagementContext);
  if (context === undefined) {
    throw new Error('useContentManagement must be used within a ContentManagementProvider');
  }
  return context;
}
