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

  isUnlocked?: boolean;
  isCompleted?: boolean;

  locked?: boolean;
}
