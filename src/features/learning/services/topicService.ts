import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { Topic, TopicResponse } from '@features/learning/types/topic';
import { PAGINATION } from '@shared/constants';

export const topicService = {
  getAll: async (params?: { page?: number; perPage?: number }) => {
    const response = await axiosClient.get(API_ENDPOINTS.TOPICS.GET_ALL, {
      params: {
        page: params?.page ?? PAGINATION.PAGE_OFFSET.PAGE,
        perPage: params?.perPage ?? PAGINATION.PAGE_OFFSET.PER_PAGE,
      },
    });

    const data = response.data.data;

    return {
      items: data.topics.map((item: TopicResponse): Topic => ({
        topicId: item.id,
        name: item.name,
        description: item.description,
        thumbnailUrl: item.thumbnailUrl,
        progress: item.progress,
      })),
      pagination: data.pagination,
    };
  },
};

