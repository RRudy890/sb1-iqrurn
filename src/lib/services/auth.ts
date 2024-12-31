import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { handleSupabaseError } from '../utils/supabase-error-handler';

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signUp = async ({ email, password, firstName, lastName }: SignUpData): Promise<void> => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`
        }
      }
    });

    if (error) throw error;
  } catch (error) {
    throw handleSupabaseError(error);
  }
};

export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
  } catch (error) {
    throw handleSupabaseError(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    // Clear any session storage
    sessionStorage.clear();
    // Clear any local storage related to auth
    localStorage.removeItem('supabase.auth.token');
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Additional cleanup
    await supabase.auth.clearSession();
  } catch (error) {
    console.error('Error during sign out:', error);
    throw handleSupabaseError(error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    throw handleSupabaseError(error);
  }
};