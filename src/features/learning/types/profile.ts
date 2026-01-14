export interface ProfileData {
  user_id: number;
  name: string;
  avatar_url: string;
  total_xp: number;
  weekly_xp: number;
  total_stars: number;
  current_streak: number;
  longest_streak: number;
  completed_days: number[];
}

export interface ProfileResponse {
  data: ProfileData;
}
