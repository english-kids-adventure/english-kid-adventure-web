import { VideoPlayer } from '@features/learning/components/VideoPlayer';
import { useVideoDetail } from '@features/learning/hooks/useVideoDetail';

export function LearningContent({ topicId, videoId }: { topicId: string; videoId: string }) {
  const { video, loading, isCompleted, handleClaimXP } =
    useVideoDetail({ topicId, videoId });

  if (loading) return <div className="p-10 text-center text-blue-500 font-black text-2xl animate-pulse">LOADING...</div>;
  if (!video) return <div className="p-10 text-center text-slate-500">Video not found.</div>;

  return (
    <div className="w-full min-h-screen bg-slate-50 overflow-y-auto pb-20">
      <div className="w-full bg-slate-900 py-12 px-4 shadow-inner min-h-screen flex flex-col items-center">
        <VideoPlayer
          url={video.url}
          level={video.level}
          xpReward={video.xpReward}
          isCompleted={isCompleted}
          onProgressReached={handleClaimXP}
        />
      </div>
    </div>
  );
}
