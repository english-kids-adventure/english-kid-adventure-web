import React from 'react';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { authService } from '../services/authService';
import { authReducer, initialState } from './useAuthFormState';
import { useFormHandler } from '@shared/hooks/useFormHandler';
import { validateRegisterForm } from '@shared/utils/validation';
import { handleApiError } from '@shared/utils/error-handler';
import { ROUTES } from '@shared/constants/routes';

export const useRegister = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { handleChange, handleTogglePassword } =
    useFormHandler(dispatch);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.register,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateRegisterForm(state);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    try {
      await mutateAsync({
        name: state.name,
        email: state.email,
        password: state.password,
      });

      toast.success('Registration successful!');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleApiError(error, 'Registration failed!');
    }
  };

  return {
    state: {
      ...state,
      loading: isPending,
    },
    handleRegister,
    handleChange,
    handleTogglePassword,
  };
};
