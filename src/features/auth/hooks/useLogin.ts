import { useReducer, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { authService } from '../services/authService';
import { useAuthStore } from '@store/useAuthStore';
import { authReducer, initialState } from './useAuthFormState';
import { useFormHandler } from '@shared/hooks/useFormHandler';
import { validateLoginForm } from '@shared/utils/validation';
import { handleApiError } from '@shared/utils/error-handler';
import { ROUTES } from '@shared/constants/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { handleChange, handleTogglePassword } =
    useFormHandler(dispatch);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.login,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (isPending) return;

    const validation = validateLoginForm(state);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    try {
      const res = await mutateAsync({
        email: state.email,
        password: state.password,
      });

      setAuth(res.user, res.accessToken);

      toast.success('Welcome back! +10 XP for daily login!');
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      handleApiError(error, 'Login failed. Please try again!');
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
