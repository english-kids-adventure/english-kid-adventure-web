import { useQuery } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import type { Video, VideoItem } from '@features/learning/types';

export type VideoUI = VideoItem;

export const useTopicVideos = (topicId: number) => {
  const { data: topicVideos = [], isLoading: loadingTopicVideos } = useQuery<Video[]>({
    queryKey: ['topic-videos', topicId],
    queryFn: () => videoService.getVideosByTopic(topicId),
    enabled: Number.isFinite(topicId),
  });

  const topicVideosUI: VideoUI[] = topicVideos.map((v) => ({
    ...v,
    isUnlocked: v.isUnlocked ?? true,
    isCompleted: v.isCompleted ?? false,
  }));

  return {
    topicVideos: topicVideosUI,
    isLoading: loadingTopicVideos,
  };
};
