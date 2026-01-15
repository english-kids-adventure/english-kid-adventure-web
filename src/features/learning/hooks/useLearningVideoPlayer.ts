import { useParams } from 'react-router-dom';
import { useYouTubePlayer } from '@features/learning/hooks/useYouTubePlayer';
import { useVideoProgress } from '@features/learning/hooks/useVideoProgress';
import { useRef } from 'react';

export const useVideoParams = () => {
  const { orderIndex } = useParams();
  const videoId = Number(orderIndex);

  return { videoId };
};

export const useLearningVideoPlayer = (onProgressReached: () => void) => {
  const { videoId } = useVideoParams();
  const checkProgressRef = useRef<() => void>(() => {});

  const { playerRef } = useYouTubePlayer(() => {
    checkProgressRef.current();
  });

  const { canClaimXP, checkProgress, handleClaim } = useVideoProgress(
    playerRef,
    videoId,
    onProgressReached,
  );

  checkProgressRef.current = checkProgress;

  return {
    canClaimXP,
    handleClaim,
  };
};
