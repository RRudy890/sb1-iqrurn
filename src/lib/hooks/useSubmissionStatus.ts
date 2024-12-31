import { useState, useEffect } from 'react';
import { getSubmissionStatus, SubmissionStatus } from '../services/submission';
import { useAuth } from './useAuth';

export const useSubmissionStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) {
        setStatus(null);
        setLoading(false);
        return;
      }

      try {
        const submissionStatus = await getSubmissionStatus(user.id);
        setStatus(submissionStatus);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch submission status'));
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user]);

  return { status, loading, error };
};