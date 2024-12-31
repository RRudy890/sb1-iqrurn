import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ApplicationStatusProps {
  status: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'accepted':
      return <CheckCircle className="text-green-500" />;
    case 'pending':
      return <Clock className="text-gold-primary" />;
    case 'rejected':
      return <AlertCircle className="text-red-500" />;
    default:
      return <Clock className="text-gold-primary" />;
  }
};

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Application Accepted';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Application Unsuccessful';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <StatusIcon status={status} />
      <span className="text-lg font-semibold">{getStatusText()}</span>
    </div>
  );
};