import type { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  username?: string | undefined;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  limitLinks: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      username: string | undefined;
      limitLinks: number;
    } & DefaultSession["user"];
  }
}
