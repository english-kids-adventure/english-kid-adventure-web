import { useState, useEffect, useCallback } from 'react';
import { quizApi } from '@features/quiz/services/quizService';

const MAX_ATTEMPTS_PER_DAY = 3;

export const useQuizAvailability = (videoId?: number) => {
  const [canStart, setCanStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    if (!videoId) {
      setCanStart(false);
      setError('Invalid video ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const quiz = await quizApi.getQuizByVideo(videoId);
      if (!quiz || quiz.length === 0) {
        setCanStart(false);
        setError('No quiz');
        return;
      }

      const attempts = await quizApi.getAttempts(videoId);
      const todayAttempt = attempts?.[0];

      if (
        todayAttempt &&
        todayAttempt.timesPlayed >= MAX_ATTEMPTS_PER_DAY
      ) {
        setCanStart(false);
        setError('No attempts left');
        return;
      }

      setCanStart(true);
    } catch {
      setCanStart(false);
      setError('No quiz');
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return {
    canStart,
    loading,
    error,
    refresh: fetchAvailability,
  };
};
