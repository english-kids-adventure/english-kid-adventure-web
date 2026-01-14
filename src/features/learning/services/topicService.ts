import { get } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants/api';
import { PAGINATION } from '@shared/constants';
import type { Topic, TopicResponse } from '@features/learning/types';

interface GetTopicsApiResponse {
  topics: TopicResponse[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

export const topicService = {
  async getAll(params?: { page?: number; perPage?: number }) {
    const data = await get<GetTopicsApiResponse>(
      API_ENDPOINTS.TOPICS.GET_ALL,
      {
        params: {
          page: params?.page ?? PAGINATION.PAGE_OFFSET.PAGE,
          perPage: params?.perPage ?? PAGINATION.PAGE_OFFSET.PER_PAGE,
        },
      },
    );

    return {
      items: data.topics.map((item): Topic => ({
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
