import { useReducer } from 'react';
import { authService } from '@features/auth/services/authService';
import { useMutation } from '@tanstack/react-query';
import { authReducer, initialState } from '@features/auth/hooks/useAuthFormState';
import { useFormHandler } from '@shared/hooks/useFormHandler';
import { validateRegisterForm } from '@shared/utils/validation';
import type { AuthResult } from '@features/auth/types';
import { handleApiError } from '@shared/utils';

export const useRegister = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { handleChange, handleTogglePassword } =
    useFormHandler(dispatch);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.register,
  });

  const handleRegister = async () : Promise<AuthResult> => {
    if (isPending) return { success: false, message: 'Please wait...' };

    const validation = validateRegisterForm(state);
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    try {
      await mutateAsync({
        name: state.name,
        email: state.email,
        password: state.password,
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: handleApiError(error) };
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
