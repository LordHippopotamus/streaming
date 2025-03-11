import DisplayError from "@/components/DisplayError";
import { PrismaClient } from "@prisma/client";
import VideoPlayer from "./VIdeoPlayer";
import Chat from "./Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Stream = async ({ params }: { params: { streamKey: string } }) => {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const socketIoUrl = process.env.SOCKET_IO_URL;
  if (!socketIoUrl) throw Error("SOCKET_IO_URL env variable does not exist");

  const streamer = await prisma.user.findFirst({
    where: { id: { equals: params.streamKey } },
    include: { stream: true },
  });

  if (!streamer) return <DisplayError message="The user doesn't exist" />;
  if (!streamer.stream)
    return <DisplayError message="The user is offline now" />;

  return (
    <div className="flex-1 flex overflow-hidden">
      <VideoPlayer streamKey={params.streamKey} streamer={streamer.name} />
      <Chat
        room={params.streamKey}
        user={session?.user}
        socketIoUrl={socketIoUrl}
      />
    </div>
  );
};

export default Stream;
