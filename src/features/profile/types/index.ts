import type { User } from '@/shared/types';

export interface DayData {
  status: 'active' | 'missed' | 'future';
  label: string;
  active: boolean;
  fire: boolean;
  current: boolean;
}

export interface UserProfile extends User {
  weekly_xp: number;
  completed_days: number[];
}

export interface ProfileResponse {
  data: UserProfile;
}
