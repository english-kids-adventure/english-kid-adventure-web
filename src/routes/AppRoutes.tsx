import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { AuthGuard } from '../shared/guards/AuthGuard';
import MainLayout from '../shared/layouts/MainLayout';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

