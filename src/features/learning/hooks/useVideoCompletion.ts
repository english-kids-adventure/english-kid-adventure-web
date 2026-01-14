import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import type { ProfileData } from '@features/profile/types/profile';
import type { VideoUI } from './useTopicVideos';

export const useVideoCompletion = (videoId: number, topicId: number) => {
  const queryClient = useQueryClient();

  const { mutate: claimXpApi, isPending } = useMutation({
    mutationFn: () => videoService.completeVideo(videoId),
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(['profile'], (old: { data: ProfileData } | undefined) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: {
            ...old.data,
            total_xp: updatedUser.totalXp,
            total_stars: updatedUser.totalStars,
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: ['profile'] });

      queryClient.setQueryData(
        ['topic-videos', topicId],
        (old: VideoUI[]) =>
          old?.map((v) =>
            v.id === videoId ? { ...v, isCompleted: true } : v,
          ),
      );
    },
  });

  return {
    claimXp: claimXpApi,
    isClaiming: isPending,
  };
};
