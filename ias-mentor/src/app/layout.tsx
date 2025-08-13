import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import LiveUpdatesWidget from "@/components/LiveUpdatesWidget";
import ClientOnly from "@/components/ClientOnly";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentManagementProvider } from "@/contexts/ContentManagementContext";
import SessionManager from "@/components/auth/SessionManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legendary IAS Mentor",
  description: "Leading online academy for individuals aspiring to excel in civil services.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Mock data - replace with actual data from your backend
const mockAnnouncements = [
  {
    id: "1",
    title: "UPSC 2025 Prelims Notification Released",
    content: "The UPSC has released the official notification for Civil Services Prelims 2025. Important dates and application process details are now available.",
    category: "upsc-update" as const,
    priority: "high" as const,
    isActive: true,
    createdAt: new Date("2025-01-15T10:00:00Z"),
  },
  {
    id: "2",
    title: "New Foundation Course Starting March 1st",
    content: "Join our comprehensive foundation course designed for beginners. Limited seats available with special early bird discount.",
    category: "course-launch" as const,
    priority: "medium" as const,
    isActive: true,
    createdAt: new Date("2025-01-14T14:30:00Z"),
  }
];

const mockLiveUpdates = [
  {
    id: "1",
    title: "UPSC Prelims 2025 Application Deadline",
    content: "Last date to apply for UPSC Civil Services Prelims 2025 is February 20, 2025. Don't miss this opportunity!",
    type: "upsc-notification" as const,
    priority: "high" as const,
    timestamp: new Date("2025-01-15T12:00:00Z"),
    isRead: false,
    isActive: true,
  },
  {
    id: "2",
    title: "New Study Material Available",
    content: "Updated current affairs PDF for January 2025 is now available in the student portal.",
    type: "study-material" as const,
    priority: "medium" as const,
    timestamp: new Date("2025-01-15T10:00:00Z"), // 2 hours ago
    isRead: false,
    isActive: true,
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        <AuthProvider>
          <ContentManagementProvider>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
              <Header />
              <ClientOnly>
                <AnnouncementBanner 
                  announcements={mockAnnouncements}
                  isEnabled={false}
                />
              </ClientOnly>
              <main className="flex-grow overflow-x-hidden">{children}</main>
              <Footer />
              <ClientOnly>
                <LiveUpdatesWidget 
                  updates={mockLiveUpdates}
                />
              </ClientOnly>
            </div>
            <SessionManager />
          </ContentManagementProvider>
        </AuthProvider>
      </ClientBody>
    </html>
  );
}
