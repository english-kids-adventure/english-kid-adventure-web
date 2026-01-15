import { get, put } from '@shared/services/apiService';
import type { ProfileData } from '@features/profile/types/profile';
import { API_ENDPOINTS } from '@shared/constants/api';

export const profileService = {
  getProfile: async (): Promise<ProfileData> => {
    return get<ProfileData>( API_ENDPOINTS.PROFILE.GET_PROFILE);
  },
  updateProfile: async (data: Record<string, unknown>) => {
    return put<ProfileData, Record<string, unknown>>(
      API_ENDPOINTS.PROFILE.UPDATE_PROFILE, data);
  },
};
