interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  if (!url) return null;

  return (
    <div className="aspect-video bg-black rounded-3xl overflow-hidden border-8 border-white shadow-xl">
      <iframe
        className="w-full h-full"
        src={url}
        title="Learning Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

