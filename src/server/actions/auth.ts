"use server";

import type { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { db } from "@/server/db";
import { loginSchema, registerSchema } from "@/server/schemas";
import { getUserByEmail } from "@/server/utils/user";
import { signIn } from "@/server/auth";
import { generateVerificationToken } from "@/server/tokens";

// Auth Routes, check src/routes.ts for more details:
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { sendVerificationEmail } from "../mail";

interface AuthResponse {
  message: string;
  isError: boolean;
}

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", isError: true } as AuthResponse;
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { message: "Email does not exist.", isError: true } as AuthResponse;
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(existingUser.email, verificationToken.token);
    return {
      message: "Email not verified. We are sending you a new email with a link to verify your email.",
      isError: true,
    } as AuthResponse;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
            isError: true,
          } as AuthResponse;
        default:
          return {
            message: "Something went wrong",
            isError: true,
          } as AuthResponse;
      }
    }
    throw error;
  }
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", isError: true } as AuthResponse;
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists:
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { message: "User already exists", isError: true } as AuthResponse;
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  // Send verification email:

  return {
    message: "Confirmation email sent successfully. Check your inbox.",
    isError: false,
  } as AuthResponse;
};
