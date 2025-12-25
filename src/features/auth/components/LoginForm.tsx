import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { AuthBackground } from '@/features/auth/components/AuthBackground';
import { Eye, EyeOff } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/features/auth/services/authService';
import { toast } from 'react-toastify';
import type { AuthResponse } from '@/features/auth/types';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/components/common/Button';
import { Input } from '@/shared/components/common/Input';
import { Text } from '@/shared/components/common/Text';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
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

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res: AuthResponse = await authService.login(form);
      setAuth(res.user, res.token);
      toast.success('Welcome back! +10 XP for daily login!');
      navigate(ROUTES.HOME);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm sm:max-w-md bg-white rounded-3xl
          px-5 sm:px-8 py-8 sm:py-10 shadow-xl
          mx-4 sm:mx-0
        "
      >
        {/* Logo */}
        <div className="text-center">
          <img
            src={logo}
            alt="EKA"
            className="mx-auto w-[80px] sm:w-[100px]"
          />
        </div>

        {/* Title */}
        <Text
          as="h2"
          variant="title"
          color='primary'
          align="center"
        >
          Welcome back!
        </Text>

        {/* Email */}
        <div className="mt-5">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            inputSize="sm"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            inputSize="sm"
            icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={loading}
          className="mt-6 sm:mt-8"
        >
          {loading ? 'LOGGING IN...' : 'LOGIN NOW'}
        </Button>

        {/* Footer */}
        <Text
          as="p"
          variant="caption"
          align="center"
          color="muted"
          className="mt-5 sm:mt-6"
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

