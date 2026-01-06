import { useState, useCallback, useRef } from 'react';
import type { YTPlayer } from '@features/learning/types';
import React from 'react';

export function useVideoProgress(
  playerRef: React.MutableRefObject<YTPlayer | null>,
  videoId: number | string,
  onProgressReached: () => Promise<void> | void,
) {
  const [canClaimXP, setCanClaimXP] = useState(false);

  const claimedSessions = useRef<Record<string | number, boolean>>({});
  const isClaiming = useRef(false);

  const checkProgress = useCallback(() => {
    const player = playerRef.current;
    if (!player || typeof player.getCurrentTime !== 'function') return;

    const current = player.getCurrentTime();
    const total = player.getDuration();
    if (total <= 0) return;

    const progress = current / total;

    if (progress < 0.05) {
      setCanClaimXP(false);
      claimedSessions.current[videoId] = false;
    }

    if (progress >= 0.8 && !claimedSessions.current[videoId]) {
      setCanClaimXP(true);
    }

    if (progress < 0.8 && canClaimXP) {
      setCanClaimXP(false);
    }
  }, [canClaimXP, playerRef, videoId]);

  const handleClaim = useCallback(async () => {
    if (isClaiming.current || !canClaimXP) return;

    try {
      isClaiming.current = true;
      setCanClaimXP(false);
      claimedSessions.current[videoId] = true;
      await onProgressReached();
    } finally {
      isClaiming.current = false;
    }
  }, [canClaimXP, onProgressReached, videoId]);

  return {
    canClaimXP,
    checkProgress,
    handleClaim,
  };
}
