import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
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
                    Legendary IAS Mentor<br />
                    1234 Education Avenue<br />
                    New Delhi, 110001<br />
                    India
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Contact Information</h3>
                  <p className="text-secondary mb-1">
                    <span className="font-bold">Email:</span>{" "}
                    <a href="mailto:contact@legendaryiasmentor.com" className="hover:text-black">
                      contact@legendaryiasmentor.com
                    </a>
                  </p>
                  <p className="text-secondary">
                    <span className="font-bold">Phone:</span> 123-456-7890
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
                    <a href="https://www.facebook.com/wix" target="_blank" rel="noreferrer"
                      className="bg-secondary text-white hover:bg-secondary/90 w-10 h-10 flex items-center justify-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5">
                        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                    </a>
                    <a href="https://www.twitter.com/wix" target="_blank" rel="noreferrer"
                      className="bg-secondary text-white hover:bg-secondary/90 w-10 h-10 flex items-center justify-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
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
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    rows={5}
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
        </div>
      </section>
    </div>
  );
}
