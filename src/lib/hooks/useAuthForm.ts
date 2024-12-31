import { useState, useCallback } from 'react';
import { validateEmail, validateName, validatePassword } from '../utils/validation';
import { ERROR_MESSAGES } from '../constants/auth';

interface AuthFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useAuthForm = (isSignUp: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState<string | null>(null);

  const validateForm = useCallback((): boolean => {
    try {
      if (!formData.email || !formData.password) {
        throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
      }

      if (isSignUp && (!formData.firstName || !formData.lastName)) {
        throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
      }

      if (!validateEmail(formData.email)) {
        throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
      }

      if (!validatePassword(formData.password)) {
        throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
      }

      if (isSignUp) {
        if (!validateName(formData.firstName) || !validateName(formData.lastName)) {
          throw new Error(ERROR_MESSAGES.INVALID_NAME);
        }
      }

      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.UNEXPECTED);
      return false;
    }
  }, [formData, isSignUp]);

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
    setError(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
    setError(null);
  }, []);

  return {
    formData,
    error,
    setError,
    validateForm,
    resetForm,
    handleInputChange,
  };
};