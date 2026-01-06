import { profileService } from '@/features/profile/services/profileService';
import type { PlayerState } from '@store/player/types/player';
import React from 'react';

export const createPlayerActions = (
  setState: React.Dispatch<React.SetStateAction<PlayerState>>,
) => ({
  addXp: async (xp: number): Promise<void> => {
    let nextTotalXp = 0;
    let nextWeeklyXp = 0;

    setState((prev) => {
      nextTotalXp = prev.totalXp + xp;
      nextWeeklyXp = prev.weeklyXp + xp;

      return {
        ...prev,
        totalXp: nextTotalXp,
        weeklyXp: nextWeeklyXp,
      };
    });

    try {
      await profileService.updateProfile({
        total_xp: nextTotalXp,
        weekly_xp: nextWeeklyXp,
      });
    } catch (err) {
      console.error('Add XP failed', err);
    }
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
