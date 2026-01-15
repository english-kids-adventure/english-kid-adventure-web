import { useCallback } from 'react';
import { useVideoCompletion } from '@features/learning/hooks/useVideoCompletion';
import { usePlayer } from '@shared/hooks/usePlayer';
import type { VideoUI } from '@features/learning/hooks/useVideoData';

export const useVideoClaimLogic = ({
  videoId,
  topicId,
  videoUI,
}: {
  videoId: number;
  topicId: number;
  videoUI: VideoUI | null;
}) => {
  const { addXp } = usePlayer();
  const { claimXp, isClaiming } = useVideoCompletion(videoId, topicId);

  const handleClaimXP = useCallback(async () => {
    if (isClaiming || !videoUI) return;
    await claimXp();
    if (videoUI) addXp(videoUI.xpReward);
  }, [isClaiming, claimXp, videoUI, addXp]);

  return {
    handleClaimXP,
    isClaiming,
  };
};
