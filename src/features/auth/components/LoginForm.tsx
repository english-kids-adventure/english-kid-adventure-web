import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBackground } from './AuthBackground';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../../assets/images/logo.png';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthBackground>
      <div
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl px-5 sm:px-8 py-8 sm:py-10 shadow-xl mx-4 sm:mx-0"
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

        <div className="mt-5 sm:mt-6">
          <label className="text-md font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4 sm:mt-5">
          <label className="text-md font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/4 text-gray-500 hover:text-gray-600"
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
          className="mt-6 sm:mt-8 w-full rounded-xl py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition"
        >
          Sign in
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
      </div>
    </AuthBackground>
  );
};
