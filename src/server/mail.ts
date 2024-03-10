import { Resend } from "resend";
import { env } from "@/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/verify?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Slug - Confirm your email",
    html:
      "<p>Click <a href='" +
      confirmLink +
      "'>here</a> to confirm your email.</p>",
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Slug - Reset your password",
    html:
      "<p>Click <a href='" +
      resetLink +
      "'>here</a> to reset your password.</p>",
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Slug - 2FA Code",
    html: "<p>Your 2FA code is <strong>" + token + "</strong>.</p>",
  });
};
