import { Star, Flame, Layers } from 'lucide-react';
import StatCard from '@features/learning/components/StatCard';
import TopicCard from '@features/learning/components/TopicCard';
import Text from '@shared/components/common/Text';
import { Heading } from '@shared/components/common/Heading';
import { useTopic } from '@features/learning/hooks/useTopic';
import { useStreak } from '@features/profile';
import { usePlayer } from '@shared/hooks/usePlayer';
import { Loading, PaginationControl } from '@shared/components/common';
import { PAGINATION } from '@shared/constants';

export const Home = () => {
  const {
    items: topics,
    loading,
    error,
    page,
    setPage,
    pagination,
  } = useTopic(PAGINATION.PAGE_OFFSET.PER_PAGE);

  const { totalStars } = usePlayer();
  const { streakData } = useStreak();
  const { currentStreak } = streakData;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">

        <div className="bg-btn-primary rounded-3xl p-8 md:p-12 mb-8 shadow-xl">
          <Heading level={1}>
            Welcome to English Kids Adventure!
          </Heading>

          <Text
            as="p"
            variant="subtitle"
            className="mt-4 mb-8"
          >
            Choose a topic to start your fun English learning journey
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Layers />} value={pagination?.total || 0} label="Topics" />
            <StatCard icon={<Star />} value={totalStars} label="Your Stars" />
            <StatCard icon={<Flame />} value={currentStreak} label="Days in a Row" />
          </div>
        </div>

        <Heading level={3} className="mb-6" color="primary">
          Your Topics
        </Heading>

        {error && (
          <Text className="text-red-500 mb-4">
            {error}
          </Text>
        )}

        {loading && (
          <Loading />
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

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <PaginationControl
              page={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
