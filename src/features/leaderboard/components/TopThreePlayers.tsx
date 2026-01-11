import PlayerCard from '@features/leaderboard/components/PlayerCard';
import { useLeaderboard } from '@features/leaderboard/hooks/useLeaderboard';
import { getPodiumOrder } from '@shared/utils/leaderboard';

const TopThreePlayers = () => {
  const { data } = useLeaderboard();
  if (!data) return null;

  const topThree = data.top_10.slice(0, 3);

  const podiumOrder = getPodiumOrder(topThree);

  return (
    <div className="flex items-end justify-center gap-10 mb-10 h-80">
      {podiumOrder.map((player) => (
        <PlayerCard
          key={player.user_id}
          isTopThree
          player={{
            rank: player.rank,
            name: player.name,
            xp: player.weekly_xp,
            avatarUrl: player.avatar_url,
            color:
              player.rank === 1
                ? 'bg-yellow-400'
                : player.rank === 2
                  ? 'bg-gray-400'
                  : 'bg-orange-500',
          }}
        />
      ))}
    </div>
  );
};

export default TopThreePlayers;

