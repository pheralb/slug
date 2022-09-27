import z from "zod";

export const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>

export const getSingleLinkSchema = z.object({
  linkId: z.number(),
});
