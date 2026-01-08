const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

export function isImageUrl(url?: string | null): boolean {
  if (!url) return false;

  const lowerUrl = url.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lowerUrl.endsWith(`.${ext}`));
}
