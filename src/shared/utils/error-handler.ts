import axios from 'axios';
import { MESSAGES } from '@shared/constants';

interface ApiErrorData {
  message: string;
  error?: string;
}

export const handleApiError = (
  error: unknown,
  fallbackMessage: string = MESSAGES.ERROR.DEFAULT_API,
): string => {
  if (axios.isAxiosError<ApiErrorData>(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
