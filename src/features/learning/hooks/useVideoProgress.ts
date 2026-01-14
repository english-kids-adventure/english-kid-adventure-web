import { useState, useCallback, useRef, useEffect } from 'react';
import type { YTPlayer } from '@shared/types/youtube';
import React from 'react';

export function useVideoProgress(
  playerRef: React.MutableRefObject<YTPlayer | null>,
  videoId: number | string,
  onProgressReached: () => Promise<void> | void,
) {
  const [canClaimXP, setCanClaimXP] = useState(false);

  const claimedSessions = useRef<Record<string | number, boolean>>({});
  const isClaiming = useRef(false);

  useEffect(() => {
    setCanClaimXP(false);
    claimedSessions.current[videoId] = false;
    isClaiming.current = false;

    Object.keys(claimedSessions.current).forEach((key) => {
      claimedSessions.current[key] = false;
    });
  }, [videoId]);

  useEffect(() => {
    return () => {
      Object.keys(claimedSessions.current).forEach((key) => {
        claimedSessions.current[key] = false;
      });
      setCanClaimXP(false);
    };
  }, []);

  const checkProgress = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (typeof player.getCurrentTime !== 'function') return;

    const current = player.getCurrentTime();
    const total = player.getDuration();
    const playerState = (player as unknown as { getPlayerState?: () => number })?.getPlayerState?.();

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
