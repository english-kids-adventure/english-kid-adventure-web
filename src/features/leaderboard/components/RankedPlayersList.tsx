import RankedPlayerItem from '@features/leaderboard/components/RankedPlayerItem';
import { useLeaderboard } from '@features/leaderboard/hooks/useLeaderboard';

const RankedPlayersList = () => {
  const { data } = useLeaderboard();

  if (!data) return null;

  const meInTop10 = data.top_10.find((p) => p.is_me);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="space-y-3 w-full max-w-6xl mx-auto">
        {data.top_10.map((player) => (
          <RankedPlayerItem
            key={player.user_id}
            player={{
              rank: player.rank,
              name: player.name,
              xp: player.weekly_xp,
              bonus: player.reward_stars || null,
              isCurrentUser: player.is_me,
              showYouBadge: player.is_me,
              avatarUrl: player.avatar_url,
            }}
          />
        ))}
      </div>

      {!meInTop10 && data.my_rank && (
        <div className="w-full max-w-6xl mx-auto space-y-3">
          <div className="flex justify-center text-gray-400 text-3xl tracking-widest animate-pulse select-none">
            ...
          </div>

          <RankedPlayerItem
            player={{
              rank: data.my_rank.rank,
              name: 'You',
              xp: data.my_rank.weekly_xp,
              bonus: data.my_rank.reward_stars || null,
              isCurrentUser: true,
              showYouBadge: false,
              avatarUrl: '',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RankedPlayersList;
