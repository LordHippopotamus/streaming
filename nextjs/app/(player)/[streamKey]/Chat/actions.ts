"use server";

import { prisma } from "@/prisma";

export const getUserNameById = async (id: string) => {
  const { name } = await prisma.user.findFirstOrThrow({
    where: { id },
    select: { name: true },
  });
  return name;
};
