import { useEffect, useRef } from 'react';
import type { YTPlayer, YTEvent } from '@shared/types/youtube';

export const useYouTubePlayer = (onCheckProgress: () => void) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const onCheckRef = useRef(onCheckProgress);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    onCheckRef.current = onCheckProgress;
  }, [onCheckProgress]);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initPlayer = () => {
      if (playerRef.current) return;

      new window.YT.Player('yt-player-iframe', {
        events: {
          onReady: (event: { target: YTPlayer }) => {
            playerRef.current = event.target;

            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              onCheckRef.current();
            }, 1000);
          },
          onStateChange: (event: YTEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) onCheckRef.current();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      isInitialized.current = false;
    };
  }, []);

  return { playerRef };
};
