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
};
