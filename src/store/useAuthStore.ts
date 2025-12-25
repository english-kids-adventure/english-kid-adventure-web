import { create } from 'zustand';
import type { User } from '@/shared/types';
import { getToken, setToken, removeToken } from '@/shared/services/tokenStorage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!getToken(),
  setAuth: (user, token) => {
    setToken(token);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    removeToken();
    set({ user: null, isAuthenticated: false });
  },
}));
