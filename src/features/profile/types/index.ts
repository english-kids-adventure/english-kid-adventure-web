import type { User } from '@/shared/types';

export interface DayData {
  label: string;
  active: boolean;
  fire: boolean;
  current: boolean;
}

export interface UserProfile extends User {
  weekly_xp: number;
}

export interface ProfileResponse {
  data: UserProfile;
}
