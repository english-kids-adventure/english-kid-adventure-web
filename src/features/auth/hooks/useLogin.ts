import { useReducer } from 'react';
import { authService } from '@features/auth/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@store/useAuthStore';
import { authReducer, initialState } from '@features/auth/hooks/useAuthFormState';
import { useFormHandler } from '@shared/hooks/useFormHandler';
import { validateLoginForm } from '@shared/utils/validation';
import type { AuthResult } from '@features/auth/types';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { handleChange, handleTogglePassword } =
    useFormHandler(dispatch);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.login,
  });

  const handleLogin = async (): Promise<AuthResult> => {
    if (state.loading) return { success: false };

    const validation = validateLoginForm(state);
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    try {
      const res = await mutateAsync({
        email: state.email,
        password: state.password,
      });

      setAuth(res.user, res.accessToken);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return {
    state: {
      ...state,
      loading: isPending,
    },
    handleLogin,
    handleChange,
    handleTogglePassword,
  };
};
