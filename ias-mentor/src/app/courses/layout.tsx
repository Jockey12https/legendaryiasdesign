import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Best IAS Coaching in Kerala | UPSC Courses | Legendary IAS Mentor",
  },
  description:
    "Legendary IAS Mentor offers the best IAS coaching in Kerala with expert UPSC faculty, proven success rates, and programs for every stage — Prelims, Mains, and Interview. Enroll now to begin your civil services preparation journey.",
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
    "UPSC Coaching Center Kerala",
    "best ias coaching in kerala",
  ],
  openGraph: {
    title:
      "Best IAS Coaching in Kerala | UPSC Courses | Legendary IAS Mentor",
    description:
      "Legendary IAS Mentor offers the best IAS coaching in Kerala with expert UPSC faculty, proven success rates, and programs for Prelims, Mains, and Interview.",
    type: "website",
    url: "https://www.legendaryiasmentor.com/courses",
    images: [
      "https://ik.imagekit.io/8vvkoi3dt/nitin%20sir_new1.jpg?updatedAt=1755003315847",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Best IAS Coaching in Kerala | UPSC Courses | Legendary IAS Mentor",
    description:
      "Expert UPSC courses and civil services programs at Legendary IAS Mentor — Kerala's best IAS coaching institute.",
  },
  alternates: {
    canonical: "https://www.legendaryiasmentor.com/courses",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
