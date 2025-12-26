import type { User } from '@/shared/types';

export interface LoginCredentials {
  email: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface RegisterFormState extends RegisterCredentials {
  confirmPassword: string;
}

export interface LoginFormState {
  email: string;
  password: string;
}
