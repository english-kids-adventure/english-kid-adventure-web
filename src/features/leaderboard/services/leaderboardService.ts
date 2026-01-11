import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { LeaderboardResponse } from '@features/leaderboard/types';

export const leaderboardService = {
  getWeeklyLeaderboard: async (): Promise<LeaderboardResponse> => {
    const response = await axiosClient.get(
      API_ENDPOINTS.LEADERBOARD.GET_WEEKLY,
    );

    return response.data.data;
  },
};
