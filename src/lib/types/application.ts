export interface ApplicationData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  city: string;
  state: string;
  psiraGrade: string;
  psiraExpiry: string;
  driversLicense: string;
  businessCompetency: string;
  position: string;
  created_at?: string;
  status?: 'pending' | 'reviewing' | 'accepted' | 'rejected';
}