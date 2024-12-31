import React from 'react';
import { ProfileSection } from '../ProfileSection';
import type { ApplicationData } from '../../../lib/types/application';

interface DocumentsSectionProps {
  data: ApplicationData;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ data }) => (
  <ProfileSection title="Documents">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.cv_url && (
        <div>
          <label className="text-gold-primary/60">CV</label>
          <a
            href={data.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-primary hover:text-gold-secondary block"
          >
            View CV
          </a>
        </div>
      )}
      {data.video_url && (
        <div>
          <label className="text-gold-primary/60">Introduction Video</label>
          <a
            href={data.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-primary hover:text-gold-secondary block"
          >
            View Video
          </a>
        </div>
      )}
    </div>
  </ProfileSection>
);