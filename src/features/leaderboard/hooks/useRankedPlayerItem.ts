import { Trophy, Award, Medal } from 'lucide-react';
import { DEFAULT_IMAGES } from '@shared/constants/image';

interface PlayerMeta {
  rank: number
  avatarUrl: string
  isCurrentUser?: boolean
}

export const useRankedPlayerItem = (player: PlayerMeta) => {
  const avatarSrc =
    player.avatarUrl && player.avatarUrl.trim() !== ''
      ? player.avatarUrl
      : DEFAULT_IMAGES.AVATAR;

  const borderClass = player.isCurrentUser
    ? 'border-2 border-blue-500 shadow-lg'
    : 'border border-gray-200 shadow-sm';

  const getRankMeta = () => {
    switch (player.rank) {
      case 1:
        return { bg: 'bg-yellow-400', Icon: Trophy };
      case 2:
        return { bg: 'bg-gray-400', Icon: Medal };
      case 3:
        return { bg: 'bg-orange-500', Icon: Award };
      default:
        return { bg: 'bg-blue-500', Icon: null };
    }
  };

  return {
    avatarSrc,
    borderClass,
    ...getRankMeta(),
  };
};

