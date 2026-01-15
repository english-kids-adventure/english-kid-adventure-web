import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@shared/utils';
import { AuthBackground } from '@features/auth/components/AuthBackground';
import { ROUTES, MESSAGES, FIELD_NAMES, UI_LABELS, PLACEHOLDERS } from '@shared/constants';
import { Button, Input, Text, Heading } from '@shared/components/common';
import logo from '@assets/images/logo.png';

import { useLogin } from '@features/auth/hooks/useLogin';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { state, handleLogin, handleChange, handleTogglePassword } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin();

    if (!result.success) {
      if (result.message) {
        toast.error(result.message);
      } else {
        const errorMessage = handleApiError(result.error, MESSAGES.AUTH.LOGIN_ERROR_DEFAULT);
        toast.error(errorMessage);
      }
      return;
    }

    toast.success(MESSAGES.AUTH.LOGIN_SUCCESS);
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <AuthBackground>
      <form onSubmit={onSubmit} noValidate className="w-full max-w-md bg-white rounded-3xl px-8 py-10 shadow-xl">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto w-25" />
          <Heading level={2} color='primary'>{UI_LABELS.AUTH.WELCOME_BACK}</Heading>
        </div>

        <div className="space-y-4 mt-5">
          <Input
            label={UI_LABELS.FORM.LABEL_EMAIL}
            name={FIELD_NAMES.EMAIL}
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.EMAIL}
          />

          <Input
            label={UI_LABELS.FORM.LABEL_PASSWORD}
            name={FIELD_NAMES.PASSWORD}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.PASSWORD}
            icon={state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => handleTogglePassword(FIELD_NAMES.SHOW_PASSWORD)}
          />
        </div>

        <Button size='lg' type="submit" disabled={state.loading} className="mt-8 w-full">
          {state.loading ? UI_LABELS.FORM.BTN_LOGGING_IN : UI_LABELS.FORM.BTN_LOGIN}
        </Button>

        <Text as="p" variant='caption' color='muted' className="mt-6 text-center">
          {UI_LABELS.AUTH.NO_ACCOUNT}{' '}
          <Link to={ROUTES.REGISTER} className="text-blue-600 font-medium hover:underline">{UI_LABELS.AUTH.SIGN_UP}</Link>
        </Text>
      </form>
    </AuthBackground>
  );
};
