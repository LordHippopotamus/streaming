import DisplayError from "@/components/DisplayError";
import { PrismaClient } from "@prisma/client";
import ViewersCounter from "./ViewersCounter";
import VideoPlayer from "./VIdeoPlayer";

const Stream = async ({ params }: { params: { streamKey: string } }) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { id: { equals: params.streamKey } },
    include: { stream: true },
  });

  if (!user) return <DisplayError message="The user doesn't exist" />;
  if (!user.stream) return <DisplayError message="The user is offline now" />;

  return (
    <div className="mx-4 my-8">
      <VideoPlayer streamKey={params.streamKey} />
      <div className="mt-4 flex justify-between items-center">
        <h4 className="font-bold text-4xl">{user.name || "Unnamed"}</h4>
        <ViewersCounter streamKey={params.streamKey} />
      </div>
    </div>
  );
};

export default Stream;
