import { linkRouter } from "@/server/api/routers/links.router";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  links: linkRouter,
});

export type AppRouter = typeof appRouter;
