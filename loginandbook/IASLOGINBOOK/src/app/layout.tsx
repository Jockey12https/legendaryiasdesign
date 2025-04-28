import "@/app/globals.css";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald"
});
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Legendary IAS Mentor - Premier Civil Services Coaching",
  description: "Legendary IAS Mentor provides comprehensive courses and expert guidance for individuals aspiring to excel in civil services examinations.",
  keywords: ["IAS", "Civil Services", "UPSC", "IAS Coaching", "IAS Mentor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        oswald.variable,
        playfair.variable
      )}>
        {children}
      </body>
    </html>
  );
}
