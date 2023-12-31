import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";
import { db } from "@/server/db";

// Providers:
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      username?: string | undefined;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      username: string | undefined;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET ?? "",
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },
    }),
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
