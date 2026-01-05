import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@shared/utils';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Rocket } from 'lucide-react';
import { AuthBackground } from '@features/auth/components/AuthBackground';
import { toast } from 'react-toastify';
import { Button, Input, Text, Heading } from '@shared/components/common';
import logo from '@assets/images/logo.png';

import { useRegister } from '@features/auth/hooks/useRegister';
import { ROUTES, MESSAGES, FIELD_NAMES, UI_LABELS, PLACEHOLDERS } from '@shared/constants';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { state, handleRegister, handleChange, handleTogglePassword } = useRegister();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleRegister();

    if (!result.success) {
      if (result.message) {
        toast.error(result.message);
      } else {
        const errorMessage = handleApiError(result.error, MESSAGES.AUTH.REGISTER_ERROR_DEFAULT);
        toast.error(errorMessage);
      }
      return;
    }

    toast.success(MESSAGES.AUTH.REGISTER_SUCCESS);
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthBackground>
      <form onSubmit={onSubmit} noValidate className="w-full max-w-md bg-white rounded-3xl px-8 py-10 shadow-xl">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto w-[100px]" />
          <Heading level={2} color='primary'>{UI_LABELS.AUTH.CREATE_ACCOUNT}</Heading>
          <Text as="p" variant='body' color='muted' className="flex items-center justify-center gap-2 mt-2">
            {UI_LABELS.AUTH.START_JOURNEY} <Rocket size={16} className="text-orange-500" />
          </Text>
        </div>

        <div className="space-y-4 mt-5">
          <Input label={UI_LABELS.FORM.LABEL_NAME} name={FIELD_NAMES.NAME} value={state.name} onChange={handleChange} placeholder={PLACEHOLDERS.NAME} />
          <Input label={UI_LABELS.FORM.LABEL_EMAIL} name={FIELD_NAMES.EMAIL} type="email" value={state.email} onChange={handleChange} placeholder={PLACEHOLDERS.EMAIL} />

          <Input
            label={UI_LABELS.FORM.LABEL_PASSWORD}
            name={FIELD_NAMES.PASSWORD}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange}
            icon={state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => handleTogglePassword(FIELD_NAMES.SHOW_PASSWORD)}
          />

          <Input
            label={UI_LABELS.FORM.LABEL_CONFIRM_PASSWORD}
            name={FIELD_NAMES.CONFIRM_PASSWORD}
            type={
              state.showConfirmPassword ? 'text' : 'password'
            }
            value={state.confirmPassword}
            onChange={handleChange}
            icon={state.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => handleTogglePassword(FIELD_NAMES.SHOW_CONFIRM_PASSWORD)}
          />
        </div>

        <Button size='lg' type="submit" disabled={state.loading} className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          {state.loading ? UI_LABELS.FORM.BTN_CREATING_ACCOUNT : UI_LABELS.FORM.BTN_REGISTER}
        </Button>

        <Text as="p" variant='caption' color='muted' className="mt-6 text-center">
          {UI_LABELS.AUTH.ALREADY_ACCOUNT} <Link to={ROUTES.LOGIN} className="text-blue-600 font-medium hover:underline">{UI_LABELS.AUTH.LOG_IN}</Link>
        </Text>
      </form>
    </AuthBackground>
  );
};

