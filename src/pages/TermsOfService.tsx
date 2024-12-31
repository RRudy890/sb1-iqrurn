import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            Terms of Service
          </h1>

          <div className="space-y-6 text-light-gray">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Service Description</h2>
              <p className="mb-4">
                Our platform provides an online employment marketplace connecting security industry job seekers 
                with employers in South Africa. By using our service, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">User Accounts</h2>
              
              <h3 className="text-lg font-semibold mb-2">Job Seekers agree to:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate personal and professional information</li>
                <li>Upload only authentic CVs and credentials</li>
                <li>Create video presentations under 65MB via Google link</li>
                <li>Select no more than two job categories</li>
                <li>Maintain profile accuracy and updates</li>
                <li>Not share account credentials with others</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Security Companies agree to:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide legitimate business information</li>
                <li>Use candidate information solely for recruitment purposes</li>
                <li>Pay required fees to access candidate contact details</li>
                <li>Respect the 30km radius search limitation</li>
                <li>Maintain confidentiality of candidate information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Content Guidelines</h2>
              <p className="mb-4">Video Presentations must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be professional and employment-focused</li>
                <li>Not exceed 65MB in size</li>
                <li>Be hosted via Google link</li>
                <li>Contain appropriate content for employment purposes</li>
                <li>Not infringe on third-party rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Prohibited Activities</h2>
              <p className="mb-4">Users must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit false or misleading information</li>
                <li>Share access credentials</li>
                <li>Attempt to circumvent the payment system</li>
                <li>Harass or discriminate against other users</li>
                <li>Use the platform for non-recruitment purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users retain rights to their content</li>
                <li>Users grant us license to display their content</li>
                <li>Our platform's features and functionality remain our property</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Limitation of Liability</h2>
              <p className="mb-4">We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Employment outcomes</li>
                <li>Accuracy of user-submitted information</li>
                <li>Third-party content or links</li>
                <li>Technical issues with video hosting</li>
                <li>Disputes between users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gold-primary">Contact</h2>
              <p>
                Questions about these terms should be directed to legal@securityrecruiter.com
              </p>
            </section>

            <section>
              <p className="mt-4 text-gold-primary">Last updated: December 23, 2024</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;