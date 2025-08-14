"use client";

import Script from "next/script";

interface SEOStructuredDataProps {
  type?: 'organization' | 'course' | 'article' | 'faq';
  data?: any;
}

export default function SEOStructuredData({ type = 'organization', data }: SEOStructuredDataProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Legendary IAS Mentor",
    "alternateName": "Best IAS Academy in Kerala",
    "description": "Legendary IAS Mentor is the #1 IAS Academy in Kerala and among the best UPSC coaching institutes in India. We provide expert faculty, proven success rate, comprehensive study material, and personalized guidance for UPSC Civil Services Exam preparation.",
    "url": "https://legendaryiasmentor.com",
    "logo": "https://ext.same-assets.com/2651817114/1248459215.png",
    "image": "https://ext.same-assets.com/2651817114/1248459215.png",
    "telephone": "+91-8129313575",
    "email": "info@legendaryiasmentor.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ernakulam",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "9.9312",
      "longitude": "76.2673"
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "UPSC Coaching Courses",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "UPSC Prelims 2025 Complete Course",
            "description": "Comprehensive preparation for UPSC Civil Services Prelims 2025",
            "provider": {
              "@type": "Organization",
              "name": "Legendary IAS Mentor"
            },
            "courseMode": "Online",
            "educationalLevel": "Advanced",
            "timeRequired": "P6M"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "UPSC Mains 2025 Preparation",
            "description": "Advanced preparation for UPSC Civil Services Mains examination",
            "provider": {
              "@type": "Organization",
              "name": "Legendary IAS Mentor"
            },
            "courseMode": "Online",
            "educationalLevel": "Advanced",
            "timeRequired": "P8M"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Interview Preparation Program",
            "description": "Specialized coaching for UPSC Civil Services Interview",
            "provider": {
              "@type": "Organization",
              "name": "Legendary IAS Mentor"
            },
            "courseMode": "Online",
            "educationalLevel": "Advanced",
            "timeRequired": "P2M"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Priya Sharma"
        },
        "reviewBody": "Legendary IAS Mentor helped me secure AIR 45 in CSE 2024. The faculty is exceptional and the study material is comprehensive."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Rahul Kumar"
        },
        "reviewBody": "Best IAS academy in Kerala. The personalized guidance and mock tests were game-changers for my preparation."
      }
    ],
    "sameAs": [
      "https://www.instagram.com/legendaryiasmentor/",
      "https://www.youtube.com/@Legendary-ias-mentor",
      "https://www.linkedin.com/company/legendary-ias-mentor"
    ],
    "foundingDate": "2020",
    "numberOfEmployees": "25",
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Kerala"
      },
      {
        "@type": "State", 
        "name": "Tamil Nadu"
      },
      {
        "@type": "State",
        "name": "Karnataka"
      }
    ],
    "keywords": "IAS Academy Kerala, Best IAS Academy India, UPSC Coaching Kerala, Civil Services Coaching, IAS Academy Ernakulam, UPSC Preparation Kerala, Best UPSC Institute India, IAS Coaching Center, Civil Services Academy, UPSC Exam Preparation"
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is the best IAS academy in Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Legendary IAS Mentor is recognized as the #1 IAS Academy in Kerala, offering expert faculty, proven success rates, and comprehensive study material for UPSC preparation."
        }
      },
      {
        "@type": "Question", 
        "name": "What makes Legendary IAS Mentor the best UPSC coaching institute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our success rate, expert faculty, personalized guidance, comprehensive study material, regular mock tests, and proven track record of producing successful IAS officers make us the best choice."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer online UPSC coaching?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Yes, we offer both online and offline UPSC coaching programs with live classes, recorded lectures, study material, and 24/7 doubt clearing support."
        }
      },
      {
        "@type": "Question",
        "name": "What is the success rate of Legendary IAS Mentor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We have a proven success rate with hundreds of students clearing UPSC exams and securing top ranks including AIR 45 in CSE 2024."
        }
      },
      {
        "@type": "Question",
        "name": "How much does UPSC coaching cost at Legendary IAS Mentor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our course fees range from ₹5,000 to ₹35,000 depending on the program. We also offer special discounts and installment options for deserving students."
        }
      }
    ]
  };

  const getStructuredData = () => {
    switch (type) {
      case 'faq':
        return faqData;
      case 'organization':
      default:
        return organizationData;
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
