import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { stream: streamKey } = await request.json();

  if (!streamKey || typeof streamKey !== "string") {
    return new NextResponse("malformed request", { status: 400 });
  }

  const stream = await prisma.stream.findFirstOrThrow({
    where: { userId: streamKey },
  });

  await prisma.stream.update({
    data: { viewers: stream.viewers - 1 },
    where: { userId: streamKey },
  });

  return NextResponse.json({ code: 0 });
}
