import { RewardOverlay } from '@features/learning/components/RewardOverlay';
import { useYouTubePlayer } from '@features/learning/hooks/useYouTubePlayer';
import { useVideoProgress } from '@features/learning/hooks/useVideoProgress';
import type { VideoLevel } from '@features/learning/types';
import { useParams } from 'react-router-dom';

interface VideoPlayerProps {
  url: string;
  level: VideoLevel;
  xpReward: number;
  isCompleted: boolean;
  onProgressReached: () => void;
}

export function VideoPlayer({ url, xpReward, onProgressReached }: VideoPlayerProps) {
  const { playerRef } = useYouTubePlayer(() => checkProgress());

  const { orderIndex } = useParams<{
    topicId: string
    orderIndex: string
  }>();

  const videoId = Number(orderIndex);

  const { canClaimXP, checkProgress, handleClaim } = useVideoProgress(
    playerRef,
    videoId,
    onProgressReached,
  );

  const getEmbedUrl = (rawUrl: string): string => {
    const videoId = rawUrl.match(/(?:v=|\/embed\/|youtu\.be\/)([^?&]+)/)?.[1] ?? '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${origin}&rel=0&modestbranding=1`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-5">
      <div className="relative w-full aspect-video bg-slate-800 rounded-sm border-5 border-white shadow-2xl overflow-hidden shrink-0">

        {canClaimXP && <RewardOverlay onClaim={handleClaim} xpReward={xpReward} />}

        <iframe
          id="yt-player-iframe"
          className="w-full h-full"
          src={getEmbedUrl(url)}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
