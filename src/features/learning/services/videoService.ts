import { get, post } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants/api';
import type {
  Video,
  UnlockVideoResponse,
  CompleteVideoResponse,
} from '@features/learning/types';

export const videoService = {
  getVideosByTopic(topicId: number): Promise<Video[]> {
    return get<Video[]>(
      API_ENDPOINTS.VIDEO.LIST_VIDEO_BY_TOPIC(topicId),
    );
  },

  unlockVideo(videoId: number): Promise<UnlockVideoResponse> {
    return post<UnlockVideoResponse>(
      API_ENDPOINTS.VIDEO.UNLOCK(videoId),
    );
  },

  completeVideo(videoId: number): Promise<CompleteVideoResponse> {
    return post<CompleteVideoResponse>(
      API_ENDPOINTS.VIDEO.COMPLETE(videoId),
    );
  },
};
