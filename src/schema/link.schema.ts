import z from "zod";

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string(),
});

export const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string(),
});

export const EditLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type LinkSchema = z.TypeOf<typeof LinkSchema>
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>

export const FilterLinkSchema = z.object({
  filter: z.string(),
});

export type FilterLinkInput = z.TypeOf<typeof FilterLinkSchema>

export const getSingleLinkSchema = z.object({
  linkId: z.number(),
});
