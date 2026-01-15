import { UI_LABELS, ROUTES } from '@shared/constants';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGES } from '@shared/constants/image';
import { useMemo } from 'react';
import React from 'react';
import { Text, getProgressStyle } from '@shared/components/common';

interface TopicProps {
  thumbnailUrl: string;
  name: string;
  description: string;
  totalVideos: number;
  totalTime: number;
  completedVideos: number;
  topicId: number;
}

export const TopicCard = React.memo(({
  thumbnailUrl,
  name,
  description,
  totalVideos,
  totalTime,
  completedVideos,
  topicId,
}: TopicProps) => {
  const progressPercent = totalVideos > 0 ? (completedVideos / totalVideos * 100) : 0;
  const progressStyle = useMemo(() => getProgressStyle(progressPercent), [progressPercent]);

  return (
    <Link to={ROUTES.LISTVIDEO.replace(':topicId', String(topicId))} className="block">
      <div className="
        bg-white rounded-2xl shadow-lg overflow-hidden
        hover:scale-105 transition-transform duration-300
        cursor-pointer w-full"
      >
        <div className="w-full h-32">
          <img
            src={thumbnailUrl || DEFAULT_IMAGES.THUMBNAIL}
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
              {UI_LABELS.LEARNING.LESSONS}: {totalVideos}
            </Text>
            <Text variant="caption" color="muted">
              {UI_LABELS.LEARNING.TIME}: {totalTime}{UI_LABELS.LEARNING.UNIT_HOUR}
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
});

export default TopicCard;
