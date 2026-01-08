import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import { useCallback, useState } from 'react';
import type { Video } from '@features/learning/types';
import { usePlayer } from '@shared/hooks/usePlayer';

export type VideoUI = Video & {
  isUnlocked: boolean;
  isCompleted: boolean;
};

interface UseVideoDetailParams {
  topicId: number;
  videoId: number;
}

export function useVideoDetail({ topicId, videoId }: UseVideoDetailParams) {
  const queryClient = useQueryClient();
  const [showQuiz, setShowQuiz] = useState(false);
  const { addXp, syncFromProfile } = usePlayer();

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

  const videoUI: VideoUI | null =
    topicVideosUI.find((v) => v.id === videoId) ?? null;

  const { mutate: claimXpApi, isPending } = useMutation({
    mutationFn: () => videoService.completeVideo(videoId),
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(['profile'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      queryClient.setQueryData<Video[]>(
        ['topic-videos', topicId],
        (old) =>
          old?.map((v) =>
            v.id === videoId ? { ...v, isCompleted: false } : v,
          ),
      );

      if (videoUI) addXp(videoUI.xpReward);
      await syncFromProfile();
    },
  });

  const handleClaimXP = useCallback(async () => {
    if (isPending || !videoUI) return;
    await claimXpApi();
  }, [isPending, claimXpApi, videoUI]);

  return {
    video: videoUI,
    topicVideos: topicVideosUI,
    loading: loadingTopicVideos,
    isCompleted: !!videoUI?.isCompleted,
    isClaiming: isPending,
    showQuiz,
    handleClaimXP,
    startQuiz: () => setShowQuiz(true),
  };
}
