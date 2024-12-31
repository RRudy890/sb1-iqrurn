import { supabase } from '../supabase';
import type { ApplicationData } from '../types/application';
import { validateSupabaseConnection } from '../utils/supabase-validation';

export const getUserApplication = async (email: string): Promise<ApplicationData | null> => {
  try {
    if (!email) {
      console.warn('No email provided to getUserApplication');
      return null;
    }

    const isConnected = await validateSupabaseConnection();
    if (!isConnected) {
      throw new Error('Database connection not available');
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      // Don't throw for "no rows returned" error
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserApplication:', error);
    throw error;
  }
};