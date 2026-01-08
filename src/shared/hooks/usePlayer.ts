import { useContext } from 'react';
import { PlayerContext } from '@store/player/PlayerContext';

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer must be used inside PlayerProvider');
  }
  return ctx;
};

