import type { RegisterFormState } from '@/features/auth/types';

export const validateRules = {
  required: (val: string, fieldName: string) =>
    !val.trim() ? `${fieldName} is required` : null,
  email: (val: string) => {
    if (!val.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    return !emailRegex.test(val) ? 'Invalid email format' : null;
  },
  password: (val: string) =>
    val.length < 6 ? 'Password must be at least 6 characters' : null,
  confirm: (pass: string, confirm: string) =>
    pass !== confirm ? 'Passwords do not match!' : null,
};

export const validateLoginForm = (form: { email: string; password: string }) => {
  const errors = [
    validateRules.required(form.email, 'Email'),
    validateRules.email(form.email),
    validateRules.password(form.password),
  ].filter((error): error is string => error !== null);
  return {
    isValid: errors.length === 0,
    message: errors[0] || '',
  };
};

export const validateRegisterForm = (form: RegisterFormState) => {
  const errors = [
    validateRules.required(form.name, 'Name'),
    validateRules.required(form.email, 'Email'),
    validateRules.email(form.email),
    validateRules.required(form.password, 'Password'),
    validateRules.password(form.password),
    validateRules.required(form.confirmPassword, 'Confirm Password'),
    validateRules.confirm(form.password, form.confirmPassword),
  ].filter((error): error is string => error !== null);
  return {
    isValid: errors.length === 0,
    message: errors[0] || '',
  };
};
