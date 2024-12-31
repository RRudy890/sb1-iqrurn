import React from 'react';
import { ProfileSection } from '../ProfileSection';
import type { ApplicationData } from '../../../lib/types/application';

interface QualificationsSectionProps {
  data: ApplicationData;
}

export const QualificationsSection: React.FC<QualificationsSectionProps> = ({ data }) => (
  <ProfileSection title="Qualifications">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-gold-primary/60">PSIRA Grade</label>
        <p className="text-light-gray">{data.psiraGrade}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">PSIRA Expiry</label>
        <p className="text-light-gray">
          {new Date(data.psiraExpiry).toLocaleDateString()}
        </p>
      </div>
      <div>
        <label className="text-gold-primary/60">Driver's License</label>
        <p className="text-light-gray">{data.driversLicense}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Business Competency</label>
        <p className="text-light-gray">{data.businessCompetency}</p>
      </div>
    </div>
  </ProfileSection>
);