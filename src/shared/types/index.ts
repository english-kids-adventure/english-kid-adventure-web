export type VideoLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type MissionType = 'DAILY' | 'WEEKLY';

export interface User {
  user_id: number;
  name: string;
  email: string;
  avatar_url?: string;
  total_xp: number;
  total_stars: number;
  current_streak: number;
  longest_streak: number;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  icon_url: string;
}

export interface Video {
  id: number;
  topic_id: number;
  title: string;
  level: VideoLevel;
  url: string;
  unlock_cost: number;
  xp_reward: number;
}
