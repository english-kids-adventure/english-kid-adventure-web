import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@features/task/services/taskService';

export const useClaimAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: number) => taskApi.claimDailyXP(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
