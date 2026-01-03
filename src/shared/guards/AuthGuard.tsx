import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/useAuthStore';

export const AuthGuard = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
