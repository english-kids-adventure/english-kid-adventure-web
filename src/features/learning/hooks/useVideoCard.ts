import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import type { Video } from '@features/learning/types';
import { useUnlockVideo } from '@features/learning/hooks/useUnlockVideo';

export function useVideoCard( video: Video, onUnlocked?: (videoId: number) => void ) {
  const navigate = useNavigate();

  const isLocked =
    video.level !== 'EASY' ||
    video.isUnlocked !== undefined
      ? !video.isUnlocked
      : video.unlockCost > 0;

  const isCompleted = !!video.isCompleted;

  const levelConfig = {
    EASY: {
      text: 'Easy',
      bgColor: 'bg-green-200',
      textColor: 'text-green-700',
    },
    MEDIUM: {
      text: 'Medium',
      bgColor: 'bg-yellow-200',
      textColor: 'text-yellow-700',
    },
    HARD: {
      text: 'Hard',
      bgColor: 'bg-red-200',
      textColor: 'text-red-700',
    },
  }[video.level];

  const goToVideo = () => {
    navigate(
      ROUTES.VIDEO_DETAIL
        .replace(':topicId', String(video.topicId))
        .replace(':videoId', String(video.id)),
    );
  };

  const { handleUnlock, loading } = useUnlockVideo(
    video.id,
    onUnlocked,
  );

  return {
    isLocked,
    isCompleted,
    levelConfig,
    goToVideo,
    handleUnlock,
    unlocking: loading,
  };
}
