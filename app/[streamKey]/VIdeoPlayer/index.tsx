import dynamic from "next/dynamic";

const ClientVideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
});

const VideoPlayer = ({ streamKey }: { streamKey: string }) => {
  const streamUrl = `https://${process.env.HOST}/live/${streamKey}.flv`;
  return <ClientVideoPlayer streamUrl={streamUrl} />;
};

export default VideoPlayer;
