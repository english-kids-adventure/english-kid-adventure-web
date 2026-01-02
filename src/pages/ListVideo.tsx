import { useParams } from 'react-router-dom';
import { BackButton } from '@/shared/components/common/BackButton';
import { VideoCard } from '@/features/learning/components/VideoCard';
import { Loading } from '@/shared/components/common/Loading';
import { Heading } from '@/shared/components/common/Heading';
import Text from '@/shared/components/common/Text';
import { useListVideo } from '@/features/learning/hooks/useListVideo';

const ListVideo = () => {
  const { topicId } = useParams<{ topicId: string }>();

  const { videos, topic, loading } =
  useListVideo(topicId);

  if (loading) return <Loading />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <BackButton />

        {topic && (
          <div className="flex items-center gap-5">
            <img
              src={topic.thumbnailUrl || 'https://i.pinimg.com/736x/ed/0b/16/ed0b1667b743c8a393f97e61d13980d1.jpg'}
              alt={topic.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="space-y-1">
              <Heading level={2} color="secondary">
                {topic.name}
              </Heading>
              <Text color="muted">{topic.description}</Text>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar">
        {videos.length === 0 ? (
          <Text align="center" color="muted">
            There are no videos yet!
          </Text>
        ) : (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListVideo;

