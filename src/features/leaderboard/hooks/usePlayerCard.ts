import { Trophy, Award, Medal, type LucideIcon } from 'lucide-react';
import { DEFAULT_IMAGES } from '@shared/constants/image';

interface Player {
  rank?: number;
  name: string;
  xp: number;
  color: string;
  avatarUrl: string;
}

export const usePlayerCard = (
  player: Player,
  isTopThree?: boolean,
) => {
  const avatarSrc =
    player.avatarUrl?.trim() || DEFAULT_IMAGES.AVATAR;

  const isTop1 = player.rank === 1;

  const heightClass =
    player.rank === 1
      ? 'h-54'
      : player.rank === 2
        ? 'h-46'
        : 'h-40';

  const getRankIconType = (
    rank?: number,
  ): LucideIcon | null => {
    switch (rank) {
      case 1:
        return Trophy;
      case 2:
        return Medal;
      case 3:
        return Award;
      default:
        return null;
    }
  };

  const RankIcon = player.rank
    ? getRankIconType(player.rank)
    : null;

  const avatarStyle = isTop1
    ? { animation: 'top1-float 1.5s ease-in-out infinite' }
    : undefined;

  return {
    avatarSrc,
    isTopThree,
    heightClass,
    RankIcon,
    avatarStyle,
  };
};
