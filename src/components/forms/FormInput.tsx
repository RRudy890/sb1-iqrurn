import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-light-gray mb-1">{label}</label>
      <input
        id={id}
        {...props}
        className="w-full bg-charcoal/50 border border-gold-primary/20 rounded-lg px-4 py-2 text-light-gray focus:border-gold-primary focus:outline-none"
      />
    </div>
  );
};