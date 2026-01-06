import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { lazy, Suspense } from 'react';
import { AuthGuard } from '@shared/guards/AuthGuard';
import MainLayout from '@shared/layouts/MainLayout';
import { Loading } from '@/shared/components/common';

const Register = lazy(() => import('@pages/Register'));
const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const ListVideo = lazy(() => import('@pages/ListVideo'));
const VideoDetail = lazy(() => import('@pages/VideoDetail'));
const Quiz = lazy(() => import('@pages/Quiz'));

const PageLoader = () => (
  <Loading/>
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
            <Route path={ROUTES.LISTVIDEO} element={<ListVideo />} />
            <Route path={ROUTES.VIDEO_DETAIL} element={<VideoDetail />} />
            <Route path={ROUTES.QUIZ} element={<Quiz />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
