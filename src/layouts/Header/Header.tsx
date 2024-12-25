"use client";

import { AppShellHeader, Box, Burger, Image } from "@mantine/core";

import classes from "./header.module.css";

type Props = {
  opened: boolean;
  image?: string;
  toggle: () => void;
};

export default function MainHeader({ opened, image, toggle }: Props) {
  return (
    <AppShellHeader className={classes.header}>
      <Box className={classes.inner}>
        <Box className={classes.wrapper}>
          <Burger opened={opened} hiddenFrom="sm" size="sm" onClick={toggle} />
          <Image
            src={
              image ??
              "https://d24eqpince6acm.cloudfront.net/assets/images/logo/logo.png"
            }
            alt="Logo"
            height={100}
            width={100}
            className={classes.logo}
          />
        </Box>
      </Box>
    </AppShellHeader>
  );
}
