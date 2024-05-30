import Link from "@/components/Link";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const Home = async () => {
  const prisma = new PrismaClient();
  const streams = await prisma.stream.findMany({ include: { user: true } });

  return (
    <div className="mx-4 my-8">
      {!streams.length && (
        <div className="w-full h-full my-48">
          <p className="text-center text-4xl tracking-widest">
            No one is streaming now :(
          </p>
        </div>
      )}
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
