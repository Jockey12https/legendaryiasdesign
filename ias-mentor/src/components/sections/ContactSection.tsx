"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary font-['Oswald']">
          Get in Touch
        </h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-secondary mb-8">
            Connect with Legendary IAS Mentor for expert guidance and support.
            Embark on your IAS preparation journey with us.
          </p>

          <div className="text-center mb-8">
            <p className="text-secondary mb-2">
              <a href="mailto:contact@legendaryiasmentor.com" className="hover:text-black">
                contact@legendaryiasmentor.com
              </a>
            </p>
            <p className="text-secondary">123-456-7890</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-gray-300"
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
              />
            </div>

            <div>
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border-gray-300"
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
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
