import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import WelcomeModal from '../auth/WelcomeModal';
import { useWelcomeModal } from '../../lib/contexts/WelcomeModalContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { showWelcomeModal, handleModalClose } = useWelcomeModal();

  useEffect(() => {
    const hasModalBeenClosed = sessionStorage.getItem('welcomeModalClosed') === 'true';
    if (hasModalBeenClosed && showWelcomeModal) {
      handleModalClose();
    }
  }, [showWelcomeModal, handleModalClose]);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
        {showWelcomeModal && <WelcomeModal onClose={handleModalClose} />}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;