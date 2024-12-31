import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import CustomShield from './CustomShield';
import { useAuth } from '../lib/hooks/useAuth';
import { signOut } from '../lib/services/auth';
import LoginButton from './auth/LoginButton';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a 
              href="/"
              onClick={handleHomeClick}
              className="flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <CustomShield size={38} className="filter drop-shadow-gold" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
                Security Recruiter
              </span>
            </a>
            <div className="flex items-center space-x-6">
              <a
                href="/"
                onClick={handleHomeClick}
                className={`nav-link ${
                  location.pathname === '/' && 'after:scale-x-100'
                }`}
              >
                Home
              </a>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gold-primary hover:text-gold-secondary transition-colors"
                >
                  <span>{user.email}</span>
                  <LogOut size={20} />
                </button>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;