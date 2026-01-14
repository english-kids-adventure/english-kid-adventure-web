import { usePagination } from '@shared/hooks/usePagination';
import { topicService } from '@features/learning/services/topicService';
import type { Topic } from '@features/learning/types';
import { PAGINATION } from '@shared/constants';

export const useTopic = (perPage = PAGINATION.PAGE_OFFSET.PER_PAGE) => {
  return usePagination<Topic>({
    fetchFn: topicService.getAll,
    perPage,
  });
};
