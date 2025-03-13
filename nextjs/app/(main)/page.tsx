import DisplayError from "@/components/DisplayError";
import Link from "@/components/Link";
import { prisma } from "@/prisma";

export const dynamic = "force-dynamic";

const Home = async () => {
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
