import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Legendary IAS Mentor - Best UPSC Coaching Institute & Civil Services Training in Kerala",
  },
  description:
    "Legendary IAS Mentor is Kerala's leading UPSC coaching institute offering structured civil services training. Expert faculty, personalized mentorship, and a proven success rate prepare aspirants for IAS, IPS, and IFS exams. Join the best IAS academy in Kerala today.",
  keywords: [
    "IAS Academy Kerala",
    "Best IAS Academy India",
    "UPSC Coaching Kerala",
    "Civil Services Coaching",
    "IAS Academy Ernakulam",
    "UPSC Preparation Kerala",
    "Best UPSC Institute India",
    "IAS Coaching Center",
    "Civil Service Academy",
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
    "Upsc coaching institute",
    "civil services training",
  ],
  openGraph: {
    title:
      "Legendary IAS Mentor - Best UPSC Coaching Institute & Civil Services Training in Kerala",
    description:
      "Kerala's leading UPSC coaching institute with expert civil services training, experienced faculty, and a proven success rate for IAS, IPS, and IFS exams.",
    type: "website",
    url: "https://www.legendaryiasmentor.com/about",
    images: [
      "https://ik.imagekit.io/8vvkoi3dt/nitin%20sir_new1.jpg?updatedAt=1755003315847",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Legendary IAS Mentor - Best UPSC Coaching Institute & Civil Services Training in Kerala",
    description:
      "Kerala's leading UPSC coaching institute with expert civil services training and a proven success rate for IAS, IPS, and IFS exams.",
  },
  alternates: {
    canonical: "https://www.legendaryiasmentor.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
