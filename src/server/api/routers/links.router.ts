import { z } from "zod";

import {
  CreateLinkSchema,
  getSingleLinkSchema,
  EditLinkSchema,
} from "@/server/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";

export const linkRouter = createTRPCRouter({
  // Create new link =>
  createLink: protectedProcedure
    .input(CreateLinkSchema)
    .mutation(({ ctx, input }) => {
      const newLink = ctx.db.link.create({
        data: {
          ...input,
          creatorId: ctx.session?.user?.id,
        },
      });
      return newLink;
    }),

  // Edit link =>
  editLink: protectedProcedure
    .input(EditLinkSchema)
    .mutation(({ ctx, input }) => {
      const editedLink = ctx.db.link.update({
        where: { slug: input.slug },
        data: {
          ...input,
          creatorId: ctx.session?.user?.id,
        },
      });
      return editedLink;
    }),

  // Delete link =>
  deleteLink: protectedProcedure
    .input(getSingleLinkSchema)
    .mutation(({ ctx, input }) => {
      const deletedLink = ctx.db.link.delete({
        where: { id: input.linkId },
      });
      return deletedLink;
    }),

  // Get all links =>
  allLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link?.findMany({
      where: {
        creatorId: ctx.session?.user?.id,
      },
    });
  }),

  // Get single link =>
  singleLink: publicProcedure
    .input(getSingleLinkSchema)
    .query(({ ctx, input }) => {
      return ctx.db.link?.findUnique({
        where: {
          id: input.linkId,
        },
      });
    }),

  // Check if slug is available =>
  checkSlug: publicProcedure
    .input(z.object({ customSlug: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return ctx.db.link?.findUnique({
        where: {
          slug: input?.customSlug ?? "",
        },
      });
    }),
});
