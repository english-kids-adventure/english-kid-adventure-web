import { useParams } from 'react-router-dom';
import { useYouTubePlayer } from '@features/learning/hooks/useYouTubePlayer';
import { useVideoProgress } from '@features/learning/hooks/useVideoProgress';
import { useRef } from 'react';

export function useLearningVideoPlayer(
  onProgressReached: () => void,
) {
  const { orderIndex } = useParams();
  const videoId = Number(orderIndex);

  const checkProgressRef = useRef<() => void>(() => {});

  const { playerRef } = useYouTubePlayer(() => {
    checkProgressRef.current();
  });

  const {
    canClaimXP,
    checkProgress,
    handleClaim,
  } = useVideoProgress(
    playerRef,
    videoId,
    onProgressReached,
  );

  checkProgressRef.current = checkProgress;

  return {
    canClaimXP,
    handleClaim,
  };
}
