import { PrismaClient } from "@prisma/client";

export const GET = async (
  request: Request,
  { params }: { params: { streamKey: string } }
) => {
  const prisma = new PrismaClient();
  const stream = await prisma.stream.findFirst({
    where: { userId: params.streamKey },
  });
  if (!stream) return Response.json(0);
  return Response.json(stream.viewers);
};
