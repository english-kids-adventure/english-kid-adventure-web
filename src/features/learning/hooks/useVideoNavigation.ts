import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import type { Video } from '@features/learning/types';

export const useVideoNavigation = (video: Video) => {
  const navigate = useNavigate();

  const goToVideo = () => {
    navigate(
      ROUTES.VIDEO_DETAIL
        .replace(':topicId', String(video.topicId))
        .replace(':videoId', String(video.id)),
    );
  };

  return { goToVideo };
};
