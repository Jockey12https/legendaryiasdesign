import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

const Enrollment: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState("comprehensive");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(supabase.auth.getUser());
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    // Clear error when user starts typing
    setFormErrors({
      ...formErrors,
      [e.target.id]: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      city: ''
    };

    // Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Name is required';
      isValid = false;
    } else if (formData.fullName.length < 3) {
      errors.fullName = 'Name must be at least 3 characters long';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const courseDetails = {
    comprehensive: {
      name: "Comprehensive UPSC Preparation Course",
      price: "75000",
      priceDisplay: "₹75,000",
      features: [
        "12 months course duration",
        "Complete syllabus coverage for Prelims & Mains",
        "Daily live classes with expert faculty",
        "Comprehensive study materials for all subjects",
        "Weekly subject-wise tests with feedback",
        "Monthly full-length mock tests",
        "Personal mentoring sessions",
        "Current affairs magazines and daily updates",
        "Interview guidance for selected candidates",
        "Access to recorded sessions for revision"
      ]
    },
    prelims: {
      name: "UPSC Prelims Special Batch",
      price: "45000",
      priceDisplay: "₹45,000",
      features: [
        "6 months course duration",
        "Focus on MCQ-based preparation for Prelims",
        "Comprehensive coverage of all Prelims subjects",
        "Daily practice questions and weekly tests",
        "Previous years' question paper analysis",
        "Strategic sessions on Prelims approach",
        "Special current affairs focus from UPSC perspective",
        "Performance analytics and improvement strategies",
        "Access to recorded sessions for revision",
        "Dedicated doubt clearing sessions"
      ]
    },
    interview: {
      name: "UPSC Interview Guidance Program",
      price: "35000",
      priceDisplay: "₹35,000",
      features: [
        "2 months intensive interview preparation",
        "DAF (Detailed Application Form) analysis",
        "Multiple mock interviews with expert panel",
        "Personalized feedback after each session",
        "Group discussions on current topics",
        "Personality development sessions",
        "Body language and communication training",
        "Stress interview handling techniques",
        "Subject-specific question preparation",
        "Final assessment and improvement plan"
      ]
    }
  };

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      setShowAuthModal(true);
      return;
    }

    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    try {
      // Store enrollment details in Supabase
      const { error: dbError } = await supabase
        .from('enrollments')
        .insert([{
          ...formData,
          course: courseDetails[selectedCourse as keyof typeof courseDetails].name,
          amount: courseDetails[selectedCourse as keyof typeof courseDetails].price,
          user_id: session.data.session.user.id
        }]);

      if (dbError) throw dbError;

      // Send enrollment confirmation email
      await supabase.functions.invoke('send-enrollment-email', {
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          course: courseDetails[selectedCourse as keyof typeof courseDetails].name,
          phone: formData.phone,
          city: formData.city,
          message: formData.message
        }),
      });

      toast.success('Enrollment submitted successfully! Check your email for confirmation.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        message: ''
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enroll" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Begin Your UPSC Journey Today</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enroll in our expert-led courses and take the first step towards your dream of becoming a civil servant.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-blue-900 p-6 text-white">
                <h3 className="text-2xl font-bold mb-6">Select Your Course</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="course" 
                      value="comprehensive" 
                      checked={selectedCourse === "comprehensive"} 
                      onChange={() => setSelectedCourse("comprehensive")}
                      className="hidden" 
                    />
                    <span className={`inline-block w-5 h-5 mr-3 rounded-full border ${
                      selectedCourse === "comprehensive" 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'bg-transparent border-white'
                    }`}></span>
                    <span className="text-lg">Comprehensive Course</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="course" 
                      value="prelims" 
                      checked={selectedCourse === "prelims"} 
                      onChange={() => setSelectedCourse("prelims")}
                      className="hidden" 
                    />
                    <span className={`inline-block w-5 h-5 mr-3 rounded-full border ${
                      selectedCourse === "prelims" 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'bg-transparent border-white'
                    }`}></span>
                    <span className="text-lg">Prelims Special Batch</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="course" 
                      value="interview" 
                      checked={selectedCourse === "interview"} 
                      onChange={() => setSelectedCourse("interview")}
                      className="hidden" 
                    />
                    <span className={`inline-block w-5 h-5 mr-3 rounded-full border ${
                      selectedCourse === "interview" 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'bg-transparent border-white'
                    }`}></span>
                    <span className="text-lg">Interview Guidance</span>
                  </label>
                </div>
                
                <div className="mt-10">
                  <div className="text-3xl font-bold mb-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].priceDisplay}
                  </div>
                  <p className="text-blue-200">
                    EMI options available
                  </p>
                </div>
                
                <div className="mt-10">
                  <p className="text-blue-200 text-sm">
                    * Limited time offer: Enroll before 30th June and get a 10% early bird discount.
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {courseDetails[selectedCourse as keyof typeof courseDetails].name}
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <form onSubmit={handleEnrollment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="fullName" 
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {formErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input 
                        type="text" 
                        id="city" 
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your city"
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Any specific requirements? (Optional)
                    </label>
                    <textarea 
                      id="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows={3} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about any specific requirements or questions you have" 
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-all"
                  >
                    {loading ? 'Processing...' : 'Submit Enrollment'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="mt-10 bg-blue-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Need Counseling Before Enrolling?</h3>
            <p className="mb-4">
              Not sure which course is right for you? Schedule a free counseling session with our academic advisors to discuss your preparation strategy.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-blue-800 hover:bg-blue-100 px-6 py-2 rounded-md font-medium transition-all"
            >
              Schedule Free Counseling
            </a>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </section>
  );
};

export default Enrollment;