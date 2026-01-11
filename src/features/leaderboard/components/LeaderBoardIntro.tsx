import { Trophy } from 'lucide-react';
import { Heading, Text } from '@shared/components/common';

const LeaderboardIntro = () => {
  return (
    <div className="mb-8 text-center">
      <div className="mb-1 flex items-center justify-center gap-3">
        <Trophy
          size={34}
          strokeWidth={2}
          className="text-yellow-400"
        />

        <Heading
          level={1}
          color="primary"
          align="center"
        >
          Leaderboard
        </Heading>
      </div>

      <Text
        variant="body"
        color="muted"
        align="center"
      >
        This week's ranking (Resets on Sunday)
      </Text>
    </div>
  );
};

export default LeaderboardIntro;
