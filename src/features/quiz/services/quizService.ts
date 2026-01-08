import axiosClient from '@lib/axios';
import { API_ENDPOINTS } from '@shared/constants/api';
import type { QuizQuestion, QuizAttempt } from '@features/quiz/types';

export const quizApi = {
  getQuizByVideo: async (videoId: number): Promise<QuizQuestion[]> => {
    const res = await axiosClient.get(
      API_ENDPOINTS.QUIZ.GET_QUIZ_BY_LESSON(videoId),
    );
    return res.data.data;
  },

  getAttempts: async (videoId: number): Promise<QuizAttempt[]> => {
    const res = await axiosClient.get(
      API_ENDPOINTS.QUIZ.GET_ATTEMPTS(videoId),
    );
    return res.data.data;
  },

  submitQuiz: async (payload: {
    videoId: number
    correctAnswers: number
    totalQuestions: number
  }) => {
    const { videoId, ...body } = payload;
    const res = await axiosClient.post(
      API_ENDPOINTS.QUIZ.SUBMIT_QUIZ(videoId),
      body,
    );
    return res.data;
  },
};
