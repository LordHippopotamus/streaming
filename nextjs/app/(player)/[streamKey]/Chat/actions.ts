"use server";

import { PrismaClient } from "@prisma/client";

export const getUserNameById = async (id: string) => {
  const prisma = new PrismaClient();
  const { name } = await prisma.user.findFirstOrThrow({
    where: { id },
    select: { name: true },
  });
  return name;
};
