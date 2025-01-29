'use client';

import React, { useState } from 'react';
import { Box, Collapse, Group, ThemeIcon, UnstyledButton, useDirection } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classes from './navbar-links-group.module.css';

interface LinksGroupProps {
  icon: React.FC;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export default function NavLinksGroup({
  icon: Icon,
  label,
  link: menuLink,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const pathname = usePathname();
  const { dir } = useDirection();

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => {
    return (
      <Link
        href={link.link}
        key={link.label}
        className={clsx(classes.link, link.link === pathname && classes.activeControl)}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <>
      {menuLink ? (
        <Link
          href={menuLink}
          className={`${classes.control} ${menuLink === pathname && classes.activeControl}`}
        >
          <Group gap={0} justify="space-between">
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </Link>
      ) : (
        <UnstyledButton
          onClick={() => {
            if (hasLinks) {
              setOpened((o) => !o);
            }
          }}
          className={classes.control}
        >
          <Group gap={0} justify="space-between">
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${dir === 'rtl' ? -90 : 90}deg)` : 'none',
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
