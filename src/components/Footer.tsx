import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-gold-primary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center space-x-6">
          <Link 
            to="/privacy" 
            className="text-gold-primary hover:text-gold-secondary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-gold-primary hover:text-gold-secondary transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;