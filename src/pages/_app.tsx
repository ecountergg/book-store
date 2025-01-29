import type { AppType } from "next/app";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import AppLayout from "@/components/Layouts/AppLayout";
import { trpc } from "@/utils/trpc";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <AppLayout>
        <Notifications position="bottom-right" />

        <Component {...pageProps} />
      </AppLayout>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
