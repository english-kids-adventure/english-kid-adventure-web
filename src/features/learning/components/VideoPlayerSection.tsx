import { ClipboardCheck } from 'lucide-react';
import { LevelBadge, Button, Text } from '@shared/components/common';
import { VideoPlayer } from '@features/learning/components/VideoPlayer';
import type { VideoItem } from '@features/learning/types';

interface LevelConfig {
  text: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  video: VideoItem;
  videoLevel: LevelConfig;
  isCompleted: boolean;
  canStart: boolean;
  quizLoading: boolean;
  quizError?: string | null;
  onClaimXP: () => void;
  onStartQuiz: () => void;
}

export const VideoPlayerSection = ({
  video,
  videoLevel,
  isCompleted,
  canStart,
  quizLoading,
  quizError,
  onClaimXP,
  onStartQuiz,
}: Props) => {
  const getButtonText = () => {
    if (quizLoading) return 'Loading...';

    if (quizError === 'No quiz') {
      return 'No quiz';
    }

    if (!canStart) {
      return 'No attempts left';
    }

    return 'Start quiz';
  };

  const isDisabled =
    quizLoading ||
    quizError === 'No quiz' ||
    !canStart;

  return (
    <div className="space-y-6 text-left">
      <div className="overflow-hidden bg-slate-100">
        <VideoPlayer
          url={video.url}
          level={video.level}
          xpReward={video.xpReward ?? 0}
          isCompleted={isCompleted}
          onProgressReached={onClaimXP}
        />
      </div>

      <div className="px-4 space-y-4">
        <div className="flex justify-between items-center gap-6">
          <LevelBadge
            text={`${videoLevel.text} Level`}
            bgColor={videoLevel.bgColor}
            textColor={videoLevel.textColor}
          />

          <Button
            variant="primary"
            disabled={isDisabled}
            onClick={onStartQuiz}
            icon={<ClipboardCheck size={18} />}
            className={
              isDisabled
                ? 'opacity-60 cursor-not-allowed bg-gray-500 hover:bg-gray-600'
                : ''
            }
          >
            {getButtonText()}
          </Button>
        </div>

        <Text as="p" variant="subtitle" color="muted">
          {video.title}
        </Text>
      </div>
    </div>
  );
};
