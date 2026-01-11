import { useLeaderboard } from '@features/leaderboard/hooks/useLeaderboard';
import LeaderboardIntro from '@features/leaderboard/components/LeaderBoardIntro';
import TopThreePlayers from '@features/leaderboard/components/TopThreePlayers';
import RankedPlayersList from '@features/leaderboard/components/RankedPlayersList';
import WeeklyRewards from '@features/leaderboard/components/WeeklyReward';
import { Loading } from '@shared/components/common/Loading';

const LeaderboardPage = () => {
  const { data, isLoading } = useLeaderboard();

  if (isLoading || !data) return <Loading />;

  return (
    <div>
      <LeaderboardIntro />

      <TopThreePlayers />

      <div className="max-w-6xl mx-auto px-4 md:px-0 mt-10 space-y-8">
        <RankedPlayersList />
        <WeeklyRewards rewardRules={data.reward_rules} />
      </div>
    </div>
  );
};

export default LeaderboardPage;

