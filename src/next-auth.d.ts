import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  username?: string | undefined;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  limitLinks: number;
  blocked: boolean;
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
