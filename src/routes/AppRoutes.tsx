import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { lazy, Suspense } from 'react';
import { AuthGuard } from '@shared/guards/AuthGuard';
import MainLayout from '@shared/layouts/MainLayout';

// Lazy page
const Register = lazy(() => import('@pages/Register'));
const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    Loading...
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
