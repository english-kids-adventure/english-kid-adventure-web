import { FIELD_NAMES, MESSAGES, UI_LABELS } from '@shared/constants';
import type { RegisterFormState } from '@features/auth/types';

export const validateRules = {
  required: (val: string, fieldName: string) =>
    !val.trim() ? MESSAGES.VALIDATION.REQUIRED(fieldName) : null,
  email: (val: string) => {
    if (!val.trim()) {
      return MESSAGES.VALIDATION.EMAIL_REQUIRED;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    return !emailRegex.test(val) ? MESSAGES.VALIDATION.INVALID_EMAIL : null;
  },
  password: (val: string) =>
    val.length < 6 ? MESSAGES.VALIDATION.PASSWORD_MIN : null,
  confirm: (pass: string, confirm: string) =>
    pass !== confirm ? MESSAGES.VALIDATION.PASSWORDS_NOT_MATCH : null,
};

export const validateLoginForm = (form: { email: string; password: string }) => {
  const errors = [
    validateRules.required(form.email, UI_LABELS.FORM.LABEL_NAME),
    validateRules.email(form.email),
    validateRules.required(form.password, UI_LABELS.FORM.LABEL_PASSWORD),
    validateRules.password(form.password),
  ].filter((error): error is string => error !== null);
  return {
    isValid: errors.length === 0,
    message: errors[0] || '',
  };
};

export const validateRegisterForm = (form: RegisterFormState) => {
  const errors = [
    validateRules.required(form.name, FIELD_NAMES.NAME),
    validateRules.required(form.email, FIELD_NAMES.EMAIL),
    validateRules.email(form.email),
    validateRules.required(form.password, FIELD_NAMES.PASSWORD),
    validateRules.password(form.password),
    validateRules.required(form.confirmPassword, FIELD_NAMES.SHOW_CONFIRM_PASSWORD),
    validateRules.confirm(form.password, form.confirmPassword),
  ].filter((error): error is string => error !== null);
  return {
    isValid: errors.length === 0,
    message: errors[0] || '',
  };
};
