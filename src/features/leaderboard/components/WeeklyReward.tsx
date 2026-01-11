import { Star, Gift } from 'lucide-react';
import { Heading, Text } from '@shared/components/common';
import { PODIUM_ICON_MAP } from '@shared/constants/leaderboard';

interface WeeklyRewardsProps {
  rewardRules: Record<string, number>;
}

const WeeklyRewards = ({ rewardRules }: WeeklyRewardsProps) => {
  if (!rewardRules) return null;

  const validRewards = Object.entries(rewardRules)
    .filter(([rank, bonus]) => PODIUM_ICON_MAP[rank] && bonus > 0)
    .sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-900 p-8">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Gift size={36} className="text-yellow-300" />

        <Heading level={2} className="text-white">
          Weekend Rewards
        </Heading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {validRewards.map(([rank, bonus]) => {
          const Icon = PODIUM_ICON_MAP[rank];

          return (
            <div
              key={rank}
              className="
                rounded-2xl bg-blue-400/30 backdrop-blur-sm
                border border-blue-300/50
                p-6 flex flex-col items-center gap-1
              "
            >
              <Icon size={28} className="text-yellow-300" />

              <Heading level={4} className="text-white">
                Top {rank}
              </Heading>

              <div className="flex items-center gap-2">
                <Text variant="subtitle" className="text-white">
                  +{bonus}
                </Text>

                <Star className="w-5 h-5 text-yellow-300" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyRewards;

