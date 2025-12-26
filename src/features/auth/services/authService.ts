import axiosClient from '@/lib/axios';
import type { LoginCredentials, AuthResponse, RegisterCredentials } from '@/features/auth/types/index';

export const authService = {
  login: async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/login', data);
    return response.data.data;
  },
  register: async (data: RegisterCredentials) => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data.data;
  },
};
