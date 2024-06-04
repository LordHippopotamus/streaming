import DisplayError from "@/components/DisplayError";
import VideoPlayer from "@/components/VIdeoPlayer";
import { PrismaClient } from "@prisma/client";

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
    </div>
  );
};

export default Stream;
