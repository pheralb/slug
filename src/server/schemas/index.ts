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
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: "Custom short link must not contain any blank spaces.",
    }),
  description: z
    .string()
    .max(100, { message: "The description must be less than 100 characters." }),
});

export const EditLinkSchema = z.object({
  id: z.number(),
  url: z.string().min(1, { message: "URL is required." }),
  slug: z
    .string()
    .min(1, { message: "Short link is required." })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: "Custom short link must not contain any blank spaces.",
    }),
  description: z
    .string()
    .max(100, { message: "The description must be less than 100 characters." }),
});

export const DeleteLinkSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required." }),
});

export const getSingleLinkSchema = z.object({
  linkId: z.number(),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(40, {
    message: "Name must be less than 40 characters.",
  }),
  username: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
});

export type LinkSchema = z.TypeOf<typeof LinkSchema>;
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>;
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>;
export type UpdateProfileInput = z.TypeOf<typeof UpdateProfileSchema>;
