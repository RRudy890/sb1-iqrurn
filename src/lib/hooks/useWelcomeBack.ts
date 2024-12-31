import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getUserApplication } from '../services/profile';

export const useWelcomeBack = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkApplication = async () => {
      if (!user?.email) {
        if (mounted) {
          setLoading(false);
          setShowWelcome(false);
        }
        return;
      }

      try {
        const application = await getUserApplication(user.email);
        if (mounted) {
          setShowWelcome(!!application);
        }
      } catch (error) {
        console.error('Error checking application:', error);
        if (mounted) {
          setShowWelcome(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkApplication();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { showWelcome, loading };
};