import { get, postFull } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { QuizQuestion, QuizAttempt } from '@features/quiz/types';

export const quizApi = {
  getQuizByVideo: (videoId: number): Promise<QuizQuestion[]> => {
    return get(API_ENDPOINTS.QUIZ.GET_QUIZ_BY_LESSON(videoId));
  },

  getAttempts: (videoId: number): Promise<QuizAttempt[]> => {
    return get(API_ENDPOINTS.QUIZ.GET_ATTEMPTS(videoId));
  },

  submitQuiz: (payload: {
    videoId: number
    correctAnswers: number
    totalQuestions: number
  }) => {
    const { videoId, ...body } = payload;
    return postFull(API_ENDPOINTS.QUIZ.SUBMIT_QUIZ(videoId), body);
  },
};
