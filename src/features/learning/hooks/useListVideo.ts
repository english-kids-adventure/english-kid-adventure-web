import { useEffect, useState } from 'react';
import { videoService } from '@/features/learning/services/videoService';
import { topicService } from '@/features/learning/services/topicService';
import type { Video, Topic } from '@/features/learning/types';

export function useListVideo(topicId?: string) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUnlocked = (videoId: number) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId ? { ...v, is_unlocked: true } : v,
      ),
    );
  };

  useEffect(() => {
    if (!topicId) return;

    setLoading(true);

    Promise.all([
      videoService.getVideosByTopic(Number(topicId)),
      topicService.getAll(),
    ])
      .then(([videosRes, topicsRes]) => {
        setVideos(videosRes);

        const foundTopic = topicsRes.topics.find(
          (t: Topic) => t.topicId === Number(topicId),
        );

        setTopic(foundTopic ?? null);
      })
      .finally(() => setLoading(false));
  }, [topicId]);

  return {
    videos,
    topic,
    loading,
    handleUnlocked,
  };
}
