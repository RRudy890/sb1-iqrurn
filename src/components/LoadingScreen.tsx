import React from 'react';
import { Loader2 } from 'lucide-react';
import CustomShield from './CustomShield';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <CustomShield size={64} className="mb-8 animate-pulse" />
      <div className="flex items-center space-x-3">
        <Loader2 className="animate-spin text-gold-primary" size={24} />
        <span className="text-gold-primary text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;