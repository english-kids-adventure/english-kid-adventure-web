import { Heading, Text, Button } from '@shared/components/common';
import { ROUTES, QUIZ_CONFIG } from '@shared/constants';
import { RotateCcw, Star } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizAvailability } from '@features/quiz/hooks/useQuizAvailability';

interface ResultQuizCardProps {
  results: {
    correctAnswers: number
    totalQuestions: number
    starsEarned?: number
    totalStars?: number
    timesPlayed?: number
  }
  resetQuiz: () => void
}

export default function ResultQuizCard({ results, resetQuiz }: ResultQuizCardProps) {
  const {
    correctAnswers,
    totalQuestions,
    starsEarned = 0,
    totalStars,
    timesPlayed,
  } = results;

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = percentage >= QUIZ_CONFIG.PASS_PERCENTAGE;

  const attemptsLeft =
    typeof timesPlayed === 'number'
      ? Math.max(
        QUIZ_CONFIG.MAX_ATTEMPTS_PER_DAY - timesPlayed,
        0,
      )
      : QUIZ_CONFIG.MAX_ATTEMPTS_PER_DAY;

  const navigate = useNavigate();

  const { topicId, orderIndex } = useParams<{
    topicId: string
    orderIndex: string
  }>();

  const videoId = orderIndex ? Number(orderIndex) : undefined;

  const { canStart, loading: quizLoading } =
    useQuizAvailability(videoId);

  const handleRetry = () => {
    if (!canStart || quizLoading) return;

    resetQuiz();
  };

  const handleGoHome = () => {
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto flex justify-center mt-15 px-4">
      <div className="text-center w-full">
        <Heading level={2} color="primary" className="mb-4">
          {isPassed
            ? 'Congratulations!'
            : 'You can do better next time!'}
        </Heading>

        <Text variant="body" color="muted" className="mb-8">
          {isPassed
            ? 'You have completed the quiz with a good result!'
            : 'You need to improve. Try again!'}
        </Text>

        <div className="flex justify-center gap-2 mb-8">
          {[...Array(QUIZ_CONFIG.MAX_STARS)].map((_, i) => (
            <Star
              key={i}
              className={`w-8 h-8 ${
                i < starsEarned
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {correctAnswers}
              </div>
              <Text
                variant="body"
                color="muted"
                className="text-sm mt-2"
              >
                Correct
              </Text>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {totalQuestions - correctAnswers}
              </div>
              <Text
                variant="body"
                color="muted"
                className="text-sm mt-2"
              >
                Wrong
              </Text>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {percentage}%
              </div>
              <Text
                variant="body"
                color="muted"
                className="text-sm mt-2"
              >
                Score
              </Text>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isPassed ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {(totalStars !== undefined || timesPlayed !== undefined) && (
          <div className="flex justify-center gap-5 mb-6 p-4 bg-blue-50 rounded-lg">
            {totalStars !== undefined && (
              <Text variant="body" color="primary">
                Total stars: {totalStars}
              </Text>
            )}
            {timesPlayed !== undefined && (
              <Text variant="body" color="primary">
                Attempts left: {attemptsLeft}
              </Text>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleRetry}
            variant="primary"
            disabled={!canStart || quizLoading}
            size="sm"
            fullWidth
            icon={<RotateCcw className="w-5 h-5" />}
          >
            {quizLoading ? 'Checking...' : 'Retry Quiz'}
          </Button>

          <Button
            onClick={handleGoHome}
            variant="primary"
            size="sm"
            fullWidth
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
