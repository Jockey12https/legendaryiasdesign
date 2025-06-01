import React, { useState } from 'react';
import { Award, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert into Supabase
      const { error: dbError } = await supabase
        .from('demo_registrations')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-demo-email', {
        body: JSON.stringify(formData)
      });

      if (emailError) throw emailError;

      toast.success('New registration-Enquiry for classes successful! Check your email for details.');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              UPSC Preparation with <span className="text-orange-400">Legendary IAS Mentor</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-50">
              Join Legendary IAS Mentor designed to help you excel in one of India's most competitive exams.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <a 
                href="#enroll" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-center transition-all transform hover:scale-105"
              >
                Enroll Now
              </a>
              <a 
                href="#courses" 
                className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-md font-medium text-center transition-all"
              >
                Explore Courses
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-orange-400" />
                <span>High Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-orange-400" />
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span>Flexible Schedule</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 pl-0 md:pl-10">
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Next Batch Starting Soon</h3>
                <div className="bg-blue-50 p-4 rounded mb-6">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-3xl font-bold text-blue-700">15</div>
                      <div className="text-xs text-gray-600">Days</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-3xl font-bold text-blue-700">08</div>
                      <div className="text-xs text-gray-600">Hours</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-3xl font-bold text-blue-700">45</div>
                      <div className="text-xs text-gray-600">Minutes</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow">
                      <div className="text-3xl font-bold text-blue-700">22</div>
                      <div className="text-xs text-gray-600">Seconds</div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleDemoRequest} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address" 
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-all"
                  >
                    {loading ? 'Processing...' : 'Enquire Now'}
                  </button>
                </form>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                Limited Seats!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;