"use server";

import { prisma } from "@/prisma";

export const getViewersByStreamKey = async (streamKey: string) => {
  const stream = await prisma.stream.findFirst({
    where: { userId: streamKey },
  });
  if (!stream) return 0;
  return stream.viewers;
};
