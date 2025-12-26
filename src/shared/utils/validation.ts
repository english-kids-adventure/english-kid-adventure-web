import { toast } from 'react-toastify';
import type { RegisterFormState } from '@/features/auth/types';

export const validateRegisterForm = (form: RegisterFormState): boolean => {
  if (!form.name.trim()) {
    toast.error('Name is required');
    return false;
  }

  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
    toast.error('Email is required');
    return false;
  }

  if (!form.password.trim()) {
    toast.error('Password is required');
    return false;
  }

  if (form.password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  if (form.password !== form.confirmPassword) {
    toast.error('Passwords do not match!');
    return false;
  }

  return true;
};
