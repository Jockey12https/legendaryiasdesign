import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-blue-900">{question}</h3>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-blue-600" />
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-3 text-gray-600 pr-8">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How is this course different from other UPSC coaching programs?",
      answer: "Our course is designed by experts, who has over 15 years of experience mentoring civil service aspirants. The program offers personalized attention, comprehensive study materials, regular mock tests, and one-on-one mentoring sessions. We focus on understanding each student's strengths and weaknesses to create a customized preparation strategy."
    },
    {
      question: "What is the duration of the comprehensive course?",
      answer: "The comprehensive UPSC preparation course runs for 12 months. It covers complete syllabus for both Prelims and Mains examinations, along with interview preparation for those who qualify for the personality test."
    },
    {
      question: "Do you provide study materials or do I need to purchase them separately?",
      answer: "We provide complete study materials for all subjects covered in the UPSC syllabus. These materials are regularly updated and are designed to be comprehensive yet concise. You don't need to purchase any additional study materials, though we do recommend certain reference books for deeper understanding of specific topics."
    },
    {
      question: "Can I access recorded classes if I miss a live session?",
      answer: "Yes, all live classes are recorded and made available in your student portal within 24 hours. You can access these recordings anytime during your course duration, allowing for flexible learning at your own pace."
    },
    {
      question: "How many mock tests are included in the course?",
      answer: "The comprehensive course includes weekly subject-wise tests and monthly full-length mock tests for both Prelims and Mains. In total, you will have access to over 50 mock tests throughout the course duration, all with detailed performance analysis and feedback."
    },
    {
      question: "What is your success rate in UPSC examinations?",
      answer: "Over the past decade, we have maintained an average success rate of 35-40% in the Prelims and 20-25% in the final selection, which is significantly higher than the national average. More than 500 of our students have successfully joined various civil services."
    },
    {
      question: "Is there a refund policy if I'm not satisfied with the course?",
      answer: "Yes, we offer a 7-day money-back guarantee for all our courses. If you're not satisfied with the quality of teaching or materials, you can request a refund within the first week of joining, and we will process it without any questions."
    },
    {
      question: "Do you offer installment payment options?",
      answer: "Yes, we understand that the course fee might be substantial for many aspirants. We offer flexible payment plans where you can pay in 3 or 6 equal monthly installments without any additional charges."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our courses, methodology, and success stories.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-700 mb-4">Still have questions? Reach out to us directly.</p>
            <a 
              href="#contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;