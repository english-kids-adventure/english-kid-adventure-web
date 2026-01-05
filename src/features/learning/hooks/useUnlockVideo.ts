import { useMutation } from '@tanstack/react-query';
import { videoService } from '@features/learning/services/videoService';
import type { UnlockVideoResponse } from '../types';

interface UnlockResult {
  success: boolean;
  error?: unknown;
}

export const useUnlockVideo = ( videoId: number, onUnlocked?: (videoId: number) => void) => {
  const { mutateAsync, isPending } = useMutation<UnlockVideoResponse>({
    mutationFn: () => videoService.unlockVideo(videoId),
  });

  const handleUnlock = async (): Promise<UnlockResult> => {
    try {
      const res = await mutateAsync();

      if (res?.isUnlocked) {
        onUnlocked?.(videoId);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    handleUnlock,
    loading: isPending,
  };
};
