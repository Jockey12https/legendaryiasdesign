import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Best CUET Coaching Online & Offline | Legendary IAS Mentor",
  },
  description:
    "Join the best CUET coaching online & offline at Legendary IAS Mentor. Get expert guidance, comprehensive mock tests, study materials, and personalized mentorship to secure your seat in top universities.",
  keywords: [
    "cuet coaching online",
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
    "UPSC Coaching Center Kerala",
    "CUET preparation",
    "CUET exam coaching",
    "CUET online classes",
  ],
  openGraph: {
    title: "Best CUET Coaching Online & Offline | Legendary IAS Mentor",
    description:
      "Join the best CUET coaching online & offline at Legendary IAS Mentor. Expert faculty, mock tests, and personalized mentorship for top university admissions.",
    type: "website",
    url: "https://www.legendaryiasmentor.com/cuet",
    images: [
      "https://ik.imagekit.io/8vvkoi3dt/PODCAST%20THUMBNAIL.png?updatedAt=1758560835184",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best CUET Coaching Online & Offline | Legendary IAS Mentor",
    description:
      "Expert CUET coaching online & offline with mock tests, study materials, and personalized mentorship at Legendary IAS Mentor.",
  },
  alternates: {
    canonical: "https://www.legendaryiasmentor.com/cuet",
  },
};

export default function CuetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
