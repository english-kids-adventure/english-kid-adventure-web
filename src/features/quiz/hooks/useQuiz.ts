import { useMemo, useState } from 'react';
import { useQuizQuestions } from './useQuizQuestions';
import { quizApi } from '@features/quiz/services/quizService';
import { usePlayer } from '@shared/hooks/usePlayer';

export function useQuiz(videoId?: number) {
  const { questions, isLoading } = useQuizQuestions(videoId);
  const { addStars } = usePlayer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: number; selectedId: number; isCorrect: boolean }>
  >([]);

  const [quizResult, setQuizResult] = useState(null);

  const currentQuestion = questions[currentIndex];

  const isCorrect = useMemo(() => {
    if (!currentQuestion || selectedAnswer === null) return false;
    return selectedAnswer === currentQuestion.correct_answer_id;
  }, [selectedAnswer, currentQuestion]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return ((currentIndex + 1) / questions.length) * 100;
  }, [currentIndex, questions.length]);

  const selectAnswer = (answerId: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerId);
      setShowFeedback(true);
    }
  };

  const nextQuestion = async () => {
    if (!showFeedback || !currentQuestion) return;

    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: currentQuestion.question_id,
        selectedId: selectedAnswer!,
        isCorrect,
      },
    ];
    setUserAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      return;
    }

    const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;

    if (videoId) {
      const res = await quizApi.submitQuiz({
        videoId,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
      });

      if (res.success) {
        setQuizResult(res.data);

        if (res.data.starsEarned) {
          addStars(res.data.starsEarned);
        }
      }
    }

    setIsQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsQuizCompleted(false);
    setUserAnswers([]);
    setQuizResult(null);
  };

  return {
    loading: isLoading,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    progress,
    selectedAnswer,
    showFeedback,
    isCorrect,
    isQuizCompleted,
    quizResult,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  };
}
