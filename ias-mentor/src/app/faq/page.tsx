"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// FAQ data
const faqData = [
  {
    id: 1,
    category: "Admissions",
    questions: [
      {
        id: "adm-1",
        question: "What are the eligibility criteria for joining your IAS coaching?",
        answer: "To join our IAS coaching program, candidates should have completed their graduation or be in their final year of graduation. There are no specific percentage requirements, though a strong academic background is beneficial. We welcome students from all educational backgrounds and disciplines."
      },
      {
        id: "adm-2",
        question: "How can I enroll in your courses?",
        answer: "Enrollment can be done through our website by filling out the application form, or by visiting our institute in person. After submitting your application, our team will review it and contact you for further steps, including a brief counseling session to help you choose the right program."
      },
      {
        id: "adm-3",
        question: "Do you offer scholarships for deserving candidates?",
        answer: "Yes, we offer scholarships based on merit and need. Candidates can apply for our scholarship program by submitting their academic records and a personal statement. Scholarships can cover up to 50% of the course fee depending on the candidate's profile and performance in our assessment test."
      }
    ]
  },
  {
    id: 2,
    category: "Course Structure",
    questions: [
      {
        id: "course-1",
        question: "What is the duration of your comprehensive IAS preparation course?",
        answer: "Our comprehensive IAS preparation course spans 12 months. This includes coverage of the complete UPSC syllabus, regular tests, and personalized mentoring sessions. The program is designed to prepare candidates for both Preliminary and Mains examinations within this timeframe."
      },
      {
        id: "course-2",
        question: "Do you provide study materials, or should we arrange them?",
        answer: "We provide comprehensive study materials for all subjects covered in our courses. These materials are regularly updated to reflect the latest UPSC patterns and trends. Our study package includes printed notes, e-books, practice question banks, and access to our digital library."
      },
      {
        id: "course-3",
        question: "How are the classes conducted - online, offline, or both?",
        answer: "We offer flexible learning options including online, offline, and hybrid modes. Students can choose the mode that best suits their needs. Our online platform provides live interactive classes, recorded sessions, and the same level of teacher interaction as in-person classes."
      }
    ]
  },
  {
    id: 3,
    category: "Mentorship & Support",
    questions: [
      {
        id: "support-1",
        question: "What kind of mentorship and guidance do you provide?",
        answer: "Our mentorship program includes one-on-one sessions with experienced UPSC faculty, regular progress assessments, personalized study plans, and strategy sessions. Each student is assigned a dedicated mentor who guides them throughout their preparation journey."
      },
      {
        id: "support-2",
        question: "Do you offer doubt-clearing sessions outside regular class hours?",
        answer: "Yes, we offer dedicated doubt-clearing sessions outside regular class hours. Students can book slots with faculty members based on their availability. Additionally, our online platform has a 24/7 doubt resolution system where questions are typically answered within 24 hours."
      },
      {
        id: "support-3",
        question: "Is there any psychological support for dealing with exam stress?",
        answer: "Yes, we provide psychological support through regular counseling sessions, stress management workshops, and mindfulness training. Our team includes qualified counselors who specialize in helping students cope with exam-related stress and maintain optimal mental health during preparation."
      }
    ]
  },
  {
    id: 4,
    category: "Test Series & Evaluation",
    questions: [
      {
        id: "test-1",
        question: "How frequently are mock tests conducted?",
        answer: "We conduct weekly subject-specific tests and monthly comprehensive mock tests following the exact UPSC pattern. Additionally, we organize quarterly full-length simulations of both Preliminary and Mains examinations to give students a realistic exam experience."
      },
      {
        id: "test-2",
        question: "How is the evaluation of answer sheets done, especially for subjective papers?",
        answer: "Evaluation is done by experienced faculty members who have served as evaluators for actual UPSC examinations. Each answer is assessed based on content, structure, relevance, and presentation. Detailed feedback is provided for every answer, highlighting strengths and areas for improvement."
      },
      {
        id: "test-3",
        question: "Do you provide personalized feedback on test performance?",
        answer: "Yes, we provide detailed personalized feedback on each test performance. This includes a comprehensive analysis of strengths and weaknesses, comparison with top performers, and specific strategies to improve scores. One-on-one feedback sessions are arranged after major mock tests."
      }
    ]
  },
  {
    id: 5,
    category: "Success Rate & Alumni",
    questions: [
      {
        id: "success-1",
        question: "What is your success rate in the UPSC CSE?",
        answer: "Our institute has maintained a consistent success rate of over 35% in the UPSC CSE, which is significantly higher than the national average. In the last five years, we have produced over 120 successful candidates, including several in the top 100 ranks."
      },
      {
        id: "success-2",
        question: "Can we interact with your alumni who have cleared the exam?",
        answer: "Yes, we regularly organize alumni interaction sessions where successful candidates share their journey, strategies, and insights. Additionally, we have a mentorship program where our alumni volunteer to guide current students through various stages of preparation."
      }
    ]
  }
];

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleAccordion }: FAQItemProps) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg">
      <button
        className={`flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-medium text-secondary">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-gray-200 bg-gray-50">
              <p className="text-gray-600">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<number>(1);

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      {/* FAQ Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-lg max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our programs, admission process,
            and IAS preparation journey.
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {faqData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-primary text-secondary font-bold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordions */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {faqData
              .find((category) => category.id === activeCategory)
              ?.questions.map((item) => (
                <FAQItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={!!openAccordions[item.id]}
                  toggleAccordion={() => toggleAccordion(item.id)}
                />
              ))}
          </motion.div>

          {/* Contact Callout */}
          <motion.div
            className="mt-16 p-8 rounded-xl bg-primary/10 border border-primary text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-secondary">Still have questions?</h3>
            <p className="mb-6 text-gray-700">
              If you couldn't find answers to your questions, feel free to contact our support team.
            </p>
            <div className="space-x-4">
              <a
                href="mailto:contact@legendaryiasmentor.com"
                className="inline-block px-6 py-3 bg-primary text-secondary rounded-md font-medium
                           hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-secondary text-white rounded-md font-medium
                           hover:bg-secondary/90 transition-all transform hover:scale-105"
              >
                Contact Page
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
