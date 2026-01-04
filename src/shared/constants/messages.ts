export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Welcome back! +10 XP for daily login!',
    LOGIN_ERROR_DEFAULT: 'Login failed. Please try again!',
    REGISTER_SUCCESS: 'Registration successful!',
    REGISTER_ERROR_DEFAULT: 'Registration failed!',
  },

  VALIDATION: {
    REQUIRED: (fieldName: string) => `${fieldName} is required`,
    EMAIL_REQUIRED: 'Email is required',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_MIN: 'Password must be at least 6 characters',
    PASSWORDS_NOT_MATCH: 'Passwords do not match!',
  },
  ERROR: {
    DEFAULT_API: 'An unexpected error occurred. Please try again.',
    YOUTUBE_THUMBNAIL_FALLBACK: 'https://i.ytimg.com/vi/default/hqdefault.jpg',
  },
} as const;
