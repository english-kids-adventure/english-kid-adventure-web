import { post } from '@shared/services/apiService';
import type { LoginCredentials, AuthResponse, RegisterCredentials } from '@features/auth/types/index';
import { API_ENDPOINTS } from '@shared/constants/api';

export const authService = {
  login: (data: LoginCredentials): Promise<AuthResponse> => {
    return post(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  register: (data: RegisterCredentials): Promise<AuthResponse> => {
    return post(API_ENDPOINTS.AUTH.REGISTER, data);
  },
};
