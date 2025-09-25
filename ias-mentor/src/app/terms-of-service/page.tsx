import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Legendary IAS Mentor',
  description: 'Terms of Service for Legendary IAS Mentor - Best IAS Academy in Kerala. Read our terms and conditions for using our services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Legendary IAS Mentor services, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials on Legendary IAS Mentor 
              for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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
