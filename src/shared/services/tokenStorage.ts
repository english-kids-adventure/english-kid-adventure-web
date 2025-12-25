export const TOKEN_KEY = 'token';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // optional: log error
  }
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // optional: log error
  }
};
