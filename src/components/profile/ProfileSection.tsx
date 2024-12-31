import React from 'react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary mb-4">
        {title}
      </h2>
      <div className="bg-black/50 rounded-lg p-6 border border-gold-primary/20">
        {children}
      </div>
    </div>
  );
};