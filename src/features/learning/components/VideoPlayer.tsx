export default function VideoPlayer({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video bg-black rounded-4xl overflow-hidden border-8 border-white shadow-xl">
      <iframe
        width="100%" height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Kid Learning Video"
        allowFullScreen
      ></iframe>
    </div>
  );
}
