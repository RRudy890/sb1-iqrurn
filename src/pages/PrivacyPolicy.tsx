import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-gold-primary hover:text-gold-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <div className="content-card p-8">
          <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-light-gray">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-2">For Job Seekers</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Full name and contact details</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Facebook profile name</li>
                <li>Residential address and location data</li>
                <li>Curriculum Vitae (CV)</li>
                <li>Video presentation</li>
                <li>Selected job categories</li>
                <li>Profile information</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">For Security Companies</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Company name and details</li>
                <li>Business address</li>
                <li>Contact information</li>
                <li>Search preferences and history</li>
                <li>Payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">How We Use Your Information</h2>
              
              <h3 className="text-lg font-semibold mb-2">Job Seekers' Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To create and maintain your profile</li>
                <li>To facilitate job matching within specified geographical areas</li>
                <li>To present your candidacy to potential employers</li>
                <li>To process location-based searches within 30km radius</li>
                <li>To manage video presentation access</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Security Companies' Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate candidate searches</li>
                <li>To process payments for accessing candidate information</li>
                <li>To maintain company accounts</li>
                <li>To enable location-based candidate matching</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Data Storage and Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure storage of CV documents</li>
                <li>Protected access to video presentations</li>
                <li>Encrypted payment processing</li>
                <li>Secure database management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Delete your profile</li>
                <li>Withdraw consent</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Contact Us</h2>
              <p>
                For any privacy-related queries or to exercise your rights under this policy, 
                please contact our Data Protection Officer at privacy@securityrecruiter.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Updates to Privacy Policy</h2>
              <p>
                We reserve the right to update this privacy policy. Any changes will be posted on this page 
                with an updated revision date.
              </p>
              <p className="mt-4 text-gold-primary">Last updated: December 23, 2024</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;