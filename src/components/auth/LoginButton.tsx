import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../lib/hooks/useAuth';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Don't render if user is already logged in
  if (user) return null;

  return (
    <button
      onClick={() => navigate('/login')}
      className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gold-primary hover:bg-gold-secondary 
                 text-charcoal font-semibold transition-all duration-200 transform hover:scale-105"
      aria-label="Log in to your account"
    >
      <LogIn size={20} />
      <span>Log In</span>
    </button>
  );
};

export default LoginButton;