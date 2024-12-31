import React from 'react';
import { X } from 'lucide-react';
import CustomShield from '../CustomShield';
import { useAuth } from '../../lib/hooks/useAuth';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-0">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center mb-12">
          <CustomShield size={96} className="mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary text-center">
            Security Recruiter
          </h1>
        </div>

        <div className="content-card p-8 md:p-12 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gold-primary hover:text-gold-secondary transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary text-center">
            {firstName ? `Welcome Back, ${firstName}!` : 'Welcome Back!'}
          </h2>
          
          <p className="text-lg md:text-xl text-light-gray mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Thank you for logging in. Your application package, including your completed form, CV, and video introduction, has been successfully submitted and is currently under review by our security companies.
          </p>

          <div className="flex justify-center">
            <button 
              onClick={onClose} 
              className="btn-gold text-lg px-12 py-4 transform hover:scale-105 transition-all duration-300"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;