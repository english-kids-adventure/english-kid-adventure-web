export interface QuizAnswer {
  id: number;
  content: string;
  mediaUrl: string | null;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  content: string;
  mediaUrl: string | null;
  answers: QuizAnswer[];
}

export interface QuizAttempt {
  id: number
  userId: number
  videoId: number
  attemptDate: string
  timesPlayed: number
  dailyStarsEarned: number
}
