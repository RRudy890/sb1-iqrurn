import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/hooks/useAuth';
import { useWelcomeBack } from '../lib/hooks/useWelcomeBack';
import WelcomeBackPage from '../components/welcome/WelcomeBackPage';
import LoadingScreen from '../components/LoadingScreen';
import ApplicationDetails from '../components/profile/ApplicationDetails';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { showWelcome, loading } = useWelcomeBack();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (showWelcome) {
    return <WelcomeBackPage />;
  }

  return <ApplicationDetails />;
};

export default Profile;