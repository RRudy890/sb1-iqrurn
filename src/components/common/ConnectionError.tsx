import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConnectionErrorProps {
  message: string;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ message }) => (
  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-500">
    <AlertCircle className="shrink-0 mr-2" size={20} />
    <div>
      <p className="text-sm font-medium">{message}</p>
      <p className="text-xs mt-1">
        Make sure you have connected to Supabase and provided valid credentials.
      </p>
    </div>
  </div>
);

export default ConnectionError;