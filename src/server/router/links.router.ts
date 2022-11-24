import {
  FilterLinkSchema,
  CreateLinkSchema,
  getSingleLinkSchema,
  EditLinkSchema,
} from "@/schema/link.schema";

import { z } from "zod";
import { router, publicProcedure } from "./trpc";

export const linkRouter = router({
  // Create new link =>
  createLink: publicProcedure
    .input(CreateLinkSchema)
    .mutation(({ ctx, input }) => {
      const newLink = ctx.prisma.link.create({
        data: {
          ...input,
          creatorId: ctx.session?.user?.id,
        },
      });
      return newLink;
    }),

  // Edit link =>
  editLink: publicProcedure.input(EditLinkSchema).mutation(({ ctx, input }) => {
    const editedLink = ctx.prisma.link.update({
      where: { slug: input.slug },
      data: {
        ...input,
        creatorId: ctx.session?.user?.id,
      },
    });
    return editedLink;
  }),

  // Delete link =>
  deleteLink: publicProcedure
    .input(getSingleLinkSchema)
    .mutation(({ ctx, input }) => {
      const deletedLink = ctx.prisma.link.delete({
        where: { id: input.linkId },
      });
      return deletedLink;
    }),

  // Get all links =>
  allLinks: publicProcedure.input(FilterLinkSchema).query(({ ctx, input }) => {
    return ctx.prisma.link?.findMany({
      where: {
        creatorId: ctx.session?.user?.id,
        AND: input.filter
          ? [
              {
                OR: [
                  { url: { contains: input.filter } },
                  { slug: { contains: input.filter } },
                  { description: { contains: input.filter } },
                ],
              },
            ]
          : undefined,
      },
    });
  }),

  // Get single link =>
  singleLink: publicProcedure
    .input(getSingleLinkSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.link?.findUnique({
        where: {
          id: input.linkId,
        },
      });
    }),

  // Check if slug is available =>
  checkSlug: publicProcedure
  .input(z.object({ customSlug: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return ctx.prisma.link?.findUnique({
        where: {
          slug: input?.customSlug,
        },
      });
    }),
});
