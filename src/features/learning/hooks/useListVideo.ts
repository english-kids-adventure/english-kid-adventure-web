import { useQueryClient } from '@tanstack/react-query';
import { useTopicVideos } from '@features/learning/hooks/useTopicVideos';
import { useTopicById } from '@features/learning/hooks/useTopicById';
import type { Video } from '@features/learning/types';

export const useListVideo = (topicId?: string) => {
  const queryClient = useQueryClient();

  const { topicVideos: videos, isLoading: loadingVideos } = useTopicVideos(Number(topicId));
  const { topic, isLoading: loadingTopic } = useTopicById(topicId);

  const handleUnlocked = (videoId: number) => {
    queryClient.setQueryData<Video[]>(
      ['topic-videos', Number(topicId)],
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
};
