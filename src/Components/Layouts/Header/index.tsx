"use client";

import { AppShellHeader, Box, Burger, Title } from "@mantine/core";

import classes from "./index.module.css";

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function MainHeader({ opened, toggle }: Props) {
  return (
    <AppShellHeader className={classes.header}>
      <Box className={classes.inner}>
        <Box className={classes.wrapper}>
          <Burger opened={opened} hiddenFrom="sm" size="sm" onClick={toggle} />
          <Title order={3}>Book Store</Title>
        </Box>
      </Box>
    </AppShellHeader>
  );
}
