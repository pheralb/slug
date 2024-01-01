"use server";

import type { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { loginSchema, registerSchema } from "@/server/schemas";
import { getUserByEmail } from "@/server/utils/user";
import { signIn } from "@/server/auth";

// Auth Routes, check src/routes.ts for more details:
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

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

  // Send verification email:

  return {
    message: "User created successfully",
    isError: false,
  } as AuthResponse;
};
