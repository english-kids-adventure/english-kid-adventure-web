import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import type { AuthResponse } from '../types';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please fill in all fields! ❤️');
    }

    setIsLoading(true);
    try {
      const response: AuthResponse = await authService.login({ email, password });
      setAuth(response.user, response.token);
      toast.success('Welcome back! +10 XP for daily login 🌟');
      navigate('/');
    } catch {
      toast.error('Wrong email or password!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className='bg-white p-8 rounded-[40px] shadow-2xl w-full border-8 border-blue-200 space-y-4'
    >
      <input
        type='email'
        placeholder="Kid's email..."
        className='w-full p-4 bg-blue-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-blue-300'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        type='password'
        placeholder='Secret password...'
        className='w-full p-4 bg-blue-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-blue-300'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-orange-500 text-white font-black py-4 rounded-2xl text-xl shadow-[0_6px_0_0_#c2410c] active:translate-y-1 active:shadow-none transition-all'
      >
        {isLoading ? 'LOGGING IN...' : 'LOGIN NOW'}
      </button>

      <div className='text-center pt-2'>
        <Link to='/register' className='text-slate-500 font-bold hover:text-blue-500 transition-colors'>
          Don't have an account? Register now!
        </Link>
      </div>
    </form>
  );
};
