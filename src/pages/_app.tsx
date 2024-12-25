import type { AppType } from "next/app";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";

import AppLayout from "@/layouts/AppLayout";
import { trpc } from "@/utils/trpc";

import "@mantine/core/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
