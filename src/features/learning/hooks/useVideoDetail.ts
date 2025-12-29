import { useEffect, useState } from 'react';
import { videoService } from '@/features/learning/services/videoService';
import type { Video } from '@/features/learning/types';

interface Params {
  topicId?: string;
  orderIndex?: string;
}

export function useVideoDetail({ topicId, orderIndex }: Params) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topicId || !orderIndex) return;

    setLoading(true);

    videoService
      .getVideosByTopic(Number(topicId))
      .then((videos) => {
        const found = videos.find(
          (v) => v.orderIndex === Number(orderIndex),
        );
        setVideo(found ?? null);
      })
      .finally(() => setLoading(false));
  }, [topicId, orderIndex]);

  return { video, loading };
}
