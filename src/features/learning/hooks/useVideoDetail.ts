import { useVideoData } from '@features/learning/hooks/useVideoData';
import { useVideoQuiz } from '@features/learning/hooks/useVideoQuiz';
import { useVideoClaimLogic } from '@features/learning/hooks/useVideoClaimLogic';

export type { VideoUI } from '@features/learning/hooks/useVideoData';

export const useVideoDetail = ({ topicId, videoId }: { topicId: number; videoId: number }) => {
  const videoData = useVideoData({ topicId, videoId });
  const quizState = useVideoQuiz();
  const claimLogic = useVideoClaimLogic({
    videoId,
    topicId,
    videoUI: videoData.video,
  });

  return {
    ...videoData,
    ...quizState,
    ...claimLogic,
  };
};
