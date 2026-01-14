import { useVideoData } from './useVideoData';
import { useVideoQuiz } from './useVideoQuiz';
import { useVideoClaimLogic } from './useVideoClaimLogic';

export type { VideoUI } from './useVideoData';

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
