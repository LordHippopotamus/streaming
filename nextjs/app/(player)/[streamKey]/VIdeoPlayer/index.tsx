import dynamic from "next/dynamic";
import ViewersCounter from "./ViewersCounter";

const ClientVideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
});

const VideoPlayer = async ({
  streamKey,
  streamer,
}: {
  streamKey: string;
  streamer: string;
}) => {
  const streamUrl = `${process.env.FLV_HOST}/${streamKey}.flv`;
  return (
    <ClientVideoPlayer streamUrl={streamUrl}>
      <h4 className="font-bold text-2xl">{streamer}</h4>
      <ViewersCounter streamKey={streamKey} />
    </ClientVideoPlayer>
  );
};

export default VideoPlayer;
