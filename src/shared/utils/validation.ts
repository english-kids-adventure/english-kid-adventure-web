import { toast } from 'react-toastify';
import type {
  LoginFormState,
  RegisterFormState,
} from '@/features/auth/types';

type AuthForm = LoginFormState | RegisterFormState;

const isRegisterForm = (
  form: AuthForm,
): form is RegisterFormState => {
  return 'name' in form && 'confirmPassword' in form;
};

export const validateAuthForm = (form: AuthForm): boolean => {

  if (!form.email.trim()) {
    toast.error('Email is required');
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    toast.error('Invalid email format');
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

  if (isRegisterForm(form)) {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }
  }

  return true;
};
