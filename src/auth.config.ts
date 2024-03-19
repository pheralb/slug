import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "./env.mjs";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
