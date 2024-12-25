import React from "react";
import { AppShell, AppShellProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

import MainHeader from "./Header/Header";
import MainNavbar from "./Navbar/Navbar";

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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{props.children}</>;
}
