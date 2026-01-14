import { useParams } from 'react-router-dom';
import { BackButton } from '@shared/components/common/BackButton';
import { VideoCard } from '@features/learning/components/VideoCard';
import { Loading } from '@shared/components/common/Loading';
import { Heading } from '@shared/components/common/Heading';
import Text from '@shared/components/common/Text';
import { useListVideo } from '@features/learning/hooks/useListVideo';
import { DEFAULT_IMAGES } from '@shared/constants/image';
import type { VideoItem } from '@features/learning/types';

const ListVideo = () => {
  const { topicId } = useParams<{ topicId: string }>();

  const { videos, topic, loading, handleUnlocked } =
  useListVideo(topicId);

  if (loading) return <Loading />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <BackButton />

        {topic && (
          <div className="flex items-center gap-5">
            <img
              src={topic.thumbnailUrl || DEFAULT_IMAGES.THUMBNAIL}
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
          <Text as="p" align="center" color="muted">
            There are no videos yet!
          </Text>
        ) : (
          videos.map((video: VideoItem) => (
            <VideoCard
              key={video.id}
              video={video}
              onUnlocked={handleUnlocked}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListVideo;
