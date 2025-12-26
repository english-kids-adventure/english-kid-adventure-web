import React, { useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/features/auth/services/authService';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Rocket } from 'lucide-react';
import { AuthBackground } from '@/features/auth/components/AuthBackground';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/components/common/Button';
import { Input } from '@/shared/components/common/Input';
import { Text } from '@/shared/components/common/Text';
import logo from '@/assets/images/logo.png';
import type { RegisterCredentials } from '@/features/auth/types';
import { validateAuthForm } from '@/shared/utils/validation';
import { handleApiError } from '@/shared/utils/error-handler';
import { authReducer, initialState } from '@/features/auth/hooks/useRegisterForm';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAuthForm(state)) return;

    try {
      dispatch({ type: 'SET_LOADING', value: true });
      const apiPayload = Object.keys(state).reduce<Partial<RegisterCredentials>>((acc, key) => {
        const blacklist = ['confirmPassword', 'loading', 'showPassword', 'showConfirmPassword'];
        if (!blacklist.includes(key)) {
          const authKey = key as keyof RegisterCredentials;
          acc[authKey] = state[authKey as keyof typeof state] as string;
        }
        return acc;
      }, {});

      await authService.register(apiPayload as RegisterCredentials);
      toast.success('Success!');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleApiError(error, 'Error!');
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl
                   px-5 sm:px-8 py-8 sm:py-10 shadow-xl mx-4 sm:mx-0"
      >
        <div className="text-center">
          <img
            src={logo}
            alt="English Kid Adventure Logo"
            className="mx-auto w-[80px] sm:w-[100px]"
          />
        </div>

        <div className="text-center mt-1">
          <Text as="h2" variant='title' color='primary'>
            Create Account
          </Text>
          <Text as="p" variant='subtitle' color='muted' className="flex items-center justify-center gap-2">
            Start your English journey! <Rocket size={16} className="text-orange-500" />
          </Text>
        </div>

        <div className="space-y-4 mt-5">
          <div>
            <Input
              label='Name'
              inputSize='sm'
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
              placeholder="Your adventure name"
            />
          </div>

          <div>
            <Input
              label='Email'
              inputSize='sm'
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Your@email.com"
            />
          </div>

          <div>
            <div className="relative mt-2">
              <Input
                label='Password'
                inputSize='sm'
                name="password"
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                icon={state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onIconClick={() => dispatch({ type: 'TOGGLE_EYE', field: 'showPassword' })}
              />
            </div>
          </div>

          <div>
            <div className="relative mt-2">
              <Input
                label='Confirm Password'
                inputSize='sm'
                name="confirmPassword"
                type={state.showConfirmPassword ? 'text' : 'password'}
                value={state.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                icon={state.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onIconClick={() => dispatch({ type: 'TOGGLE_EYE', field: 'showConfirmPassword' })}
              />
            </div>
          </div>
        </div>

        <Button size='lg'
          type="submit"
          disabled={state.loading}
          className="mt-6 sm:mt-8 w-full rounded-xl py-3 text-white font-semibold
                     bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:opacity-90 transition-all shadow-md
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.loading ? 'CREATING ACCOUNT...' : 'REGISTER NOW'}
        </Button>

        <Text as="p" variant='caption' color='muted' className="mt-5 sm:mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="text-blue-600 font-medium hover:underline transition-colors"
          >
            Log in
          </Link>
        </Text>
      </form>
    </AuthBackground>
  );
};

