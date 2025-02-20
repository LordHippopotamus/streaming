import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        data: { streamToken: uuidv4() },
        where: { id: user.id },
      });
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
} satisfies AuthOptions;
