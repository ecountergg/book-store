import { authRouter } from "./api/routers/auth";
import { categoryRouter } from "./api/routers/category";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
