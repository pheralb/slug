import z from "zod";

export const CreateLinkSchema = z.object({
  url: z.string().min(10),
  slug: z.string().max(256, "Max 256 characters"),
  description: z.string(),
});

export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>

export const getSingleLinkSchema = z.object({
  linkId: z.number(),
});
