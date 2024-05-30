"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export const regenerateToken = async (userId: string) => {
  const prisma = new PrismaClient();
  const res = await prisma.user.update({
    where: { id: userId },
    data: { streamToken: uuidv4() },
  });
  revalidatePath("/dashboard");
  return res.streamToken;
};
