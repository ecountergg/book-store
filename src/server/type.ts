import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryOptions } from "@trpc/react-query/shared";

import { AppRouter } from "./router";

export type TRPCQueryError<T> = UseTRPCQueryOptions<
  T,
  T,
  TRPCClientErrorLike<AppRouter>
>;
