import { Star } from 'lucide-react';
import { Heading, Text } from '@shared/components/common';
import { useRankedPlayerItem } from '@features/leaderboard/hooks/useRankedPlayerItem';
import { DEFAULT_IMAGES } from '@shared/constants/image';

interface Props {
  player: {
    rank: number
    name: string
    xp: number
    bonus: number | null
    isCurrentUser?: boolean
    showYouBadge?: boolean
    avatarUrl: string
  }
}

const RankedPlayerItem = ({ player }: Props) => {
  const { avatarSrc, borderClass, bg, Icon } =
    useRankedPlayerItem(player);

  return (
    <div
      className={`
        bg-white ${borderClass}
        rounded-2xl
        px-8 py-5
        flex items-center justify-between
        w-full max-w-4xl mx-auto
        transition
      `}
    >
      <div className="flex items-center gap-5">

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${bg}`}
        >
          {Icon ? <Icon className="w-5 h-5" /> : `#${player.rank}`}
        </div>

        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border">
          <img
            src={avatarSrc}
            alt={player.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGES.AVATAR;
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Heading level={4} color="primary">
              {player.name}
            </Heading>

            {player.showYouBadge && (
              <span className="bg-blue-500 text-white text-sm px-3 py-0.5 rounded-full font-semibold">
                You
              </span>
            )}
          </div>

          <Text variant="caption" color="muted">
            {player.xp} XP
          </Text>
        </div>
      </div>

      {player.bonus && (
        <div className="bg-yellow-400 text-white px-5 py-1 rounded-full flex items-center gap-1 h-9">
          +{player.bonus}
          <Star className="w-4 h-4 fill-white" />
        </div>
      )}
    </div>
  );
};

export default RankedPlayerItem;

