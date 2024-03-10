"use server";

import type { z } from "zod";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { db } from "@/server/db";
import { signIn, signOut } from "auth";
import { getUserByEmail } from "@/server/utils/user";
import {
  getPasswordResetTokenByToken,
  getVerificationTokenByToken,
} from "@/server/utils/tokens";
import {
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
} from "@/server/schemas";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/server/tokens";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/server/mail";

// Auth Routes, check src/routes.ts for more details:
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { getTwoFactorTokenByEmail } from "../utils/two-factor-tokens";
import { getTwoFactorConfirmationByUserId } from "../utils/two-factor-confirm";

interface AuthResponse {
  message: string;
  isError: boolean;
  twoFactorTokenForm?: boolean;
}

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", isError: true } as AuthResponse;
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { message: "Email does not exist.", isError: true } as AuthResponse;
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    try {
      console.log("Existing User:", existingUser);
      const result = await sendVerificationEmail(
        existingUser.email,
        verificationToken.token,
      );
      console.log("Resend result:", result);
    } catch (error) {
      console.error(error);
    }
    return {
      message:
        "Email not verified. We are sending you a new email with a link to verify your email.",
      isError: true,
    } as AuthResponse;
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return {
          message:
            "Invalid 2FA code. Generate another code and please try again.",
          isError: true,
          twoFactorTokenForm: true,
        } as AuthResponse;
      }

      if (twoFactorToken.token !== code) {
        return {
          message: "Invalid 2FA code. Please try again.",
          isError: true,
          twoFactorTokenForm: true,
        } as AuthResponse;
      }

      const hasExpired = twoFactorToken.expires < new Date();

      if (hasExpired) {
        return {
          message:
            "2FA code has expired. Generate another code and please try again.",
          isError: true,
          twoFactorTokenForm: true,
        } as AuthResponse;
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      try {
        await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
      } catch (error) {
        console.error(error);
      }
      return {
        message:
          "Two factor authentication enabled. We are sending you a new email with a 2FA code.",
        isError: false,
        twoFactorTokenForm: true,
      } as AuthResponse;
    }
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

export const logout = async () => {
  await signOut();
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

  return {
    message: "User created successfully. Please verify your email.",
    isError: false,
  } as AuthResponse;
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      message: "Invalid token. This token does not exist.",
      isError: true,
    } as AuthResponse;
  }

  const hasExpired = existingToken.expires < new Date();

  if (hasExpired) {
    return {
      message:
        "Token has expired. Log back in with your account to generate a valid access token.",
      isError: true,
    } as AuthResponse;
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { message: "Email does not exist.", isError: true } as AuthResponse;
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { email: existingToken.email, emailVerified: new Date() },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    message: "Email verified successfully.",
    isError: false,
  } as AuthResponse;
};

export const resetAccount = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", isError: true } as AuthResponse;
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      message: "This email is not associated to any account.",
      isError: true,
    } as AuthResponse;
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken) {
    return {
      message: "Something went wrong. Please try again.",
      isError: true,
    } as AuthResponse;
  }

  if (passwordResetToken) {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
  }

  return {
    message:
      "We are sending you a new email with a link to reset your password.",
    isError: false,
  } as AuthResponse;
};

export const updatePassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return {
      message: "Missing token. Please try again.",
      isError: true,
    } as AuthResponse;
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", isError: true } as AuthResponse;
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      message: "Invalid token. This token does not exist.",
      isError: true,
    } as AuthResponse;
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      message: "Token has expired. Re-request an email with a valid token.",
      isError: true,
    } as AuthResponse;
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { message: "Email does not exist.", isError: true } as AuthResponse;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    message: "Password updated successfully.",
    isError: false,
  } as AuthResponse;
};
