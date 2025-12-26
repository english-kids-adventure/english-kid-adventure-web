import type { RegisterFormState } from '@/features/auth/types';

type AuthAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'TOGGLE_EYE'; field: 'showPassword' | 'showConfirmPassword' };

interface ExtendedRegisterState extends RegisterFormState {
  loading: boolean;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
}

export const initialState: ExtendedRegisterState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  showPassword: false,
  showConfirmPassword: false,
};

export function authReducer(
  state: ExtendedRegisterState,
  action: AuthAction,
): ExtendedRegisterState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOADING':
      return { ...state, loading: action.value as boolean };
    case 'TOGGLE_EYE':
      return { ...state, [action.field]: !state[action.field as keyof ExtendedRegisterState] };
    default:
      return state;
  }
}
