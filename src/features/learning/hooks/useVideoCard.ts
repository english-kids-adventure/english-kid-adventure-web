import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';
import type { Video } from '@features/learning/types';
import { videoService } from '@features/learning/services/videoService';

export function useVideoCard(
  video: Video,
  onUnlocked?: (videoId: number) => void,
) {
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

  const { mutate: unlock, isPending } = useMutation({
    mutationFn: () =>
      videoService.unlockVideo(video.id),
    onSuccess: () => {
      toast.success('Video unlocked!');
      onUnlocked?.(video.id);
    },
    onError: () => {
      toast.error('Not enough stars!');
    },
  });

  return {
    isLocked,
    levelConfig,
    goToVideo,
    unlock,
    unlocking: isPending,
  };
}
