import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@features/task/services/taskService';
import {
  DAILY_TASK_ICON_MAP,
  WEEKLY_TASK_ICON_MAP,
} from '@shared/components/icon';
import { TASK_TYPES } from '@features/task/types/task';
import type { TaskResponse, TaskUI } from '@features/task/types/task';

export const useTaskData = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
    select: (tasks: TaskResponse[]): {
      dailyTasks: TaskUI[]
      weeklyTasks: TaskUI[]
    } => {
      const dailyTasks: TaskUI[] = tasks
        .filter((t) => t.code.startsWith(TASK_TYPES.DAILY))
        .map((t) => ({
          ...t,
          icon: DAILY_TASK_ICON_MAP[t.code],
        }));

      const weeklyTasks: TaskUI[] = tasks
        .filter((t) => t.code.startsWith(TASK_TYPES.WEEKLY))
        .map((t) => ({
          ...t,
          icon: WEEKLY_TASK_ICON_MAP[t.code],
        }));

      return { dailyTasks, weeklyTasks };
    },
  });
};
