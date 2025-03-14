import { redirect } from "next/navigation";
import RegenerateTokenButton from "./RegenerateTokenButton";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

const getUser = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");
  return session.user;
};

const getStreamToken = async (userId: string) => {
  const res = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return res.streamToken;
};

const Dashboard = async () => {
  const user = await getUser();
  const streamToken = await getStreamToken(user.id);

  return (
    <div className="px-4 mx-auto my-8">
      <h1 className="text-4xl">Dashboard</h1>
      <ul className="mt-4 flex flex-col gap-2">
        <li className="flex items-center">
          Name&nbsp;
          <span className="bg-slate-800 p-1 rounded tracking-widest select-all">
            {user.name || "Unnamed"}
          </span>
        </li>
        <li className="flex items-center">
          Email&nbsp;
          <span className="bg-slate-800 p-1 rounded tracking-widest select-all">
            {user.email}
          </span>
        </li>
        <li className="flex items-center">
          Server&nbsp;
          <span className="bg-slate-800 p-1 rounded tracking-widest select-all">
            {process.env.RTMP_HOST}
          </span>
        </li>
        <li className="flex items-center">
          Stream Key&nbsp;
          <span className="bg-slate-800 p-1 rounded tracking-widest select-all">
            {user.id}?token={streamToken}
          </span>
          &nbsp;
          <RegenerateTokenButton userId={user.id} />
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
