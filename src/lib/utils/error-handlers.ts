import { AUTH_ERRORS, ERROR_MESSAGES } from '../constants/auth';

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const handleAuthError = (error: unknown): AuthError => {
  console.error('Auth error:', error);
  
  if (error && typeof error === 'object') {
    if ('code' in error) {
      const code = error.code as string;
      switch (code) {
        case AUTH_ERRORS.INVALID_CREDENTIALS:
          return new AuthError(ERROR_MESSAGES.INVALID_CREDENTIALS, code);
        case AUTH_ERRORS.USER_NOT_FOUND:
          return new AuthError(ERROR_MESSAGES.USER_NOT_FOUND, code);
        case AUTH_ERRORS.EMAIL_TAKEN:
          return new AuthError(ERROR_MESSAGES.EMAIL_TAKEN, code);
      }
    }
    
    if ('message' in error && typeof error.message === 'string') {
      return new AuthError(error.message);
    }
  }
  
  return new AuthError(ERROR_MESSAGES.UNEXPECTED);
};