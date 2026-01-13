import { usePagination } from '@shared/hooks/usePagination';
import { topicService } from '../services/topicService';
import type { Topic } from '../types/topic';
import { PAGINATION } from '@shared/constants';

export function useTopic(perPage = PAGINATION.PAGE_OFFSET.PER_PAGE) {
  return usePagination<Topic>({
    fetchFn: topicService.getAll,
    perPage,
  });
}
