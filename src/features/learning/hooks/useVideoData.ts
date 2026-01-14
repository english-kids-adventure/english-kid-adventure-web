import { useQuery } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import type { Video, VideoItem } from '@features/learning/types';

export type VideoUI = VideoItem;

export const useVideoData = ({ topicId, videoId }: { topicId: number; videoId: number }) => {
  const { data: topicVideos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['topic-videos', topicId],
    queryFn: () => videoService.getVideosByTopic(topicId),
    enabled: Number.isFinite(topicId),
  });

  const topicVideosUI: VideoUI[] = topicVideos.map((v) => ({
    ...v,
    isUnlocked: v.isUnlocked ?? true,
    isCompleted: v.isCompleted ?? false,
  }));

  const videoUI: VideoUI | null =
    topicVideosUI.find((v) => v.id === videoId) ?? null;

  return {
    video: videoUI,
    topicVideos: topicVideosUI,
    loading: isLoading,
    isCompleted: !!videoUI?.isCompleted,
  };
};
