import { useParams } from 'react-router-dom';
import { BackButton } from '@shared/components/common/BackButton';
import { VideoPlayer } from '@features/learning/components/VideoPlayer';
import { Loading } from '@shared/components/common/Loading';
import Text from '@shared/components/common/Text';
import { useVideoDetail } from '@features/learning/hooks/useVideoDetail';

const VideoDetail = () => {
  const { topicId, videoId } = useParams<{
    topicId: string;
    videoId: string;
  }>();

  const { video, loading } = useVideoDetail({ topicId, videoId });

  if (loading) return <Loading />;

  if (!video) {
    return (
      <Text align="center" color="muted">
        The lesson could not be found!
      </Text>
    );
  }

  return (
    <div className="max-w-5xl p-4 space-y-4">
      <BackButton />

      <div className="w-full aspect-video max-h-[calc(100vh-6rem)] rounded-xl overflow-hidden shadow-lg">
        <VideoPlayer url={video.url} />
      </div>
    </div>
  );
};

export default VideoDetail;
