import { useState, useEffect } from 'react';
import { checkNetworkConnection, checkDatabaseConnection, validateStorageAccess } from '../utils/connection';

export const useConnectionStatus = () => {
  const [status, setStatus] = useState({
    network: true,
    database: true,
    storage: true
  });

  useEffect(() => {
    const checkConnections = async () => {
      const network = checkNetworkConnection();
      const database = await checkDatabaseConnection();
      const storage = await validateStorageAccess();

      setStatus({ network, database, storage });
    };

    checkConnections();

    const handleOnline = () => setStatus(prev => ({ ...prev, network: true }));
    const handleOffline = () => setStatus(prev => ({ ...prev, network: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};