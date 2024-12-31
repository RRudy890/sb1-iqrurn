import { supabase } from '../supabase';

export const validateSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Check environment variables
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Missing Supabase environment variables');
      return false;
    }

    // Test connection with a lightweight request
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    // Additional validation for project access
    const { error: projectError } = await supabase
      .from('applications')
      .select('count')
      .limit(1)
      .single();
    
    // PGRST116 error is expected when no rows exist
    if (projectError && projectError.code !== 'PGRST116') {
      console.error('Project access error:', projectError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to validate Supabase connection:', error);
    return false;
  }
};