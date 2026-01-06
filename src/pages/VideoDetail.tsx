import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '@shared/components/common/BackButton';
import { VideoPlayer } from '@features/learning/components/VideoPlayer';
import { Loading } from '@shared/components/common/Loading';
import Text from '@shared/components/common/Text';
import { useVideoDetail } from '@features/learning/hooks/useVideoDetail';
import { useQuizAvailability } from '@features/quiz/hooks/useQuizAvailability';
import Button from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants/routes';

const VideoDetail = () => {
  const { topicId, videoId } = useParams<{
    topicId: string
    videoId: string
  }>();

  const navigate = useNavigate();

  const { video, loading } = useVideoDetail({
    topicId,
    videoId,
  });

  const {
    canStart,
    loading: quizLoading,
    error,
  } = useQuizAvailability(videoId ? Number(videoId) : undefined);

  if (loading) return <Loading />;

  if (!video) {
    return (
      <Text align="center" color="muted">
        The lesson could not be found!
      </Text>
    );
  }

  const handleStartQuiz = () => {
    if (!canStart) return;

    navigate(
      ROUTES.QUIZ
        .replace(':topicId', topicId || '')
        .replace(':orderIndex', videoId || ''),
    );
  };

  return (
    <div className="max-w-5xl p-4 space-y-4">
      <BackButton />

      <div className="w-full aspect-video max-h-[calc(100vh-6rem)] rounded-xl overflow-hidden shadow-lg">
        <VideoPlayer url={video.url} />
      </div>

      <Button
        variant="primary"
        disabled={!canStart || quizLoading}
        onClick={handleStartQuiz}
        className={!canStart ? 'opacity-60 cursor-not-allowed' : ''}
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default VideoDetail;
