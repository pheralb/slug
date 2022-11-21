import {
  FilterLinkSchema,
  CreateLinkSchema,
  getSingleLinkSchema,
  EditLinkSchema,
} from "@/schema/link.schema";
import { createProtectedRouter } from "./context";
import { prisma } from "@/server/db/client";
import { TRPCError } from "@trpc/server";

export const linkRouter = createProtectedRouter()
  // Create new link =>
  .mutation("create-link", {
    input: CreateLinkSchema,
    async resolve({ ctx, input }) {
      const existedSlug = await prisma.link.findUnique({
        where: { slug: input.slug },
      });

      if (existedSlug)
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "Custom slug not available. Type another one or click on random.",
        });

      const newLink = await prisma.link?.create({
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });
      return newLink;
    },
  })
  // Edit link =>
  .mutation("edit-link", {
    input: EditLinkSchema,
    async resolve({ ctx, input }) {
      const editedLink = await prisma.link.update({
        where: { slug: input.slug },
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });
      return editedLink;
    },
  })
  // Delete link =>
  .mutation("delete-link", {
    input: getSingleLinkSchema,
    async resolve({ ctx, input }) {
      const deletedLink = await prisma.link.delete({
        where: { id: input.linkId },
      });
      return deletedLink;
    },
  })
  // Fetch links =>
  .query("links", {
    input: FilterLinkSchema,
    async resolve({ ctx, input }) {
      return prisma.link?.findMany({
        where: {
          creatorId: ctx.session.user.id,
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
    },
  })
  // Get single link info =>
  .query("single-link", {
    input: getSingleLinkSchema,
    resolve({ input, ctx }) {
      return prisma.link?.findUnique({
        where: {
          id: input.linkId,
        },
      });
    },
  });
