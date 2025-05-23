import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const streamKey = body.stream;

  if (!streamKey || typeof streamKey !== "string") {
    return new NextResponse("malformed request", { status: 400 });
  }

  await prisma.stream.delete({ where: { userId: streamKey } });

  return NextResponse.json({ code: 0 });
}
