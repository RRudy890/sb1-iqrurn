import React from 'react';
import { ProfileSection } from '../ProfileSection';
import type { ApplicationData } from '../../../lib/types/application';

interface PersonalSectionProps {
  data: ApplicationData;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ data }) => (
  <ProfileSection title="Personal Information">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-gold-primary/60">Full Name</label>
        <p className="text-light-gray">{`${data.firstName} ${data.lastName}`}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Email</label>
        <p className="text-light-gray">{data.email}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Phone</label>
        <p className="text-light-gray">{data.phone}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Position</label>
        <p className="text-light-gray">{data.position}</p>
      </div>
    </div>
  </ProfileSection>
);