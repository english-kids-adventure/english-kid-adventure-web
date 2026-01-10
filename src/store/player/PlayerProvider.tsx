import { useCallback, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { PlayerContext } from '@store/player/PlayerContext';
import type { PlayerState } from '@store/player/types/player';
import { createPlayerActions } from '@store/player/actions/player';
import { profileService } from '@features/profile/services/profileService';
import { useAuthStore } from '@store/useAuthStore';

const initialState: PlayerState = {
  totalXp: 0,
  weeklyXp: 0,
  totalStars: 0,
  loading: false,
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(initialState);

  const token = useAuthStore((s) => s.isAuthenticated);

  const actions = useMemo(() => createPlayerActions(setState), []);

  const syncFromProfile = useCallback(async () => {
    if (!token) {
      setState(initialState);
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const res = await profileService.getProfile();
      const data = res.data;

      setState({
        totalXp: data.total_xp,
        weeklyXp: data.weekly_xp,
        totalStars: data.total_stars,
        loading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [token]);

  useEffect(() => {
    syncFromProfile();
  }, [syncFromProfile]);

  const value = useMemo(
    () => ({
      ...state,
      ...actions,
      syncFromProfile,
    }),
    [state, actions, syncFromProfile],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
