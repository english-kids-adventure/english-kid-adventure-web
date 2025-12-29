import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { authReducer, initialState } from './useAuthFormState';
import type { AuthAction } from './useAuthFormState';
import { useFormHandler } from '@shared/hooks/useFormHandler';
import { validateRegisterForm } from '@shared/utils/validation';
import { handleApiError } from '@shared/utils/error-handler';
import { ROUTES } from '@shared/constants/routes';

export const useRegister = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { handleChange, handleTogglePassword } = useFormHandler<AuthAction>(dispatch);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateRegisterForm(state);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', value: true });
      await authService.register({
        name: state.name,
        email: state.email,
        password: state.password,
      });
      toast.success('Registration successful!');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleApiError(error, 'Registration failed!');
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return { state, handleRegister, handleChange, handleTogglePassword };
};
