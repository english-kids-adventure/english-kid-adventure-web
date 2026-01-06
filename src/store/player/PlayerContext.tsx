import { createContext } from 'react';
import type { PlayerState } from '@store/player/types/player';

export interface PlayerContextValue extends PlayerState {
  addXp: (xp: number) => Promise<void>
  addStars: (stars: number) => Promise<void>
  syncFromProfile: () => Promise<void>
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

