import { FIELD_NAMES } from '@shared/constants/forms';
import type { RegisterFormState } from '@features/auth/types';
import type { CoreFormActions } from '@shared/hooks/useFormHandler';

type ToggleableFields = typeof FIELD_NAMES.SHOW_PASSWORD | typeof FIELD_NAMES.SHOW_CONFIRM_PASSWORD;

export type AuthAction =
  | { type: 'UPDATE_FIELD'; field: keyof AuthState; value: string }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'TOGGLE_EYE'; field: ToggleableFields }
  | { type: 'RESET_FORM' };

export interface AuthState extends RegisterFormState {
  loading: boolean;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
}

export const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  showPassword: false,
  showConfirmPassword: false,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction | CoreFormActions<string>,
): AuthState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field as keyof AuthState]: action.value };
    case 'TOGGLE_EYE': {
      const field = action.field as keyof AuthState;
      return { ...state, [field]: !state[field] };
    }
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};
