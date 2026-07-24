'use client';

import React from 'react';
import Link from 'next/link';
import { Group, Title, Button, Container } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { t } from '../lib/strings';

const IconSparkles = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#82ddf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/converter', label: 'SVG Converter' },
    { href: '/unicode', label: 'Unicode Generator' },
    { href: '/url-fetcher', label: 'URL Fetcher' },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
      <Container size="xl" className="h-16 flex items-center justify-between px-4">
        <Link href="/" className="no-underline">
          <Group gap="xs">
            <IconSparkles />
            <Title order={3} className="text-xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
              {t('app.title')}
            </Title>
          </Group>
        </Link>

        <Group gap="xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                variant={isActive ? 'filled' : 'subtle'}
                color={isActive ? 'pacificCyan' : 'gray.3'}
                size="sm"
              >
                {link.label}
              </Button>
            );
          })}
        </Group>
      </Container>
    </header>
  );
}
