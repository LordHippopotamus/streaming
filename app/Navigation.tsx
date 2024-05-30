"use client";

import Button from "@/components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { default as NextLink } from "next/link";

const Navigation = () => {
  const { status } = useSession();

  return (
    <nav className="flex justify-between items-center px-4 py-6 bg-slate-800">
      <h4 className="font-bold text-2xl">
        <NextLink href="/">Streaming</NextLink>
      </h4>

      {status === "loading" && (
        <div className="w-20 h-10 rounded bg-slate-600 animate-pulse" />
      )}
      {status === "authenticated" && (
        <Button onClick={() => signOut()}>Sign Out</Button>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => signIn("github")}>Sign In Wtih Github</Button>
      )}
    </nav>
  );
};

export default Navigation;
