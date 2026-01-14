import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { quizApi } from '@features/quiz/services/quizService';
import type { QuizQuestion } from '@features/quiz/types';

export interface QuizMappedAnswer {
  id: number
  content: string | null
  media_url?: string
}

export interface QuizMappedQuestion {
  question_id: number
  content: string | null
  media_url?: string
  answers: QuizMappedAnswer[]
  correct_answer_id: number
}

export const useQuizQuestions = (videoId?: number) => {
  const query = useQuery<QuizQuestion[]>({
    queryKey: ['quiz', videoId],
    queryFn: () => quizApi.getQuizByVideo(videoId!),
    enabled: !!videoId,
  });

  const questions: QuizMappedQuestion[] = useMemo(() => {
    if (!query.data) return [];

    return query.data.map((q) => ({
      question_id: q.id,
      content: q.content,
      media_url: q.mediaUrl ?? undefined,

      answers: q.answers.map((a) => ({
        id: a.id,
        content: a.content,
        media_url: a.mediaUrl ?? undefined,
      })),

      correct_answer_id:
        q.answers.find((a) => a.isCorrect)?.id ?? -1,
    }));
  }, [query.data]);

  return {
    ...query,
    questions,
  };
};
