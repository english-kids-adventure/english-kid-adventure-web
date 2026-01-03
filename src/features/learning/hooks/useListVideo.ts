import { useQuery } from '@tanstack/react-query';
import { videoService } from '@/features/learning/services/videoService';
import { topicService } from '@/features/learning/services/topicService';
import type { Topic } from '@/features/learning/types';

export function useListVideo(topicId?: string) {
  const {
    data: videos = [],
    isLoading: loadingVideos,
  } = useQuery({
    queryKey: ['videos', topicId],
    queryFn: () => videoService.getVideosByTopic(Number(topicId)),
    enabled: !!topicId,
  });

  const {
    data: topic,
    isLoading: loadingTopic,
  } = useQuery<Topic | null>({
    queryKey: ['topic', topicId],
    queryFn: async () => {
      const res = await topicService.getAll();
      return (
        res.topics.find(
          (t: Topic) => t.topicId === Number(topicId),
        ) ?? null
      );
    },
    enabled: !!topicId,
  });

  return {
    videos,
    topic,
    loading: loadingVideos || loadingTopic,
  };
}
