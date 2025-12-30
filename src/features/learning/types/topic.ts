export interface Topic {
  topicId: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  progress: {
    totalVideos: number;
    completedVideos: number;
  };
}

export interface TopicResponse {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  progress: {
    totalVideos: number;
    completedVideos: number;
  };
}

