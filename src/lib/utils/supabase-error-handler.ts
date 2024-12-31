import { AuthError } from '@supabase/supabase-js';
import { AuthErrorType, AuthErrorResponse } from '../types/auth';
import { ERROR_MESSAGES, AUTH_ERRORS } from '../constants/auth';

const parseError = (error: unknown): AuthErrorResponse => {
  if (error instanceof AuthError) {
    return {
      code: error.status === 400 ? AUTH_ERRORS.INVALID_CREDENTIALS : error.name,
      message: error.message,
      status: error.status
    };
  }

  if (error instanceof Error) {
    return {
      code: 'unknown_error',
      message: error.message
    };
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    if ('message' in err && typeof err.message === 'string') {
      return {
        code: 'error',
        message: err.message
      };
    }
  }

  return {
    code: 'unknown_error',
    message: ERROR_MESSAGES.UNEXPECTED
  };
};

export const handleSupabaseError = (error: unknown): Error => {
  const parsedError = parseError(error);

  switch (parsedError.code) {
    case AUTH_ERRORS.INVALID_CREDENTIALS:
      return new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    case 'email_not_confirmed':
      return new Error(ERROR_MESSAGES.EMAIL_NOT_CONFIRMED);
    case 'user_not_found':
      return new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    case 'invalid_email':
      return new Error(ERROR_MESSAGES.INVALID_EMAIL);
    default:
      return new Error(parsedError.message || ERROR_MESSAGES.UNEXPECTED);
  }
};