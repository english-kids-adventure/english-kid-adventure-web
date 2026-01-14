import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import { useCallback, useState } from 'react';
import type { Video, VideoItem, ProfileResponse } from '@features/learning/types';
import { usePlayer } from '@shared/hooks/usePlayer';

export type VideoUI = VideoItem;

interface UseVideoDetailParams {
  topicId: number;
  videoId: number;
}

export function useVideoDetail({ topicId, videoId }: UseVideoDetailParams) {
  const queryClient = useQueryClient();
  const [showQuiz, setShowQuiz] = useState(false);
  const { addXp } = usePlayer();

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
      queryClient.setQueryData(['profile'], (old: ProfileResponse | undefined) => {
        if (!old?.data) return updatedUser;

        return {
          ...old,
          data: {
            ...old.data,
            total_xp: updatedUser.totalXp,
            total_stars: updatedUser.totalStars,
            current_streak: old.data.current_streak,
            longest_streak: old.data.longest_streak,
            completed_days: old.data.completed_days,
          },
        };
      });

      queryClient.setQueryData<Video[]>(
        ['topic-videos', topicId],
        (old) =>
          old?.map((v) =>
            v.id === videoId ? { ...v, isCompleted: true } : v,
          ),
      );

      if (videoUI) addXp(videoUI.xpReward);
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
