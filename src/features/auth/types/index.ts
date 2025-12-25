import type { User } from '@/shared/types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterCredentials extends LoginCredentials {
  nickname: string;
}
