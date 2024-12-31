import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { validateSupabaseConnection } from '../utils/supabase-validation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const initAuth = useCallback(async () => {
    try {
      // Validate Supabase connection first
      const isValid = await validateSupabaseConnection();
      if (!isValid) {
        throw new Error('Unable to connect to database. Please check your connection.');
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      setUser(session?.user ?? null);
      setError(null);
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError(err instanceof Error ? err : new Error('Authentication error'));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Re-initialize auth on window focus
    const handleFocus = () => {
      initAuth();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('focus', handleFocus);
    };
  }, [initAuth]);

  return { 
    user, 
    loading, 
    error,
    refreshAuth: initAuth 
  };
};