"use client";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import FlvJs from "flv.js";
import { useEffect, useRef, useState } from "react";

const ClientVideoPlayer = ({
  streamUrl,
  children,
}: {
  streamUrl: string;
  children: React.ReactNode;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [player, setPlayer] = useState<FlvJs.Player | null>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [stop, setStop] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (FlvJs.isSupported() && videoRef.current) {
      const flv = FlvJs.createPlayer({
        type: "flv",
        url: streamUrl,
        isLive: true,
      });
      flv.attachMediaElement(videoRef.current);
      flv.load();
      flv.play();
      setPlayer(flv);
    }
  }, [streamUrl, videoRef]);

  const toggleStop = () => {
    setStop((prev) => {
      if (player) {
        if (prev) {
          player.play();
        } else {
          player.pause();
        }
        return !prev;
      }

      return prev;
    });
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (fullscreen) {
      document.exitFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  const toggleMuted = () => {
    if (!player) return;
    console.log(player.volume, player.muted);
    setMuted((prev) => {
      if (!prev) {
        player.muted = true;
        return true;
      } else {
        player.muted = false;
        return false;
      }
    });
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setFullscreen(!!document.fullscreenElement);
    });
  }, []);

  const disableVisible = () => setVisible(false);
  const enableVisible = () => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(disableVisible, 3000);
  };

  return (
    <div
      ref={playerRef}
      onMouseMove={enableVisible}
      onMouseLeave={disableVisible}
      className={`flex-1 relative h-full flex items-center justify-center bg-black overflow-hidden ${
        !visible && fullscreen && "cursor-none"
      }`}
    >
      <div
        className={`z-50 transition absolute flex justify-between items-center gap-4 p-4 top-0 w-full bg-black ${
          !visible && "-translate-y-full"
        }`}
      >
        {children}
      </div>

      <div className="relative overflow-hidden w-full h-full">
        <video
          ref={videoRef}
          muted
          className="absolute left-0 top-0 w-full h-full object-contain"
        />
      </div>

      <div
        className={`transition absolute flex justify-between items-center gap-4 p-4 w-full bg-black bottom-0 ${
          !visible && "translate-y-full"
        }`}
      >
        <button
          className="cursor-pointer text-slate-400 hover:text-slate-50 transition"
          onClick={toggleStop}
        >
          {stop ? (
            <PlayIcon className="h-6 w-6" />
          ) : (
            <PauseIcon className="h-6 w-6" />
          )}
        </button>
        <div className="flex gap-4">
          <button
            className="cursor-pointer text-slate-400 hover:text-slate-50 transition"
            onClick={toggleMuted}
          >
            {muted ? (
              <SpeakerXMarkIcon className="h-6 w-6" />
            ) : (
              <SpeakerWaveIcon className="h-6 w-6" />
            )}
          </button>
          <button
            className="cursor-pointer text-slate-400 hover:text-slate-50 transition"
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <ArrowsPointingInIcon className="h-6 w-6" />
            ) : (
              <ArrowsPointingOutIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientVideoPlayer;
