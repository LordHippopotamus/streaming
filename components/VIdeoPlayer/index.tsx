import dynamic from "next/dynamic";

const ClientVideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
});

const VideoPlayer = ({ streamKey }: { streamKey: string }) => {
  const streamUrl = `http://${process.env.HOST}:8080/live/${streamKey}.flv`;
  return <ClientVideoPlayer streamUrl={streamUrl} />;
};

export default VideoPlayer;
