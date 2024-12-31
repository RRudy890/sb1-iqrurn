import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../lib/services/auth';
import CustomShield from '../CustomShield';

const WelcomeBackPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if signOut fails, still redirect to home
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 p-4 md:p-0">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center mb-12">
          <CustomShield size={96} className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary text-center">
            Security Recruiter
          </h1>
        </div>

        <div className="content-card p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary text-center">
            Welcome Back!
          </h2>
          
          <p className="text-lg md:text-xl text-light-gray mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Welcome back! Your application has been successfully submitted and is currently under review. 
            Security companies will evaluate your CV and video presentation.
          </p>

          <div className="flex justify-center">
            <button 
              onClick={handleClose} 
              className="btn-gold text-lg px-12 py-4 transform hover:scale-105 transition-all duration-300"
            >
              Continue to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBackPage;