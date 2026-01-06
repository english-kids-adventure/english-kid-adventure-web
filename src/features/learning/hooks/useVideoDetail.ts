import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import { useCallback, useState } from 'react';
import type { Video } from '@features/learning/types';
import { usePlayer } from '@shared/hooks/usePlayer';

export function useVideoDetail({
  topicId,
  videoId,
}: {
  topicId: string;
  videoId: string;
}) {
  const queryClient = useQueryClient();
  const [showQuiz, setShowQuiz] = useState(false);
  const { addXp, syncFromProfile } = usePlayer();

  const topicIdNum = Number(topicId);
  const videoIdNum = Number(videoId);

  const { data: topicVideos = [], isLoading: loadingTopicVideos } = useQuery<Video[]>({
    queryKey: ['topic-videos', topicIdNum],
    queryFn: () => videoService.getVideosByTopic(topicIdNum),
    enabled: !!topicIdNum,
  });

  const video = topicVideos.find((v) => v.id === videoIdNum) ?? null;

  const { mutate: claimXpApi, isPending } = useMutation({
    mutationFn: () => videoService.completeVideo(videoIdNum),
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(['profile'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      queryClient.setQueryData<Video[]>(['topic-videos', topicIdNum], (old) =>
        old?.map((v) =>
          v.id === videoIdNum ? { ...v, isCompleted: true } : v,
        ),
      );

      if (video) {
        addXp(video.xpReward);
      }

      await syncFromProfile();
    },
  });

  const handleClaimXP = useCallback(async() => {
    if (isPending || !video) return;
    await claimXpApi();
  }, [isPending, claimXpApi, video]);

  return {
    video,
    topicVideos,
    loading: loadingTopicVideos,
    isCompleted: !!video?.isCompleted,
    isClaiming: isPending,
    showQuiz,
    handleClaimXP,
    startQuiz: () => setShowQuiz(true),
  };
}
