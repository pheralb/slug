import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

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
