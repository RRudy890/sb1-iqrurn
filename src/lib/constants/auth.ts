export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  USER_NOT_FOUND: 'user_not_found',
  EMAIL_TAKEN: 'email_taken',
  INVALID_EMAIL: 'invalid_email',
  EMAIL_NOT_CONFIRMED: 'email_not_confirmed'
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'No account found with this email',
  EMAIL_TAKEN: 'An account with this email already exists',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters long',
  INVALID_NAME: 'Name can only contain letters, spaces, and hyphens',
  REQUIRED_FIELDS: 'Please fill in all required fields',
  UNEXPECTED: 'An unexpected error occurred. Please try again.',
  EMAIL_NOT_CONFIRMED: 'Please verify your email address'
} as const;