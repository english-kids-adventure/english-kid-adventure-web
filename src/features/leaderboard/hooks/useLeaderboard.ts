import { useQuery } from '@tanstack/react-query';
import { leaderboardService } from '@/features/leaderboard/services/leaderboardService';

export const useLeaderboard = () => {
  const query = useQuery({
    queryKey: ['weekly-leaderboard'],
    queryFn: leaderboardService.getWeeklyLeaderboard,
    staleTime: 3000,
    refetchInterval: 5000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

