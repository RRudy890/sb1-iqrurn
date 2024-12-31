import React from 'react';
import { FormInput } from './FormInput';

interface AddressProps {
  formData: {
    street: string;
    suburb: string;
    city: string;
    state: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection: React.FC<AddressProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary mb-4">
        Address
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Street Address"
          id="street"
          name="street"
          value={formData.street}
          onChange={onChange}
          required
        />
        <FormInput
          label="Suburb"
          id="suburb"
          name="suburb"
          value={formData.suburb}
          onChange={onChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="City"
          id="city"
          name="city"
          value={formData.city}
          onChange={onChange}
          required
        />
        <FormInput
          label="Province"
          id="state"
          name="state"
          value={formData.state}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};