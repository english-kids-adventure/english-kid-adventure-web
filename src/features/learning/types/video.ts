export type VideoLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Video {
  id: number;
  topicId: number;
  title: string;
  level: VideoLevel;
  thumbnailUrl?: string;
  orderIndex: number;
  unlockCost: number;
  xpReward: number;
  url: string;
  progress: number;

  isUnlocked?: boolean;
  isCompleted?: boolean;

  locked?: boolean;
}

export interface UnlockVideoResponse {
  remainingStars: number;
  isUnlocked: boolean;
}

export type VideoItem = Video & {
  isUnlocked: boolean;
  isCompleted: boolean;
};
