import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth';

interface WelcomeModalContextType {
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  handleModalClose: () => void;
}

const WelcomeModalContext = createContext<WelcomeModalContextType | undefined>(undefined);

export const WelcomeModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = useCallback(async () => {
    try {
      setShowWelcomeModal(false);
      sessionStorage.setItem('welcomeModalClosed', 'true');
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during modal close and logout:', error);
      // Fallback: force navigation even if logout fails
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <WelcomeModalContext.Provider value={{ showWelcomeModal, setShowWelcomeModal, handleModalClose }}>
      {children}
    </WelcomeModalContext.Provider>
  );
};

export const useWelcomeModal = () => {
  const context = useContext(WelcomeModalContext);
  if (context === undefined) {
    throw new Error('useWelcomeModal must be used within a WelcomeModalProvider');
  }
  return context;
};