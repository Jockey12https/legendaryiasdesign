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
import SEOStructuredData from "@/components/SEOStructuredData";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Legendary IAS Mentor - Best IAS Academy in Kerala & India | UPSC Coaching",
    template: "%s | Legendary IAS Mentor"
  },
  description: "Legendary IAS Mentor is the #1 IAS Academy in Kerala and among the best UPSC coaching institutes in India. Expert faculty, proven success rate, comprehensive study material, and personalized guidance for UPSC Civil Services Exam preparation. Join thousands of successful IAS aspirants.",
  keywords: [
    "IAS Academy Kerala",
    "Best IAS Academy India", 
    "UPSC Coaching Kerala",
    "Civil Services Coaching",
    "IAS Academy Ernakulam",
    "UPSC Preparation Kerala",
    "Best UPSC Institute India",
    "IAS Coaching Center",
    "Civil Services Academy",
    "UPSC Exam Preparation",
    "IAS Academy Near Me",
    "UPSC Coaching Institute",
    "Civil Services Training",
    "IAS Academy Trivandrum",
    "UPSC Academy Kerala",
    "Best IAS Coaching India",
    "Civil Services Institute",
    "UPSC Preparation Institute",
    "IAS Academy Kochi",
    "UPSC Coaching Center Kerala"
  ],
  authors: [{ name: "Legendary IAS Mentor" }],
  creator: "Legendary IAS Mentor",
  publisher: "Legendary IAS Mentor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://legendaryiasmentor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://legendaryiasmentor.com',
    title: 'Legendary IAS Mentor - Best IAS Academy in Kerala & India',
    description: 'Legendary IAS Mentor is the #1 IAS Academy in Kerala and among the best UPSC coaching institutes in India. Expert faculty, proven success rate, comprehensive study material, and personalized guidance for UPSC Civil Services Exam preparation.',
    siteName: 'Legendary IAS Mentor',
    images: [
      {
        url: 'https://ext.same-assets.com/2651817114/1248459215.png',
        width: 1200,
        height: 630,
        alt: 'Legendary IAS Mentor - Best IAS Academy in Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legendary IAS Mentor - Best IAS Academy in Kerala & India',
    description: 'Legendary IAS Mentor is the #1 IAS Academy in Kerala and among the best UPSC coaching institutes in India. Expert faculty, proven success rate, comprehensive study material.',
    images: ['https://ext.same-assets.com/2651817114/1248459215.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code-here',
    yahoo: 'your-yahoo-verification-code-here',
  },
  icons: {
    icon: [
      {
        url: 'https://ext.same-assets.com/2651817114/1248459215.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://ext.same-assets.com/2651817114/1248459215.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: 'https://ext.same-assets.com/2651817114/1248459215.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: 'https://ext.same-assets.com/2651817114/1248459215.png',
  },
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
      <head>
        <SEOStructuredData type="organization" />
        <SEOStructuredData type="faq" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
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
