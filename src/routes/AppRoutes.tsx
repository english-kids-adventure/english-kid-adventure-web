import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { lazy, Suspense } from 'react';
import { AuthGuard } from '@/shared/guards/AuthGuard';
import MainLayout from '@/shared/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';

// Lazy page
const RegisterPage = lazy(() => import('@/pages/Register'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    Loading...
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
