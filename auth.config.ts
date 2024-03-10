import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

// import bcrypt from "bcryptjs";

// Adapters:
import { PrismaAdapter } from "@auth/prisma-adapter";

// Server:
// import { loginSchema } from "@/server/schemas";
import { db } from "@/server/db";
import { getAccountByUserId } from "@/server/utils/account";
import { getUserById } from "@/server/utils/user";
import { getTwoFactorConfirmationByUserId } from "@/server/utils/two-factor-confirm";

// Environment variables:
import { env } from "@/env.js";

// Providers:
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const config = {
  adapter: PrismaAdapter(db),
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification:
      if (account?.provider !== "credentials") return true;

      // Check if user exists:
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification:
      if (!existingUser?.emailVerified) return false;

      // Prevent sign in with two factor enabled:
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in:
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.username = existingUser.username;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
