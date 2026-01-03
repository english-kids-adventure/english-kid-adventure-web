import { useQuery } from '@tanstack/react-query';
import { videoService } from '@/features/learning/services/videoService';

interface Params {
  topicId?: string;
  videoId?: string;
}

export function useVideoDetail({ topicId, videoId }: Params) {
  const topicIdNum = Number(topicId);
  const videoIdNum = Number(videoId);

  const {
    data: video,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ['video-detail', topicIdNum],
    enabled: Boolean(topicId && videoId),
    queryFn: async () => {
      const videos = await videoService.getVideosByTopic(topicIdNum);
      return (
        videos.find((v) => v.id === videoIdNum) ?? null
      );
    },
  });

  return {
    video,
    loading,
    isError,
  };
}
