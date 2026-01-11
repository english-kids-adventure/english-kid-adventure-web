export interface LeaderboardUser {
  rank: number
  user_id: number
  name: string
  avatar_url: string
  weekly_xp: number
  reward_stars: number
  is_me: boolean
}

export interface LeaderboardResponse {
  top_10: LeaderboardUser[]
  my_rank: {
    rank: number
    weekly_xp: number
    reward_stars: number
  }
  reward_rules: Record<string, number>
}
