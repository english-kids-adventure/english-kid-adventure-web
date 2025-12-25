import React, { useState } from 'react';
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
import type { AxiosError } from 'axios';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!form.email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (!form.password.trim()) {
      toast.error('Password is required');
      return false;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success('Registration successful! Please login to get 10 XP!');
      navigate(ROUTES.LOGIN);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Registration failed. Please try again!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleSubmit}
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
              value={form.name}
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
              value={form.email}
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
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onIconClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div>
            <div className="relative mt-2">
              <Input
                label='Confirm Password'
                inputSize='sm'
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>
        </div>

        <Button size='lg'
          type="submit"
          disabled={loading}
          className="mt-6 sm:mt-8 w-full rounded-xl py-3 text-white font-semibold
                     bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:opacity-90 transition-all shadow-md
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'CREATING ACCOUNT...' : 'REGISTER NOW'}
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
