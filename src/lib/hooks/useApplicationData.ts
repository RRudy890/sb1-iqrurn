import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getUserApplication } from '../services/profile';
import type { ApplicationData } from '../types/application';

export const useApplicationData = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchApplication = async () => {
      if (!user?.email) {
        if (mounted) {
          setLoading(false);
        }
        return;
      }

      try {
        const data = await getUserApplication(user.email);
        if (mounted) {
          setApplication(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching application:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load application'));
          setApplication(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchApplication();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { application, loading, error };
};