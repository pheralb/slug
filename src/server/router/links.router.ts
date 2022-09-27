import { CreateLinkSchema, getSingleLinkSchema } from "@/schema/link.schema";
import { createProtectedRouter } from "./context";
import { prisma } from "@/server/db/client";

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
    resolve({ ctx }) {
      return prisma.link?.findMany({
        where: {
          creatorId: ctx.session.user.id,
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
