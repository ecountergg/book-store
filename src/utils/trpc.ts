import type { TRPCLink } from "@trpc/client";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { ssrPrepass } from "@trpc/next/ssrPrepass";
import type { inferRouterOutputs } from "@trpc/server";
import type { NextPageContext } from "next";

import { AppRouter } from "@/server/router";
import getConfig from "next/config";
import superjson from "superjson";

// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export

const { publicRuntimeConfig } = getConfig();

const { APP_URL, PORT } = publicRuntimeConfig;

const getBaseUrl = () => {
  if (APP_URL) return `${APP_URL}api/trpc`;

  return `http://localhost:${PORT ?? 3000}`;
};

const getEndingLink = (
  ctx: NextPageContext | undefined
): TRPCLink<AppRouter> => {
  return httpBatchLink({
    /**
     * @see https://trpc.io/docs/v11/data-transformers
     */
    transformer: superjson,
    url: getBaseUrl(),
    headers() {
      if (!ctx?.req?.headers) {
        return {};
      }
      // on ssr, forward client's headers to the server
      return {
        ...ctx.req.headers,
        "x-ssr": "1",
      };
    },
  });
};

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @see https://trpc.io/docs/v11/react#3-create-trpc-hooks
 */
export const trpc = createTRPCNext<AppRouter>({
  /**
   * @see https://trpc.io/docs/v11/ssr
   */
  ssr: true,
  ssrPrepass,
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @see https://trpc.io/docs/v11/ssr
     */

    return {
      /**
       * @see https://trpc.io/docs/v11/client/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      /**
       * @see https://tanstack.com/query/v5/docs/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @see https://trpc.io/docs/v11/data-transformers
   */
  transformer: superjson,
});

// export const transformer = superjson;
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = RouterOutputs['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
