import { useQueryClient } from '@tanstack/react-query';
import { useTaskData } from '@features/task/hooks/useTaskData';
import { useClaimAward } from '@features/task/hooks/useClaimAward';
import type { TaskResponse } from '@features/task/types/task';
import { usePlayer } from '@shared/hooks/usePlayer';

export const useTask = () => {
  const queryClient = useQueryClient();

  const { addStars, addXp } = usePlayer();

  const taskQuery = useTaskData();
  const claimAwardMutation = useClaimAward();

  const handleClaimDaily = (task: TaskResponse) => {
    queryClient.setQueryData<TaskResponse[]>(['tasks'], (old) =>
      old?.map((t) =>
        t.id === task.id ? { ...t, isClaimed: true } : t,
      ),
    );

    addXp(task.rewardXp);

    claimAwardMutation.mutate(task.id, {
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  };

  const handleClaimWeekly = (task: TaskResponse) => {
    queryClient.setQueryData<TaskResponse[]>(['tasks'], (old) =>
      old?.map((t) =>
        t.id === task.id ? { ...t, isClaimed: true } : t,
      ),
    );

    addStars(task.rewardStars);

    claimAwardMutation.mutate(task.id, {
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  };

  return {
    dailyTasks: taskQuery.data?.dailyTasks ?? [],
    weeklyTasks: taskQuery.data?.weeklyTasks ?? [],

    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,

    handleClaimDaily,
    handleClaimWeekly,
  };
};
