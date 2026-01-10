import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { TaskResponse } from '@features/task/types/task';

export const taskApi = {
  getTasks: async (): Promise<TaskResponse[]> => {
    const res = await axiosClient.get(
      API_ENDPOINTS.TASK.GET_TASK,
    );
    return res.data.data;
  },

  claimDailyXP: async (missionId: number): Promise<TaskResponse> => {
    const res = await axiosClient.post(
      API_ENDPOINTS.TASK.CLAIM_AWARD,
      {
        missionId,
      },
    );
    return res.data.data;
  },

};
