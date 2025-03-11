"use client";

import FlvJs from "flv.js";
import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({
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
          className="h-6 w-6 text-slate-400 hover:text-slate-50 transition"
          onClick={toggleStop}
        >
          {stop ? (
            <svg
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          ) : (
            <svg
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          )}
        </button>
        <div className="flex gap-4">
          <button
            className="h-6 w-6 text-slate-400 hover:text-slate-50 transition"
            onClick={toggleMuted}
          >
            {muted ? (
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ) : (
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </button>
          <button
            className="h-6 w-6 text-slate-400 hover:text-slate-50 transition"
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ) : (
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
