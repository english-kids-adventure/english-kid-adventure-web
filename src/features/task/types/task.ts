import type { ReactNode } from 'react';

export interface TaskResponse {
  id: number
  name: string
  code: string
  description: string
  rewardXp: number
  rewardStars: number
  currentCount: number
  targetCount: number
  isClaimed: boolean
  isCompleted: boolean
}

export interface TaskUI extends TaskResponse {
  icon: ReactNode
}

export const TASK_TYPES = {
  DAILY: 'D',
  WEEKLY: 'W',
} as const;

export type TaskType = typeof TASK_TYPES[keyof typeof TASK_TYPES];
