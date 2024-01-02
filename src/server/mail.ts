import { Resend } from "resend";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
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
