import React from 'react';
import { Upload } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface DocumentsProps {
  files: {
    cv: File | null;
    video: File | null;
  };
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentsSection: React.FC<DocumentsProps> = ({ files, onFileChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary mb-4">
        Documents
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload
          label="CV / Resume"
          id="cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={onFileChange}
          file={files.cv}
          helperText="PDF, DOC, or DOCX (Max 5MB)"
          required
        />
        <FileUpload
          label="Introduction Video"
          id="video"
          name="video"
          accept="video/*"
          onChange={onFileChange}
          file={files.video}
          helperText="MP4 or MOV (Max 50MB)"
          required
        />
      </div>
    </div>
  );
};