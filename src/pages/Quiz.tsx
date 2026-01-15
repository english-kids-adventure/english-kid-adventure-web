import ResultQuizCard from '@features/quiz/components/ResultQuizCard';
import { useQuiz } from '@features/quiz/hooks/useQuiz';
import { BackButton, Text, Loading } from '@shared/components/common';
import QuizCard from '@features/quiz/components/QuizCard';
import { useParams } from 'react-router-dom';

export const Quiz = () => {
  const { orderIndex } = useParams<{ orderIndex: string }>();
  const videoId = Number(orderIndex);

  const {
    loading,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    showFeedback,
    isCorrect,
    isQuizCompleted,
    quizResult,
    progress,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuiz(videoId);

  if (loading) {
    return <Loading />;
  }

  if (isQuizCompleted && quizResult) {
    return (
      <ResultQuizCard
        results={quizResult}
        resetQuiz={resetQuiz}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w min-h-screen">
        <div className="flex items-center mb-6">
          <BackButton />
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar">
          <Text align="center" color="muted">
            There are no quiz yet!
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuizCard
        currentQuestion={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        progress={progress}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        onSelectAnswer={selectAnswer}
        onNextQuestion={nextQuestion}
      />
    </div>
  );
};

export default Quiz;
