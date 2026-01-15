import { Heading, Text } from '@shared/components/common';
import { usePlayerCard } from '@features/leaderboard/hooks/usePlayerCard';
import { DEFAULT_IMAGES } from '@shared/constants/image';

interface PlayerCardProps {
  player: {
    rank?: number;
    name: string;
    xp: number;
    color: string;
    avatarUrl: string;
  };
  isTopThree?: boolean;
}

const PlayerCard = ({ player, isTopThree }: PlayerCardProps) => {
  const {
    avatarSrc,
    heightClass,
    RankIcon,
    avatarStyle,
  } = usePlayerCard(player, isTopThree);

  if (isTopThree) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg"
          style={avatarStyle}
        >
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

        <div
          className={`${player.color} ${heightClass} w-48 rounded-xl shadow-xl flex flex-col items-center justify-center text-white`}
        >
          {RankIcon && (
            <RankIcon className="mb-2 h-9 w-9" />
          )}

          <Heading
            level={4}
            align="center"
            className="text-white"
          >
            {player.name}
          </Heading>

          <Text
            variant="caption"
            align="center"
            className="mt-1 opacity-90"
          >
            {player.xp} XP
          </Text>
        </div>

        <style>
          {`
            @keyframes top1-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className={`${player.color} rounded-lg px-4 py-3 text-white shadow-md`}
    >
      <Heading level={6} className="text-white">
        {player.name}
      </Heading>

      <Text variant="caption">
        {player.xp} XP
      </Text>
    </div>
  );
};

export default PlayerCard;

