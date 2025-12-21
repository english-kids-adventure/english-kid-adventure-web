import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '../shared/guards/AuthGuard';
import MainLayout from '../shared/layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
