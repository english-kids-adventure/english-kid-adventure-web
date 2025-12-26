import { useAuthStore } from '@/store/useAuthStore';

export const useAuth = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    logout,
  };
};
