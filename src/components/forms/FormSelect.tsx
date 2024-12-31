import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label: string;
  options: Option[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, id, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-light-gray mb-1">{label}</label>
      <select
        id={id}
        {...props}
        className="w-full bg-charcoal/50 border border-gold-primary/20 rounded-lg px-4 py-2 text-light-gray focus:border-gold-primary focus:outline-none"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};