import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const streamToken = new URLSearchParams(body.param).get("token");
  const streamKey = body.stream;

  if (!streamKey || typeof streamKey !== "string" || !streamToken) {
    return new NextResponse("malformed request", { status: 400 });
  }

  const prisma = new PrismaClient();
  const res = await prisma.user.findFirst({ where: { id: streamKey } });

  if (res?.streamToken !== streamToken) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  await prisma.stream.create({ data: { userId: streamKey } });

  return NextResponse.json({ code: 0 });
}
