"use client";

import { memo, useEffect, useState } from "react";
import { getViewersByStreamKey } from "./actions";

const ViewersCounter = ({ streamKey }: { streamKey: string }) => {
  const [viewers, setViewers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await getViewersByStreamKey(streamKey);
      setLoading(false);
      setViewers(res);
    }, 3000);
    return () => clearInterval(interval);
  }, [streamKey]);

  if (loading)
    return <span className="w-3 h-3 rounded-full bg-slate-600 animate-pulse" />;

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-rose-500"></span>
      </span>
      <span>{viewers}</span>
    </div>
  );
};

export default memo(ViewersCounter);
