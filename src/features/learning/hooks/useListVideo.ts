import { useQuery, useQueryClient } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import { topicService } from '@features/learning/services/topicService';
import type { Video, Topic } from '@features/learning/types';

export function useListVideo(topicId?: string) {
  const queryClient = useQueryClient();

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
          (t:Topic) => t.topicId === Number(topicId),
        ) ?? null
      );
    },
    enabled: !!topicId,
  });

  const handleUnlocked = (videoId: number) => {
    queryClient.setQueryData<Video[]>(
      ['videos', topicId],
      (old = []) =>
        old.map((v) =>
          v.id === videoId
            ? { ...v, isUnlocked: true }
            : v,
        ),
    );
  };

  return {
    videos,
    topic,
    loading: loadingVideos || loadingTopic,
    handleUnlocked,
  };
}
