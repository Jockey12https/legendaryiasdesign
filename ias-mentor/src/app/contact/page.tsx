"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'jithinsj123@gmail.com',
          from: formData.email,
          subject: `Contact Form: ${formData.subject}`,
          text: `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you soon.",
          duration: 5000,
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Contact Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']">
            Contact Us
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-center mb-8">
            Have questions about our programs or need personalized advice?
            Reach out to us and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-secondary font-['Oswald']">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Address</h3>
                  <p className="text-secondary">
                    Legendary IAS Mentor Civil Service Academy<br />
                    2nd Floor, Mudumbil, Tower Plamood signal<br />
                    Plamoodu, Road, Pattom, Thiruvananthapuram<br />
                    Kerala 695004, India
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Contact Information</h3>
                  <p className="text-secondary mb-1">
                    <span className="font-bold">Email:</span>{" "}
                    <a href="mailto:legendaryiasmentor@gmail.com" className="hover:text-black">
                      legendaryiasmentor@gmail.com
                    </a>
                  </p>
                  <p className="text-secondary">
                    <span className="font-bold">Phone:</span>{" "}
                    <a href="tel:+918129313575" className="hover:text-black">
                      +91-8129313575
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Office Hours</h3>
                  <p className="text-secondary">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/legendaryiasmentor/" target="_blank" rel="noreferrer"
                      className="bg-secondary text-white hover:bg-secondary/90 w-10 h-10 flex items-center justify-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                        <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/@Legendary-ias-mentor" target="_blank" rel="noreferrer"
                      className="bg-secondary text-white hover:bg-secondary/90 w-10 h-10 flex items-center justify-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5">
                        <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/wix-com" target="_blank" rel="noreferrer"
                      className="bg-secondary text-white hover:bg-secondary/90 w-10 h-10 flex items-center justify-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                        <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-secondary font-['Oswald']">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-gray-300 w-full"
                    required
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
