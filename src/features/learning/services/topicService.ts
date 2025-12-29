import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { Topic, TopicResponse } from '@features/learning/types/topic';
import { CURSOR_PAGINATION } from '@shared/constants/cursorPagination';

export const topicService = {
  getAll: async (params?: { limit?: number; cursor?: number | null }) => {
    const response = await axiosClient.get(API_ENDPOINTS.TOPICS.GET_ALL, {
      params: {
        limit: params?.limit ?? CURSOR_PAGINATION.LIMIT,
        cursor: params?.cursor,
      },
    });

    const data = response.data.data;

    return {
      topics: data.topics.map((item: TopicResponse): Topic => ({
        topicId: item.id,
        name: item.name,
        description: item.description,
        thumbnailUrl: item.thumbnailUrl,
        progress: {
          totalVideos: item.progress.totalVideos,
          completedVideos: item.progress.completedVideos,
        },
      })),
      nextCursor: data.nextCursor,
    };
  },
};
