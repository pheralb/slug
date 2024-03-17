import z from "zod";

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  tagId: z.number().optional(),
});

export const CreateLinkSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL is required." })
    .url({
      message: "Please enter a valid URL. Include http:// or https://",
    })
    .regex(/^\S+$/, {
      message: "URL must not contain any blank spaces.",
    }),
  slug: z
    .string()
    .min(1, {
      message:
        "Short link is required. Enter a custom slug or click on 'Randomize' button.",
    })
    .regex(/^\S+$/, {
      message: "Custom short link must not contain any blank spaces.",
    }),
  description: z.string(),
});

export const EditLinkSchema = z.object({
  url: z.string().min(1, { message: "URL is required." }),
  slug: z.string().min(1, { message: "Short link is required." }),
  description: z.string(),
});

export const getSingleLinkSchema = z.object({
  linkId: z.number(),
});

// Login Schema:
export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  code: z.optional(z.string()),
});

// Create User Schema:
export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
});

// Reset Password Schema:
export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
});

// New Password Schema:
export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export type LinkSchema = z.TypeOf<typeof LinkSchema>;
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>;
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>;
