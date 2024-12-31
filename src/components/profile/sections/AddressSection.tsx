import React from 'react';
import { ProfileSection } from '../ProfileSection';
import type { ApplicationData } from '../../../lib/types/application';

interface AddressSectionProps {
  data: ApplicationData;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ data }) => (
  <ProfileSection title="Address">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-gold-primary/60">Street</label>
        <p className="text-light-gray">{data.street}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Suburb</label>
        <p className="text-light-gray">{data.suburb}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">City</label>
        <p className="text-light-gray">{data.city}</p>
      </div>
      <div>
        <label className="text-gold-primary/60">Province</label>
        <p className="text-light-gray">{data.state}</p>
      </div>
    </div>
  </ProfileSection>
);