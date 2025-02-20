"use client";

import Button from "@/components/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="w-full h-full px-4 my-48 flex flex-col items-center gap-4">
      <p className="text-center text-4xl tracking-widest">
        Something went wrong :(
      </p>
      <Button onClick={reset}>Reload</Button>
    </div>
  );
}
