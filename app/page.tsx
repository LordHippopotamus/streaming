import DisplayError from "@/components/DisplayError";
import Link from "@/components/Link";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const Home = async () => {
  const prisma = new PrismaClient();
  const streams = await prisma.stream.findMany({ include: { user: true } });

  if (!streams.length)
    return <DisplayError message="No one is streaming now" />;

  return (
    <div className="mx-4 my-8">
      <ul className="flex gap-2">
        {streams.map((el) => (
          <li key={el.user.id}>
            <Link href={`/${el.user.id}`}>{el.user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
