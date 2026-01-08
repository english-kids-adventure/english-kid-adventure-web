export interface YTPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
  pauseVideo(): void;
  playVideo(): void;
}

export interface YTEvent {
  target: YTPlayer;
  data: number;
}

export interface YTPlayerConfig {
  events: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: YTEvent) => void;
  };
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (id: string, config: YTPlayerConfig) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        ENDED: number;
      };
    };
  }
}

export {};
