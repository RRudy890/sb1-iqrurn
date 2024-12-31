import React from 'react';
import { FormInput } from './FormInput';

interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary mb-4">
        Personal Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
        />
        <FormInput
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Email Address"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <FormInput
          label="Phone Number"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};