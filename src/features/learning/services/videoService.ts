import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { Video, UnlockVideoResponse } from '@features/learning/types';

export const videoService = {
  getVideosByTopic: async (topicId: number): Promise<Video[]> => {
    const response = await axiosClient.get(
      API_ENDPOINTS.VIDEO.LIST_VIDEO_BY_TOPIC(topicId),
    );
    return response.data.data;
  },

  unlockVideo: async (
    videoId: number,
  ): Promise<UnlockVideoResponse> => {
    const response = await axiosClient.post(
      API_ENDPOINTS.VIDEO.UNLOCK(videoId),
    );

    return response.data.data;
  },
};

