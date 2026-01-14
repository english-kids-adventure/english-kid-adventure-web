import { RewardOverlay } from '@features/learning/components/RewardOverlay';
import type { VideoLevel } from '@features/learning/types';
import { getYoutubeEmbedUrl } from '@shared/utils/youtube';
import { useLearningVideoPlayer } from '@features/learning/hooks/useLearningVideoPlayer';

interface VideoPlayerProps {
  url: string;
  level: VideoLevel;
  xpReward: number;
  isCompleted: boolean;
  onProgressReached: () => void;
}

export const VideoPlayer = ({ url, xpReward, onProgressReached }: VideoPlayerProps) => {
  const {
    canClaimXP,
    handleClaim,
  } = useLearningVideoPlayer(onProgressReached);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-5">
      <div className="relative w-full aspect-video bg-slate-800 rounded-sm border-5 border-white shadow-2xl overflow-hidden shrink-0">

        {canClaimXP && <RewardOverlay onClaim={handleClaim} xpReward={xpReward} />}

        <iframe
          id="yt-player-iframe"
          className="w-full h-full"
          src={getYoutubeEmbedUrl(url)}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
