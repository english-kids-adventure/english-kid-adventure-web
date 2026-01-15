import { useState } from 'react';

export const useVideoQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return {
    showQuiz,
    startQuiz: () => setShowQuiz(true),
    hideQuiz: () => setShowQuiz(false),
  };
};
