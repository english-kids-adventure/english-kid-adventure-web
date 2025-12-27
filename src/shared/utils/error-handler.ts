import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ApiErrorData {
  message: string;
  error?: string;
}

export const handleApiError = (error: unknown, fallbackMessage: string) => {
  const axiosError = error as AxiosError<ApiErrorData>;
  const errorMessage = axiosError.response?.data?.error || fallbackMessage;
  toast.error(errorMessage);
};
