import React from 'react';
import { Calendar, Clock, BookOpen, Users, FileText, Video } from 'lucide-react';

const Courses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "Comprehensive UPSC Preparation Course",
      description: "A complete end-to-end preparation course covering all subjects and topics for UPSC CSE Prelims and Mains.",
      duration: "12 months",
      features: [
        "Daily live classes",
        "Study materials",
        "Mock tests",
        "Personal mentoring",
        "Doubt clearing sessions",
        "Current affairs updates"
      ],
      price: "₹75,000",
      popular: true
    },
    {
      id: 2,
      title: "UPSC Prelims Special Batch",
      description: "Focused preparation for clearing the UPSC Preliminary examination with extensive practice and strategy.",
      duration: "6 months",
      features: [
        "MCQ focused training",
        "Subject-wise tests",
        "Previous year papers",
        "Weekly mock tests",
        "Strategy sessions",
        "Performance analysis"
      ],
      price: "₹45,000",
      popular: false
    },
    {
      id: 3,
      title: "UPSC Interview Guidance Program",
      description: "Specialized coaching for personality test/interview preparation with mock interviews by expert panel.",
      duration: "2 months",
      features: [
        "DAF analysis",
        "Mock interviews",
        "Personality development",
        "Current affairs discussions",
        "Expert feedback",
        "Success strategies"
      ],
      price: "₹35,000",
      popular: false
    }
  ];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Specialized UPSC Courses</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Designed by experts with years of experience in guiding UPSC aspirants to success, our courses provide comprehensive preparation for all stages of the examination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1 border ${course.popular ? 'border-orange-500' : 'border-transparent'}`}
            >
              {course.popular && (
                <div className="bg-orange-500 text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex items-center text-gray-700 mb-4">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Duration: {course.duration}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-blue-900">{course.price}</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
                
                <a 
                  href="#enroll" 
                  className={`block text-center py-3 px-4 rounded-md font-semibold transition-colors ${
                    course.popular 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">What Our Courses Include</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every aspect of our courses is designed to provide you with the best possible preparation experience for UPSC examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Video className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Live Online Classes</h3>
              <p className="text-gray-600">
                Interactive live sessions conducted by experienced faculty members, with real-time doubt resolution.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Comprehensive Study Material</h3>
              <p className="text-gray-600">
                Well-researched, concise and exam-oriented study notes covering all subjects and topics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Personal Mentoring</h3>
              <p className="text-gray-600">
                One-on-one guidance sessions to address individual strengths, weaknesses and preparation strategy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Mock Tests & Evaluations</h3>
              <p className="text-gray-600">
                Regular mock tests followed by comprehensive evaluation and feedback to improve performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Current Affairs Updates</h3>
              <p className="text-gray-600">
                Daily and weekly current affairs material with analysis of important events from an examination perspective.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Access to recorded sessions and study materials allowing you to learn at your own pace and convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;