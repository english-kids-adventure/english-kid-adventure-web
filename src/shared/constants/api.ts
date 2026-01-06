export const API_ENDPOINTS = {
  AUTH:{
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
  },

  TOPICS: {
    GET_ALL: '/topics',
  },

  VIDEO: {
    LIST_VIDEO_BY_TOPIC: (id: number) => `/topics/${id}/videos`,
    UNLOCK: (videoId: number) => `/videos/${videoId}/unlock`,
  },

  QUIZ: {
    GET_QUIZ_BY_LESSON: (videoId: number) => `/quizzes/video/${videoId}`,
    SUBMIT_QUIZ: (videoId: number) => `/quizzes/video/${videoId}/submit`,
    GET_ATTEMPTS: (videoId: number) => `/quizzes/attempts/${videoId}`,
  },
};
