import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationData } from '../../lib/hooks/useApplicationData';
import CustomShield from '../CustomShield';
import LoadingScreen from '../LoadingScreen';
import { ApplicationStatus } from './ApplicationStatus';
import { PersonalSection } from './sections/PersonalSection';
import { AddressSection } from './sections/AddressSection';
import { QualificationsSection } from './sections/QualificationsSection';
import { DocumentsSection } from './sections/DocumentsSection';

const ApplicationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { application, loading, error } = useApplicationData();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !application) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="content-card max-w-lg w-full p-8 text-center">
          <CustomShield size={64} className="mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-gold-primary">
            {error ? 'Error Loading Application' : 'No Application Found'}
          </h2>
          <p className="text-light-gray mb-6">
            {error ? error.message : "You haven't submitted an application yet."}
          </p>
          <button onClick={() => navigate('/')} className="btn-gold">
            {error ? 'Try Again' : 'Apply Now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="content-card p-8">
          <div className="flex items-center justify-center mb-8">
            <CustomShield size={48} className="mr-4" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
              Application Profile
            </h1>
          </div>

          <ApplicationStatus status={application.status || 'pending'} />
          
          <div className="space-y-8">
            <PersonalSection data={application} />
            <AddressSection data={application} />
            <QualificationsSection data={application} />
            <DocumentsSection data={application} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;