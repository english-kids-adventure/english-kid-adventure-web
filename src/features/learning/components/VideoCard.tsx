import { Play, Lock, Sparkles } from 'lucide-react';
import { LevelBadge, Heading, Text, Button } from '@shared/components/common';
import { getYoutubeThumbnail } from '@shared/utils/youtube';
import type { Video } from '@features/learning/types';
import { useVideoCard } from '@features/learning/hooks/useVideoCard';
import { UI_LABELS } from '@shared/constants';
import { toast } from 'react-toastify';

interface Props {
  video: Video;
  onUnlocked?: (videoId: number) => void;
}

export function VideoCard({ video, onUnlocked }: Props) {
  const {
    isLocked,
    isCompleted,
    levelConfig,
    goToVideo,
    handleUnlock,
    unlocking,
  } = useVideoCard(video, onUnlocked);

  const onUnlockClick = async () => {
    const result = await handleUnlock();

    if (!result.success) {
      toast.error('Not enough stars!');
      return;
    }

    toast.success('Video unlocked!');
  };

  return (
    <div className="flex gap-4 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
      <div className="relative w-32 h-24 shrink-0 rounded-xl overflow-hidden">
        <img
          src={getYoutubeThumbnail(video.url)}
          alt={video.title}
          className={`w-full h-full object-cover ${isLocked ? 'blur-sm' : ''}`}
        />
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Lock size={24} className="text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 flex justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LevelBadge {...levelConfig} />
            <Text variant="small" color="muted">
              {UI_LABELS.LEARNING.LESSON_PREFIX} {video.orderIndex}
            </Text>
          </div>

          <Heading level={4} color='primary'>{video.title}</Heading>

          <div className="flex items-center gap-4">
            <Text variant="small" color="muted" className="flex items-center gap-1">
              <Sparkles size={16} className="text-yellow-500" />
              {video.xpReward} {UI_LABELS.LEARNING.XP_UNIT}
            </Text>

            {isLocked && (
              <Text variant="small" color="danger" className="flex items-center gap-1">
                <Lock size={15} />
                {video.unlockCost} {UI_LABELS.LEARNING.STARS_UNIT}
              </Text>
            )}
          </div>
        </div>

        <div className="self-center">
          {isLocked ? (
            <Button variant="warning" icon={<Lock size={16} />} onClick={onUnlockClick} disabled={unlocking}>
              {UI_LABELS.LEARNING.UNLOCK}
            </Button>
          ) : (
            <Button icon={<Play size={16} />} onClick={goToVideo}>
              {isCompleted ? UI_LABELS.LEARNING.RESTART : UI_LABELS.LEARNING.START}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
