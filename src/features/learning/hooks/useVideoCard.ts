import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import type { Video } from '@/features/learning/types';

export function useVideoCard(video: Video) {
  const navigate = useNavigate();

  const isLocked =
    video.level !== 'EASY' ||
    video.isUnlocked !== undefined
      ? !video.isUnlocked
      : video.unlockCost > 0;

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

  return {
    isLocked,
    levelConfig,
    goToVideo,
  };
}
