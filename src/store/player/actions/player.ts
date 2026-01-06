import type { PlayerState } from '@store/player/types/player';
import React from 'react';

export const createPlayerActions = (
  setState: React.Dispatch<React.SetStateAction<PlayerState>>,
) => ({
  addXp: async (xp: number): Promise<void> => {
    let nextTotalXp = 0;
    setState((prev) => {
      nextTotalXp = prev.totalXp + xp;

      return {
        ...prev,
        totalXp: nextTotalXp,
      };
    });
  },

  addStars: async (stars: number): Promise<void> => {
    let nextStars = 0;

    setState((prev) => {
      nextStars = prev.totalStars + stars;

      return {
        ...prev,
        totalStars: nextStars,
      };
    });
  },
});
