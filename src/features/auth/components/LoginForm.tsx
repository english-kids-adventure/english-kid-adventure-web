import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthBackground } from '@features/auth/components/AuthBackground';
import { ROUTES } from '@shared/constants/routes';
import { Button } from '@shared/components/common/Button';
import { Input } from '@shared/components/common/Input';
import { Text } from '@shared/components/common/Text';
import { Heading } from '@shared/components/common/Heading';
import logo from '@assets/images/logo.png';

import { useLogin } from '@features/auth/hooks/useLogin';
import { FIELD_NAMES } from '@shared/constants/forms';

export const LoginForm = () => {
  const {
    state,
    handleLogin,
    handleChange,
    handleTogglePassword,
  } = useLogin();

  return (
    <AuthBackground>
      <form
        onSubmit={handleLogin}
        noValidate
        className="w-full max-w-md bg-white rounded-3xl px-8 py-10 shadow-xl"
      >
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto w-[100px]"
          />
          <Heading level={2} color="primary">
            Welcome back!
          </Heading>
        </div>

        <div className="space-y-4 mt-5">
          <Input
            label="Email"
            name={FIELD_NAMES.EMAIL}
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />

          <Input
            label="Password"
            name={FIELD_NAMES.PASSWORD}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={
              state.showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )
            }
            onIconClick={() =>
              handleTogglePassword(FIELD_NAMES.SHOW_PASSWORD)
            }
          />
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={state.loading}
          className="mt-8 w-full"
        >
          {state.loading ? 'LOGGING IN...' : 'LOGIN NOW'}
        </Button>

        <Text
          as="p"
          variant="caption"
          color="muted"
          className="mt-6 text-center"
        >
          Don’t have an account?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </Text>
      </form>
    </AuthBackground>
  );
};
