import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import CustomShield from '../components/CustomShield';
import { submitApplication } from '../lib/services/applications';
import type { ApplicationData } from '../lib/types/application';
import { MultiStepForm } from '../components/forms/MultiStepForm';

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { service } = useParams<{ service: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    suburb: '',
    city: '',
    state: '',
    psiraGrade: '',
    psiraExpiry: '',
    driversLicense: '',
    businessCompetency: '',
    position: service || ''
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    video: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitApplication(formData, files.video, files.cv);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="content-card max-w-lg w-full p-8 text-center">
          <CustomShield size={64} className="mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-gold-primary">Application Submitted Successfully!</h2>
          <p className="text-light-gray mb-6">
            Thank you for your application. We will review your information and contact you soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-gold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gold-primary hover:text-gold-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Positions
        </button>

        <div className="content-card p-8">
          <div className="flex items-center justify-center mb-8">
            <CustomShield size={48} className="mr-4" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
              Security Position Application
            </h1>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center text-red-500">
              <AlertCircle className="mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <MultiStepForm
            formData={formData}
            files={files}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;