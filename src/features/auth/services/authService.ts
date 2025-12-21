import axiosClient from '../../../lib/axios';
import type { LoginCredentials, AuthResponse } from '../types';

export const authService = {
  login: async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/login', data);
    return response.data;
  },
  register: async (data: { nickname: string; email: string; password: string }) => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data;
  },
};
