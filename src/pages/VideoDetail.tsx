import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '@shared/components/common/BackButton';
import { Loading } from '@shared/components/common/Loading';
import Text from '@shared/components/common/Text';
import { useVideoDetail } from '@features/learning/hooks/useVideoDetail';
import { useQuizAvailability } from '@features/quiz/hooks/useQuizAvailability';
import { ROUTES } from '@shared/constants/routes';

import { VideoPlayerSection } from '@features/learning/components/VideoPlayerSection';
import { TopicLessonSidebar } from '@features/learning/components/TopicLessonSidebar';

export const levelConfigMap = {
  EASY: { text: 'Easy', bgColor: 'bg-green-200', textColor: 'text-green-700' },
  MEDIUM: { text: 'Medium', bgColor: 'bg-yellow-200', textColor: 'text-yellow-700' },
  HARD: { text: 'Hard', bgColor: 'bg-red-200', textColor: 'text-red-700' },
} as const;

const VideoDetail = () => {
  const { topicId, videoId } = useParams<{ topicId: string; videoId: string }>();
  const navigate = useNavigate();

  const topicIdNum = Number(topicId);
  const videoIdNum = Number(videoId);

  const { video, loading, isCompleted, handleClaimXP, topicVideos = [] } = useVideoDetail({
    topicId: topicIdNum,
    videoId: videoIdNum,
  });

  const { canStart, loading: quizLoading, error: quizError } = useQuizAvailability(videoIdNum);

  if (loading) return <Loading />;
  if (!video) return <Text align="center" color="muted">The lesson could not be found!</Text>;

  const videoLevel = levelConfigMap[video.level];

  const handleStartQuiz = () => {
    if (!canStart) return;
    navigate(ROUTES.QUIZ.replace(':topicId', topicId || '').replace(':orderIndex', videoId || ''));
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
        <div className="lg:col-span-8">
          <VideoPlayerSection
            video={video}
            videoLevel={videoLevel}
            isCompleted={isCompleted}
            canStart={canStart}
            quizLoading={quizLoading}
            quizError={quizError}
            onClaimXP={handleClaimXP}
            onStartQuiz={handleStartQuiz}
          />
        </div>
        <div className="lg:col-span-4">
          <TopicLessonSidebar
            topicVideos={topicVideos}
            currentVideoId={video.id}
            levelConfigMap={levelConfigMap}
            onSelect={(id) =>
              navigate(
                ROUTES.VIDEO_DETAIL
                  .replace(':topicId', topicId || '')
                  .replace(':videoId', String(id)),
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
