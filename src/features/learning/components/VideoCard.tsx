import { Play, Lock, Star } from 'lucide-react';
import { LevelBadge } from '@/shared/components/common/LevelBadge';
import Button from '@/shared/components/common/Button';
import { Heading } from '@/shared/components/common/Heading';
import Text from '@/shared/components/common/Text';
import { getYoutubeThumbnail } from '@/shared/utils/youtube';
import type { Video } from '@/features/learning/types';
import { useVideoCard } from '@/features/learning/hooks/useVideoCard';

interface Props {
  video: Video;
  onUnlocked?: (videoId: number) => void;
}

export function VideoCard({ video }: Props) {
  const { isLocked, levelConfig, goToVideo } =
    useVideoCard(video);

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
              Lesson {video.orderIndex}
            </Text>
          </div>

          <Heading level={4} color='primary'>{video.title}</Heading>

          <div className="flex items-center gap-4">
            <Text variant="small" color="muted" className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              {video.xpReward} XP
            </Text>

            {isLocked && (
              <Text variant="small" color="danger" className="flex items-center gap-1">
                <Lock size={15} />
                {video.unlockCost} star
              </Text>
            )}
          </div>
        </div>

        <div className="self-center">
          {isLocked ? (
            <Button variant="warning" icon={<Lock size={16} />}>
              Unlock
            </Button>
          ) : (
            <Button icon={<Play size={16} />} onClick={goToVideo}>
              Start
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
