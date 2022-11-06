import { FilterLinkSchema, CreateLinkSchema, getSingleLinkSchema } from "@/schema/link.schema";
import { createProtectedRouter } from "./context";
import { prisma } from "@/server/db/client";
import { TRPCError } from "@trpc/server";

// export const protectedExampleRouter = createProtectedRouter()
//   .query("getSession", {
//     resolve({ ctx }) {
//       return ctx.session;
//     },
//   })
//   .query("getSecretMessage", {
//     resolve({ ctx }) {
//       return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
//     },
//   });

export const linkRouter = createProtectedRouter()
  .mutation("create-link", {
    input: CreateLinkSchema,
    async resolve({ ctx, input }) {
      const existedSlug = await prisma.link.findUnique({
        where: { slug: input.slug }
      });

      if (existedSlug) throw new TRPCError({ code: "CONFLICT", message: "slug name not available. Type another one or click on random." });

      const newLink = await prisma.link?.create({
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });
      return newLink;
    },
  })
  .query("links", {
    input: FilterLinkSchema,
    async resolve({ ctx, input }) {
      return prisma.link?.findMany({
        where: {
          creatorId: ctx.session.user.id,
          AND: input.filter ? [
            {
              OR: [
                { url: { contains: input.filter } },
                { slug: { contains: input.filter } },
                { description: { contains: input.filter } },
              ],
            }
          ] : undefined
        },
      });
    },
  })
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
