import { Lock } from 'lucide-react';
import { Heading, LevelBadge, Text } from '@shared/components/common';
import type { VideoItem } from '@pages/VideoDetail';

interface LevelConfig {
  text: string;
  bgColor: string;
  textColor: string;
}

type LevelConfigMap = Record<VideoItem['level'], LevelConfig>;

interface Props {
  topicVideos: VideoItem[];
  currentVideoId: string;
  levelConfigMap: LevelConfigMap;
  onSelect: (id: string) => void;
}

export const TopicLessonSidebar = ({
  topicVideos,
  currentVideoId,
  levelConfigMap,
  onSelect,
}: Props) => {
  return (
    <div className="space-y-5">
      <Heading level={3} color="primary">
        More Lessons In Topic
      </Heading>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-100 pr-2 hide-scrollbar">
        {topicVideos.map((item, index) => {
          const isActive = item.id === currentVideoId;
          const itemLevel = levelConfigMap[item.level];

          const vId = item.url.match(
            /(?:v=|\/embed\/|youtu\.be\/)([^?&]+)/,
          )?.[1];

          return (
            <div
              key={item.id}
              onClick={() => item.isUnlocked && onSelect(item.id)}
              className={`relative flex gap-4 p-2 rounded-lg
                ${
            !item.isUnlocked
              ? 'cursor-not-allowed bg-gray-50 opacity-60'
              : isActive
                ? 'bg-white border-2 border-blue-400 shadow-md'
                : 'bg-white hover:shadow-sm'
            }`}
            >
              <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-gray-200">
                <img
                  src={`https://img.youtube.com/vi/${vId}/mqdefault.jpg`}
                  className={`w-full h-full object-cover ${
                    !item.isUnlocked ? 'blur-[2px]' : ''
                  }`}
                  alt={item.title}
                />

                {!item.isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Lock size={20} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center flex-1 min-w-0 py-1">
                <div>
                  <Text as='p' color='muted'>
                    Lesson {index + 1}
                  </Text>

                  <Heading level={6} color='primary'
                    className={`font-bold line-clamp-2 break-words leading-tight ${
                      isActive ? 'text-blue-500' : 'text-slate-700'
                    }`}
                  >
                    {item.title}
                  </Heading>
                </div>
                <div className="flex justify-start mt-1">
                  <LevelBadge
                    text={itemLevel.text}
                    textSize="text-xs"
                    bgColor={itemLevel.bgColor}
                    textColor={itemLevel.textColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
