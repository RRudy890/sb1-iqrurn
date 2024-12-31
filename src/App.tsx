import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/hooks/useAuth';
import { WelcomeModalProvider } from './lib/contexts/WelcomeModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ApplicationForm from './pages/ApplicationForm';
import LoginPage from './components/auth/LoginPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { AuthGuard } from './components/auth/AuthGuard';
import LoadingScreen from './components/LoadingScreen';
import AppLayout from './components/layout/AppLayout';

const App: React.FC = () => {
  const { loading, error } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h1>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <WelcomeModalProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/auth/callback" element={<Navigate to="/" />} />
            <Route 
              path="/profile" 
              element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              } 
            />
            <Route 
              path="/apply/:service" 
              element={
                <AuthGuard>
                  <ApplicationForm />
                </AuthGuard>
              } 
            />
          </Routes>
        </AppLayout>
      </WelcomeModalProvider>
    </BrowserRouter>
  );
};

export default App;