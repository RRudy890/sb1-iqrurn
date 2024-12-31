import type { AuthError as SupabaseAuthError } from '@supabase/supabase-js';

export interface AuthErrorResponse {
  code: string;
  message: string;
  status?: number;
}

export interface SupabaseErrorResponse {
  error: AuthErrorResponse;
  status: number;
}

export type AuthErrorType = SupabaseAuthError | Error | AuthErrorResponse;