import axios from 'axios';
import { getAccessToken, setAccessToken, removeAccessToken } from '@/shared/services/tokenStorage';
import { useAuthStore } from '@/store/useAuthStore';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${axiosClient.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );
        const { accessToken } = res.data.data;
        setAccessToken(accessToken);
        useAuthStore.getState().updateToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        removeAccessToken();
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
