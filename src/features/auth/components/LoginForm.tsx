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

export const LoginForm = () => {
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

  const isSubmittingDisabled = loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res: AuthResponse = await authService.login(form);

      setAuth(res.user, res.token);

      toast.success('Welcome back! +10 XP for daily login!');

      navigate('/home');
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err?.response?.data?.message || 'Login failed',
      );
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
            alt="EKA"
            className="mx-auto w-[80px] sm:w-[100px]"
          />
        </div>

        <h1 className="mt-1 text-xl sm:text-2xl font-bold text-center text-blue-900">
          Welcome back!
        </h1>

        <div className="mt-5">
          <label className="text-md font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="mt-2 w-full rounded-xl border border-gray-300
                       px-4 py-3 text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-md font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-gray-300
                         px-4 py-3 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/4
                         text-gray-500 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmittingDisabled}
          className="mt-6 sm:mt-8 w-full rounded-xl py-3
                    text-white font-semibold
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    hover:opacity-90 transition
                    disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'LOGGING IN...' : 'LOGIN NOW'}
        </button>

        <p className="mt-5 sm:mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthBackground>
  );
};

