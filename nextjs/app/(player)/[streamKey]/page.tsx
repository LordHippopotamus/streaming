import DisplayError from "@/components/DisplayError";
import { PrismaClient } from "@prisma/client";
import VideoPlayer from "./VIdeoPlayer";
import Chat from "./Chat";
import { auth } from "@/auth";

const Stream = async ({
  params,
}: {
  params: Promise<{ streamKey: string }>;
}) => {
  const { streamKey } = await params;
  const session = await auth();
  const prisma = new PrismaClient();

  const socketIoUrl = process.env.SOCKET_IO_URL;
  if (!socketIoUrl) throw Error("SOCKET_IO_URL env variable does not exist");

  const flvHost = process.env.FLV_HOST;
  if (!flvHost) throw Error("FLV_HOST env variable does not exist");

  const streamer = await prisma.user.findFirst({
    where: { id: { equals: streamKey } },
    include: { stream: true },
  });

  // if (!streamer) return <DisplayError message="The user doesn't exist" />;
  // if (!streamer.stream)
  //   return <DisplayError message="The user is offline now" />;

  return (
    <div className="flex-1 flex overflow-hidden">
      <VideoPlayer
        streamKey={streamKey}
        streamer={"streamer.name"}
        flvHost={flvHost}
      />
      <Chat room={streamKey} user={session?.user} socketIoUrl={socketIoUrl} />
    </div>
  );
};

export default Stream;
