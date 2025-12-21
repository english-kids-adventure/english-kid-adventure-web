import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nickname, email, password, confirmPassword } = formData;

    if (!nickname || !email || !password || !confirmPassword) {
      return toast.error('Please fill in all fields! ✨');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match! 🌈');
    }

    setIsLoading(true);
    try {
      await authService.register({
        nickname,
        email,
        password,
      });

      toast.success('Registration successful! Please login to get 10 XP 🌟');
      navigate('/login');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'This email is already taken!';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-8 rounded-[40px] shadow-2xl w-full border-8 border-pink-200 space-y-4"
    >
      <div>
        <label className="block text-slate-700 font-black mb-1 ml-2 text-sm">KID'S NAME (NICKNAME)</label>
        <input
          type="text"
          placeholder="E.g., Smart Kid Na"
          className="w-full p-4 bg-pink-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-pink-300"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-slate-700 font-black mb-1 ml-2 text-sm">EMAIL</label>
        <input
          type="email"
          placeholder="kid@example.com"
          className="w-full p-4 bg-pink-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-pink-300"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-700 font-black mb-1 ml-2 text-sm">PASSWORD</label>
          <input
            type="password"
            placeholder="••••••"
            className="w-full p-4 bg-pink-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-pink-300"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-slate-700 font-black mb-1 ml-2 text-sm">CONFIRM</label>
          <input
            type="password"
            placeholder="••••••"
            className="w-full p-4 bg-pink-50 rounded-2xl font-bold outline-none border-4 border-transparent focus:border-pink-300"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl text-xl shadow-[0_6px_0_0_#be185d] active:translate-y-1 active:shadow-none transition-all"
      >
        {isLoading ? 'CREATING...' : 'CREATE ACCOUNT 🎁'}
      </button>

      <div className="text-center pt-2">
        <Link to="/login" className="text-slate-500 font-bold hover:text-pink-500 transition-colors">
          Already have an account? Login now!
        </Link>
      </div>
    </form>
  );
};
