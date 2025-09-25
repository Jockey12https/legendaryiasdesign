import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Legendary IAS Mentor',
  description: 'Privacy Policy for Legendary IAS Mentor - Best IAS Academy in Kerala. Learn how we protect and handle your personal information.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              enroll in courses, or contact us for support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, and communicate with you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Legendary IAS Mentor</strong><br />
              Email: info@legendaryiasmentor.com<br />
              Phone: +91-XXXXXXXXXX
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
