import { Star, Flame, Layers } from 'lucide-react';
import StatCard from '@features/learning/components/StatCard';
import TopicCard from '@features/learning/components/TopicCard';
import Text from '@shared/components/common/Text';
import DotsLoading from '@features/learning/components/DotsLoading';
import { Heading } from '@shared/components/common/Heading';
import { useTopic } from '@features/learning/hooks/useTopic';
import { useEffect, useRef } from 'react';
import { useStreak } from '@features/profile';
import { usePlayer } from '@shared/hooks/usePlayer';

export default function Home() {
  const {
    topics,
    loading,
    error,
    hasMore,
    loadMore,
  } = useTopic();

  const { totalStars } = usePlayer();
  const { streakData } = useStreak();
  const { currentStreak } = streakData;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">

        <div className="bg-btn-primary rounded-3xl p-8 md:p-12 mb-8 shadow-xl">
          <Heading level={1} color="default">
            Welcome to English Kids Adventure!
          </Heading>
          <Text as="p" variant="subtitle" className="mt-4 mb-8" color="default">
            Choose a topic to start your fun English learning journey
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Layers />} value={30} label="Topics" />
            <StatCard icon={<Star />} value={totalStars} label="Your Stars" />
            <StatCard icon={<Flame />} value={currentStreak} label="Days in a Row" />
          </div>
        </div>

        <Heading level={3} className="mb-6" color="primary">
          Your Topics
        </Heading>

        {error && (
          <Text className="text-red-500 mb-4">{error}</Text>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <TopicCard
              key={topic.topicId}
              topicId={topic.topicId}
              thumbnailUrl={topic.thumbnailUrl}
              name={topic.name}
              description={topic.description}
              totalVideos={topic.progress.totalVideos}
              progressPercent={topic.progress.completedVideos}
              totalTime={100}
            />
          ))}
        </div>

        {hasMore && <div ref={loadMoreRef} className="h-10" />}

        {loading && <DotsLoading />}

        {!hasMore && !loading && (
          <Text as="p" align="center" className="mt-10" color="primary">
            You have reached the end
          </Text>
        )}
      </div>
    </main>
  );
}

