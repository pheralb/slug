import { router } from "./trpc";
import { authRouter } from "./auth";
import { linkRouter } from "./links.router";

export const appRouter = router({
  links: linkRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
