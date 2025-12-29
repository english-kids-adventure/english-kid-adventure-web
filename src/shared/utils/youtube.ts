export function getYoutubeThumbnail(url: string) {
  const match = url.match(/embed\/([^?]+)/);
  if (!match) return '';

  const videoId = match[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
