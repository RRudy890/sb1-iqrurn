import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AddressSection } from './AddressSection';
import { QualificationsSection } from './QualificationsSection';
import { DocumentsSection } from './DocumentsSection';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  city: string;
  state: string;
  psiraGrade: string;
  psiraExpiry: string;
  driversLicense: string;
  businessCompetency: string;
  position: string;
}

interface Files {
  cv: File | null;
  video: File | null;
}

interface MultiStepFormProps {
  formData: FormData;
  files: Files;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const steps = [
  { title: 'Personal Information', component: PersonalInfoSection },
  { title: 'Address', component: AddressSection },
  { title: 'Qualifications', component: QualificationsSection },
  { title: 'Documents', component: DocumentsSection },
];

const validateStep = (step: number, formData: FormData, files: Files): boolean => {
  switch (step) {
    case 0: // Personal Information
      return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
    case 1: // Address
      return !!(formData.street && formData.suburb && formData.city && formData.state);
    case 2: // Qualifications
      return !!(formData.psiraGrade && formData.psiraExpiry && formData.driversLicense && formData.businessCompetency);
    case 3: // Documents
      return !!(files.cv && files.video);
    default:
      return false;
  }
};

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  formData,
  files,
  onChange,
  onFileChange,
  onSubmit,
  loading
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (validateStep(currentStep, formData, files)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${
                index <= currentStep ? 'text-gold-primary' : 'text-gold-primary/30'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="h-2 bg-charcoal/50 rounded-full">
          <div
            className="h-full bg-gold-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <CurrentStepComponent
        formData={formData}
        onChange={onChange}
        onFileChange={onFileChange}
        files={files}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          className={`flex items-center px-4 py-2 text-gold-primary hover:text-gold-secondary transition-colors ${
            currentStep === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft className="mr-2" />
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!validateStep(currentStep, formData, files)}
            className={`btn-gold ${
              !validateStep(currentStep, formData, files)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <span className="flex items-center">
              Next
              <ChevronRight className="ml-2" />
            </span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading || !validateStep(currentStep, formData, files)}
            className={`btn-gold ${
              loading || !validateStep(currentStep, formData, files)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </form>
  );
};