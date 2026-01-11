import type { LeaderboardUser } from '@features/leaderboard/types';

export const getPodiumOrder = (users: LeaderboardUser[]): LeaderboardUser[] => {
  return [
    users.find((p) => p.rank === 2),
    users.find((p) => p.rank === 1),
    users.find((p) => p.rank === 3),
  ].filter((p): p is LeaderboardUser => Boolean(p));
};
