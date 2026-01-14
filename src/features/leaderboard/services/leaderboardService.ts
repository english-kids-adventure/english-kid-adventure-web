import { get } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { LeaderboardResponse } from '@features/leaderboard/types';

export const leaderboardService = {
  getWeeklyLeaderboard: async (): Promise<LeaderboardResponse> => {
    return get<LeaderboardResponse>(
      API_ENDPOINTS.LEADERBOARD.GET_WEEKLY,
    );
  },
};
