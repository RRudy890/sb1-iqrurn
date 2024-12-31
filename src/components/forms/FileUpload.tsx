import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  helperText?: string;
  file: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, helperText, file, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-light-gray mb-1">{label}</label>
      <div className="relative">
        <input
          type="file"
          id={id}
          {...props}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-full bg-charcoal/50 border border-gold-primary/20 rounded-lg px-4 py-2 text-light-gray flex items-center">
          <Upload className="mr-2 text-gold-primary" size={20} />
          <span>{file ? file.name : `Upload ${label}`}</span>
        </div>
      </div>
      {helperText && (
        <p className="text-sm text-gold-primary/60 mt-1">{helperText}</p>
      )}
    </div>
  );
};