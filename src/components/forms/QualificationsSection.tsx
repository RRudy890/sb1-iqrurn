import React from 'react';
import { FormSelect } from './FormSelect';
import { FormInput } from './FormInput';

interface QualificationsProps {
  formData: {
    psiraGrade: string;
    psiraExpiry: string;
    driversLicense: string;
    businessCompetency: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const QualificationsSection: React.FC<QualificationsProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary mb-4">
        Qualifications
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="PSIRA Grade"
          id="psiraGrade"
          name="psiraGrade"
          value={formData.psiraGrade}
          onChange={onChange}
          required
          options={[
            { value: "", label: "Select Grade" },
            { value: "A", label: "Grade A" },
            { value: "B", label: "Grade B" },
            { value: "C", label: "Grade C" },
            { value: "D", label: "Grade D" },
            { value: "E", label: "Grade E" }
          ]}
        />
        <FormInput
          label="PSIRA Expiry Date"
          type="date"
          id="psiraExpiry"
          name="psiraExpiry"
          value={formData.psiraExpiry}
          onChange={onChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Driver's License"
          id="driversLicense"
          name="driversLicense"
          value={formData.driversLicense}
          onChange={onChange}
          required
          options={[
            { value: "", label: "Select License Type" },
            { value: "A", label: "Code A" },
            { value: "A1", label: "Code A1" },
            { value: "B", label: "Code B" },
            { value: "C", label: "Code C" },
            { value: "C1", label: "Code C1" },
            { value: "EC", label: "Code EC" },
            { value: "None", label: "No License" }
          ]}
        />
        <FormSelect
          label="Business Competency"
          id="businessCompetency"
          name="businessCompetency"
          value={formData.businessCompetency}
          onChange={onChange}
          required
          options={[
            { value: "", label: "Select Level" },
            { value: "Basic", label: "Basic" },
            { value: "Intermediate", label: "Intermediate" },
            { value: "Advanced", label: "Advanced" }
          ]}
        />
      </div>
    </div>
  );
};