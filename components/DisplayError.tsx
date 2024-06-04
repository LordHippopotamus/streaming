"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const DisplayError = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <div className="w-full h-full px-4 my-48 flex flex-col items-center gap-4">
      <p className="text-center text-4xl tracking-widest">{message} :(</p>
      <Button onClick={router.refresh}>Reload</Button>
    </div>
  );
};

export default DisplayError;
