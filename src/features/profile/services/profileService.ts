import axios from '@/lib/axios';
import type { ProfileResponse } from '@/features/profile/types';

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Record<string, unknown>) => {
    const response = await axios.put('/users/profile', data);
    return response.data;
  },
};
