import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../lib/services/auth';
import { useAuthForm } from '../../lib/hooks/useAuthForm';
import { getUserApplication } from '../../lib/services/profile';
import { useWelcomeModal } from '../../lib/contexts/WelcomeModalContext';
import { useSupabaseConnection } from '../../lib/hooks/useSupabaseConnection';
import CustomShield from '../CustomShield';
import ConnectionError from '../common/ConnectionError';
import { AlertCircle, Loader2 } from 'lucide-react';
import { FormInput } from '../forms/FormInput';
import { useAuth } from '../../lib/hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setShowWelcomeModal } = useWelcomeModal();
  const { connectionError, isConnected, isChecking } = useSupabaseConnection();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    formData,
    error,
    setError,
    validateForm,
    resetForm,
    handleInputChange,
  } = useAuthForm(isSignUp);

  useEffect(() => {
    const checkApplication = async () => {
      if (user?.email) {
        try {
          const application = await getUserApplication(user.email);
          if (application) {
            setShowWelcomeModal(true);
            navigate('/profile');
          }
        } catch (err) {
          console.error('Error checking application:', err);
        }
      }
    };

    checkApplication();
  }, [user, navigate, setShowWelcomeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !isConnected) return;
    
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await signUp(formData);
        await signIn(formData.email, formData.password);
        navigate('/');
      } else {
        await signIn(formData.email, formData.password);
        const application = await getUserApplication(formData.email);
        if (application) {
          setShowWelcomeModal(true);
          navigate('/profile');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
    setError(null);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="content-card max-w-md w-full p-8">
        <div className="text-center mb-8">
          <CustomShield size={64} className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-light-gray/80">
            {isSignUp ? 'Sign up to apply for security positions' : 'Sign in to view your application'}
          </p>
        </div>

        {connectionError && <ConnectionError message={connectionError} />}

        {error && !connectionError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-500">
            <AlertCircle className="shrink-0 mr-2" size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <FormInput
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
                minLength={2}
                disabled={!isConnected}
              />
              <FormInput
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
                minLength={2}
                disabled={!isConnected}
              />
            </>
          )}
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
            disabled={!isConnected}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            minLength={6}
            disabled={!isConnected}
          />

          <button
            type="submit"
            disabled={loading || !isConnected}
            className="w-full gold-gradient text-charcoal font-semibold py-3 px-4 rounded-lg 
                     flex items-center justify-center space-x-2 transition-all duration-200 
                     box-3d hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                <span>{isSignUp ? 'Creating Account...' : 'Signing in...'}</span>
              </>
            ) : (
              <span className="font-bold tracking-wide">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-gold-primary hover:text-gold-secondary transition-colors"
            disabled={!isConnected}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;