import { useInfiniteQuery } from '@tanstack/react-query';
import { topicService } from '@features/learning/services/topicService';
import { CURSOR_PAGINATION } from '@shared/constants/cursorPagination';
import type { Topic } from '@features/learning/types';

export function useTopic() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['home-topics'],
    queryFn: ({ pageParam }) =>
      topicService.getAll({
        limit: CURSOR_PAGINATION.LIMIT,
        cursor: pageParam,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const topics: Topic[] =
    data?.pages.flatMap((page) => page.topics) ?? [];

  return {
    topics,
    loading: isLoading || isFetchingNextPage,
    error: isError ? 'Failed to load topics' : null,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
  };
}
