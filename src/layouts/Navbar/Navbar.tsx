"use client";

import { AppShellNavbar, ScrollArea } from "@mantine/core";
import { IconBook, IconGauge } from "@tabler/icons-react";

import NavLinksGroup from "./NavbarLinksGroup";

import classes from "./navbar.module.css";

export default function MainNavbar() {
  const mockNavbar = () => [
    {
      label: "Dashboard",
      icon: IconGauge,
      link: "/admin",
    },
    {
      label: "Book Management",
      icon: IconBook,
      initiallyOpened: true,
      links: [
        {
          label: "Book",
          link: "/admin/book-management/book",
          pathKey: "/admin/book-management/book",
        },
        {
          label: "Author",
          link: "/admin/book-management/author",
          pathKey: "/admin/book-management/author",
        },
        {
          label: "Category",
          link: "/admin/book-management/category",
          pathKey: "/admin/book-management/category",
        },
      ],
    },
  ];

  const links = mockNavbar().map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  return (
    <AppShellNavbar>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </AppShellNavbar>
  );
}
