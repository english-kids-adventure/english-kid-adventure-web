import { Star, Flame, Layers } from 'lucide-react';

import StatCard from '@/features/learning/components/StatCard';
import TopicCard from '@/features/learning/components/TopicCard';
import Text from '@/shared/components/common/Text';
import DotsLoading from '@/features/learning/components/DotsLoading';
import { topicService } from '@/features/learning/services/topicService';
import type { Topic } from '@/features/learning/types/topic';
import { useInfiniteCursor } from '@/shared/hooks/useInfiniteCursor';
import { CURSOR_PAGINATION } from '@/shared/constants/cursorPagination';

export default function Home() {
  const {
    items: topics,
    loading,
    error,
    hasMore,
    loadMoreRef,
  } = useInfiniteCursor<Topic, number>({
    fetchFn: async ({ cursor }) => {
      const res = await topicService.getAll({
        limit: CURSOR_PAGINATION.LIMIT,
        cursor,
      });

      return {
        items: res.topics,
        nextCursor: res.nextCursor,
      };
    },
    getKey: (topic) => topic.topicId,
  });
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">

        <div className="bg-btn-primary rounded-3xl p-8 md:p-12 mb-8 shadow-xl">
          <Text className="text-4xl font-bold" color="default">
            Welcome to English Kids Adventure!
          </Text>

          <Text as="p" variant="subtitle" className="mt-4 mb-8" color="default">
            Choose a topic to start your fun English learning journey
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard icon={<Layers />} value={30} label="Topics" />
            <StatCard icon={<Star />} value={50} label="Your Stars" />
            <StatCard icon={<Flame />} value={5} label="Days in a Row" />
          </div>
        </div>

        <Text as="p" className="text-2xl font-bold mb-6" color="primary">
          Your Topics
        </Text>

        {error && (
          <Text className="text-red-500 mb-4">
            {error}
          </Text>
        )}

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
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

        {!hasMore && (
          <Text as='p' color='primary' align='center' variant='body' className='mt-4'>
            You have reached the end
          </Text>
        )}
      </div>
    </main>
  );
}
