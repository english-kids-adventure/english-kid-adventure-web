import { useReducer, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { authReducer, initialState } from './useAuthFormState';
import type { AuthAction } from './useAuthFormState';
import { useFormHandler } from '@/shared/hooks/useFormHandler';
import { validateLoginForm } from '@/shared/utils/validation';
import { handleApiError } from '@/shared/utils/error-handler';
import { ROUTES } from '@/shared/constants/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { handleChange, handleTogglePassword } = useFormHandler<AuthAction>(dispatch);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (state.loading) return;

    const validation = validateLoginForm(state);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', value: true });
      const res = await authService.login({
        email: state.email,
        password: state.password,
      });

      setAuth(res.user, res.accessToken);
      toast.success('Welcome back! +10 XP for daily login!');
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      handleApiError(error, 'Login failed. Please try again!');
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return { state, handleLogin, handleChange, handleTogglePassword };
};
