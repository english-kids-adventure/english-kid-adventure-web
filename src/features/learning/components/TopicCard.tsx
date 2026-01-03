import { Text } from '@shared/components/common/Text';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGES } from '@/shared/constants/image';

interface TopicProps {
  thumbnailUrl: string;
  name: string;
  description: string;
  totalVideos: number;
  totalTime: number;
  progressPercent: number;
  topicId: number;
}

interface ProgressColors {
  bg: string;
  text: string;
}

const getProgressStyle = (progressPercent: number): ProgressColors => {
  if (progressPercent === 0) return { bg: 'bg-btn-secondary', text: 'text-muted' };
  if (progressPercent >= 1 && progressPercent <= 49) return { bg: 'bg-btn-danger', text: 'text-danger' };
  if (progressPercent >= 50 && progressPercent <= 79) return { bg: 'bg-btn-primary', text: 'text-primary' };
  if (progressPercent >= 80 && progressPercent <= 100) return { bg: 'bg-btn-success', text: 'text-success' };
  return { bg: 'bg-btn-secondary', text: 'text-muted' };
};

export function TopicCard({
  thumbnailUrl,
  name,
  description,
  totalVideos,
  totalTime,
  progressPercent,
  topicId,
}: TopicProps) {
  const progressStyle = getProgressStyle(progressPercent);

  return (
    <Link to={`/topics/${topicId}`} className="block">
      <div className="
        bg-white rounded-2xl shadow-lg overflow-hidden
        hover:scale-[1.02] transition-transform duration-300
        cursor-pointer w-full"
      >
        <div className="w-full h-32">
          <img
            src={thumbnailUrl || DEFAULT_IMAGES.thumbnail}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1.5 p-4">
          <Text variant="subtitle" truncate maxWidth="w-full" color="muted">
            {name}
          </Text>
          <Text variant="caption" truncate maxWidth="w-full" color="muted">
            {description}
          </Text>

          <div className="flex justify-between items-center text-sm font-medium mb-2">
            <Text variant="caption" color="muted">
              Lessons: {totalVideos}
            </Text>
            <Text variant="caption" color="muted">
              Time: {totalTime}h
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${progressStyle.bg} transition-all duration-300 rounded-full`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className={`font-bold text-xs ${progressStyle.text}`}>
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TopicCard;
