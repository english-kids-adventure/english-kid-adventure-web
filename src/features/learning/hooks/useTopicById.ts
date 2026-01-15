import { useQuery } from '@tanstack/react-query';
import { topicService } from '@features/learning/services/topicService';
import type { Topic } from '@features/learning/types';

export const useTopicById = (topicId?: string) => {
  const {
    data: topic,
    isLoading: loadingTopic,
  } = useQuery<Topic | null>({
    queryKey: ['topic', topicId],
    queryFn: async () => {
      const res = await topicService.getAll();
      return (
        res.items.find(
          (t: Topic) => t.topicId === Number(topicId),
        ) ?? null
      );
    },
    enabled: !!topicId,
  });

  return {
    topic,
    isLoading: loadingTopic,
  };
};
