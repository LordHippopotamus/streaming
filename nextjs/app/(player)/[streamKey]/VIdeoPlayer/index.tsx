"use client";

import ViewersCounter from "./ViewersCounter";
import dynamic from "next/dynamic";

const DynamicVideoPlayer = dynamic(() => import("./ClientVideoPlayer"), {
  ssr: false,
});

const VideoPlayer = ({
  streamKey,
  streamer,
  flvHost,
}: {
  streamKey: string;
  streamer: string;
  flvHost: string;
}) => (
  <DynamicVideoPlayer streamUrl={`${flvHost}/${streamKey}.flv`}>
    <h4 className="font-bold text-2xl">{streamer}</h4>
    <ViewersCounter streamKey={streamKey} />
  </DynamicVideoPlayer>
);

export default VideoPlayer;
