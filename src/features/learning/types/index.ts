export type Video = {
  id: number;
  title: string;
  level: 'EASY' | 'MEDIUM' | 'HARD';
  url: string;
  thumbnail_url?: string;
  unlock_cost: number;
  xp_reward: number;
};

export type Topic = {
  id: number;
  name: string;
  description?: string;
  icon_url?: string;
};
