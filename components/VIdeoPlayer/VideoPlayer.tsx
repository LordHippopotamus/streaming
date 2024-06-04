"use client";

import FlvJs from "flv.js";
import { useEffect, useRef } from "react";

const VideoPlayer = ({ streamUrl }: { streamUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (FlvJs.isSupported() && videoRef.current) {
      const flvPlayer = FlvJs.createPlayer({
        type: "flv",
        url: streamUrl,
        isLive: true,
      });
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      flvPlayer.play();
    }
  }, [streamUrl, videoRef]);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
};

export default VideoPlayer;
