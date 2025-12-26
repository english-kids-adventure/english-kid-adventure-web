import type { User } from '@/shared/types';

export type LoginCredentials = {
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
