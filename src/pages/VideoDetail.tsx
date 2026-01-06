import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '@shared/components/common/BackButton';
import { Loading } from '@shared/components/common/Loading';
import Text from '@shared/components/common/Text';
import { useVideoDetail } from '@features/learning/hooks/useVideoDetail';
import { useQuizAvailability } from '@features/quiz/hooks/useQuizAvailability';
import { ROUTES } from '@shared/constants/routes';

import { VideoPlayerSection } from '@features/learning/components/VideoPlayerSection';
import { TopicLessonSidebar } from '@features/learning/components/TopicLessonSidebar';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  level: 'EASY' | 'MEDIUM' | 'HARD';
  xpReward?: number;
  isUnlocked: boolean;
}

export const levelConfigMap: Record<
  VideoItem['level'],
  { text: string; bgColor: string; textColor: string }
> = {
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
};

const VideoDetail = () => {
  const { topicId, videoId } = useParams<{
    topicId: string;
    videoId: string;
  }>();

  const navigate = useNavigate();

  const {
    video,
    loading,
    isCompleted,
    handleClaimXP,
    topicVideos = [],
  } = useVideoDetail({
    topicId: topicId ?? '',
    videoId: videoId ?? '',
  }) as unknown as {
    video: VideoItem | null;
    loading: boolean;
    isCompleted: boolean;
    handleClaimXP: () => void;
    startQuiz: () => void;
    topicVideos: VideoItem[];
  };

  const { canStart, loading: quizLoading } =
    useQuizAvailability(videoId ? Number(videoId) : undefined);

  if (loading) return <Loading />;

  if (!video) {
    return (
      <Text align="center" color="muted">
        The lesson could not be found!
      </Text>
    );
  }
  const videoLevel = levelConfigMap[video.level];

  const handleStartQuiz = () => {
    if (!canStart) return;

    navigate(
      ROUTES.QUIZ
        .replace(':topicId', topicId || '')
        .replace(':orderIndex', videoId || ''),
    );
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
              navigate(`/topics/${topicId}/lessons/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
