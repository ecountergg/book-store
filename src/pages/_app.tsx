import type { AppType } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

import { trpc } from "@/utils/trpc";

import "@mantine/core/styles.css";

const theme = createTheme({});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
