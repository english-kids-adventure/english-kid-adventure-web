export type VideoLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Video {
  progress: number;
  id: number;
  topicId: number;
  title: string;
  level: VideoLevel;
  thumbnailUrl?: string;
  orderIndex: number;
  unlockCost: number;
  xpReward: number;
  url: string;

  isUnlocked?: boolean;
  isCompleted?: boolean;

  locked?: boolean;
}

export interface UnlockVideoResponse {
  remainingStars: number;
  isUnlocked: boolean;
}
