import React from "react";
import { AppShell, AppShellProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

import MainHeader from "./Header";
import MainNavbar from "./Navbar";

export default function AppLayout(props: AppShellProps) {
  const router = useRouter();
  const adminPath = router.asPath.includes("/admin");
  const [opened, { toggle }] = useDisclosure();

  if (adminPath)
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <MainHeader opened={opened} toggle={toggle} />
        <MainNavbar />
        <AppShell.Main>{props.children}</AppShell.Main>
      </AppShell>
    );

  return props.children;
}
