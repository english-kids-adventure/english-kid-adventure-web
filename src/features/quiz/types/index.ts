export type QuizQuestion = {
  id: number;
  content: string;
  media_url?: string;
  answers: {
    id: number;
    content: string;
    is_correct: boolean;
  }[];
};
