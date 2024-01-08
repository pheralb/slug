import { linkRouter } from "@/server/api/routers/links.router";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  linksRouter: linkRouter,
});

export type AppRouter = typeof appRouter;
