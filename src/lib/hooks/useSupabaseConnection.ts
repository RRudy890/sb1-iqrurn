import { useState, useEffect, useCallback } from 'react';
import { validateSupabaseConnection } from '../utils/supabase-validation';

export const useSupabaseConnection = () => {
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = useCallback(async () => {
    try {
      setIsChecking(true);
      const isValid = await validateSupabaseConnection();
      
      setIsConnected(isValid);
      setConnectionError(
        isValid ? null : 'Unable to connect to the database. Please click the "Connect to Supabase" button in the top right corner to set up your connection.'
      );
    } catch (error) {
      setIsConnected(false);
      setConnectionError('Connection error. Please ensure you have a stable internet connection and try again.');
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (mounted) {
        await checkConnection();
      }
    };

    initialize();

    // Recheck connection on window focus
    const handleFocus = () => {
      if (mounted) {
        checkConnection();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      mounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkConnection]);

  return {
    connectionError,
    isConnected,
    isChecking,
    recheckConnection: checkConnection
  };
};