"use client";

import { useEffect, useState } from "react";

const ViewersCounter = ({ streamKey }: { streamKey: string }) => {
  const [viewers, setViewers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/streams/${streamKey}/viewers`);
      const viewers = await res.json();
      setLoading(false);
      setViewers(viewers);
    }, 3000);
    return () => clearInterval(interval);
  }, [streamKey]);

  return (
    <p className="flex">
      Viewers:&nbsp;
      {loading ? (
        <div className="w-12 h-6 rounded bg-slate-600 animate-pulse" />
      ) : (
        viewers
      )}
    </p>
  );
};

export default ViewersCounter;
