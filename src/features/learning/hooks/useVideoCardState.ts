import type { Video } from '@features/learning/types';

export const useVideoCardState = (video: Video) => {
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

  return {
    isLocked,
    isCompleted,
    levelConfig,
  };
};
