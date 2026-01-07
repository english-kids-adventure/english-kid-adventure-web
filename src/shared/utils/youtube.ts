export function getYoutubeVideoId(url: string): string {
  return (
    url.match(/(?:v=|\/embed\/|youtu\.be\/)([^?&]+)/)?.[1] ?? ''
  );
}

export function getYoutubeEmbedUrl(url: string): string {
  const videoId = getYoutubeVideoId(url);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  if (!videoId) return '';

  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${origin}&rel=0&modestbranding=1`;
}

export function getYoutubeThumbnail(url: string) {
  const match = url.match(/embed\/([^?]+)/);
  if (!match) return '';

  const videoId = match[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
