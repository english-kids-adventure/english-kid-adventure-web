import { Button, BackButton, Text, Heading } from '@shared/components/common';
import { DEFAULT_IMAGES } from '@/shared/constants/image';

interface Answer {
  id: number
  content?: string | null
  media_url?: string | null
}

interface Question {
  question_id: number
  content?: string | null
  media_url?: string
  answers: Answer[]
  correct_answer_id: number
}

interface QuizQuestionCardProps {
  currentQuestion: Question
  currentIndex: number
  totalQuestions: number
  progress: number
  selectedAnswer: number | null
  showFeedback: boolean
  isCorrect: boolean
  onSelectAnswer: (answerId: number) => void
  onNextQuestion: () => void
}

const isImageUrl = (url?: string | null) => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
};

export default function QuizCard({
  currentQuestion,
  currentIndex,
  totalQuestions,
  progress,
  selectedAnswer,
  showFeedback,
  onSelectAnswer,
  onNextQuestion,
}: QuizQuestionCardProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <Text variant="body" color="primary">
          Question {currentIndex + 1}/{totalQuestions}
        </Text>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        {currentQuestion.media_url && (
          <div className="mb-6">
            {currentQuestion.media_url.endsWith('.mp3') ? (
              <audio controls className="w-full">
                <source src={currentQuestion.media_url} />
              </audio>
            ) : (
              <img
                src={currentQuestion.media_url}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMAGES.THUMBNAIL;
                }}
                className="w-full h-64 object-contain rounded-xl"
              />
            )}
          </div>
        )}

        <Heading level={2} color="primary" className="text-center mt-15 mb-15">
          {currentQuestion.content}
        </Heading>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.answers.map((answer) => {
            const isSelected = selectedAnswer === answer.id;
            const isCorrectAnswer =
              answer.id === currentQuestion.correct_answer_id;

            const buttonClass = showFeedback
              ? isCorrectAnswer
                ? 'bg-green-100 border-green-500'
                : isSelected
                  ? 'bg-red-100 border-red-500'
                  : 'border-gray-300'
              : 'border-gray-300';

            return (
              <Button
                key={answer.id}
                unstyled
                disabled={showFeedback}
                onClick={() => onSelectAnswer(answer.id)}
                className={`p-4 rounded-lg border-2 transition ${buttonClass}`}
              >
                {answer.media_url && isImageUrl(answer.media_url) ? (
                  <img
                    src={answer.media_url}
                    alt="answer"
                    className="w-full h-32 object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMAGES.THUMBNAIL;
                    }}
                  />
                ) : (
                  <span className="text-base font-medium">
                    {answer.content}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={onNextQuestion}
        disabled={!showFeedback}
        fullWidth
        variant="primary"
      >
        {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next question'}
      </Button>
    </>
  );
}
