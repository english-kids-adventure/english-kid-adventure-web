import { Link } from 'react-router-dom';
import { Eye, EyeOff, Rocket } from 'lucide-react';
import { AuthBackground } from './AuthBackground';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/components/common/Button';
import { Input } from '@/shared/components/common/Input';
import { Text } from '@/shared/components/common/Text';
import logo from '@/assets/images/logo.png';
import { useRegister } from '../hooks/useRegister';
import { FIELD_NAMES } from '@/shared/constants/forms';

export const RegisterForm = () => {
  const { state, handleRegister, handleChange, handleTogglePassword } = useRegister();

  return (
    <AuthBackground>
      <form onSubmit={handleRegister} noValidate className="w-full max-w-md bg-white rounded-3xl px-8 py-10 shadow-xl">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto w-[100px]" />
          <Text as="h2" variant='title' color='primary' className="mt-2">Create Account</Text>
          <Text as="p" variant='subtitle' color='muted' className="flex items-center justify-center gap-2">
            Start your English journey! <Rocket size={16} className="text-orange-500" />
          </Text>
        </div>

        <div className="space-y-4 mt-5">
          <Input label='Name' name={FIELD_NAMES.NAME} value={state.name} onChange={handleChange} placeholder="Adventure name" />
          <Input label='Email' name={FIELD_NAMES.EMAIL} type="email" value={state.email} onChange={handleChange} placeholder="Your@email.com" />

          <Input
            label='Password'
            name={FIELD_NAMES.PASSWORD}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange}
            icon={state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => handleTogglePassword('showPassword')}
          />

          <Input
            label='Confirm Password'
            name={FIELD_NAMES.CONFIRM_PASSWORD}
            type={state.showConfirmPassword ? 'text' : 'password'}
            value={state.confirmPassword}
            onChange={handleChange}
            icon={state.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => handleTogglePassword('showConfirmPassword')}
          />
        </div>

        <Button size='lg' type="submit" disabled={state.loading} className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          {state.loading ? 'CREATING ACCOUNT...' : 'REGISTER NOW'}
        </Button>

        <Text as="p" variant='caption' color='muted' className="mt-6 text-center">
          Already have an account? <Link to={ROUTES.LOGIN} className="text-blue-600 font-medium hover:underline">Log in</Link>
        </Text>
      </form>
    </AuthBackground>
  );
};
