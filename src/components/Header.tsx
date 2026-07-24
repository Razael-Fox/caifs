'use client';

import React from 'react';
import Link from 'next/link';
import { Group, Title, Button, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { Home, FileCode, Smile, Link2 } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/converter', label: 'SVG Converter', icon: FileCode },
    { href: '/unicode', label: 'Unicode Generator', icon: Smile },
    { href: '/url-fetcher', label: 'URL Fetcher', icon: Link2 },
  ];

  return (
    <header className="site-header">
      <div
        className="header-inner"
        style={{
          maxWidth: '88rem',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '1rem',
          boxShadow: '0 4px 24px -6px rgba(0,0,0,0.5)',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '1.25rem',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Title
            order={3}
            className="gradient-text"
            style={{ fontSize: '1.2rem', fontWeight: 700 }}
          >
            CAIFS Studio
          </Title>
        </Link>

        {/* Desktop Navigation */}
        <Group gap="xs" visibleFrom="md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                variant={isActive ? 'filled' : 'subtle'}
                color={isActive ? 'pacificCyan' : 'gray'}
                size="sm"
                leftSection={<IconComponent size={16} />}
                style={{ borderRadius: '0.625rem', fontWeight: isActive ? 600 : 400 }}
              >
                {link.label}
              </Button>
            );
          })}
        </Group>

        {/* Mobile Hamburger */}
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          aria-label="Toggle navigation menu"
          color="#22d3ee"
          size="sm"
        />

        {/* Mobile Drawer */}
        <Drawer
          opened={opened}
          onClose={close}
          position="right"
          size="75%"
          hiddenFrom="md"
          title={
            <span className="gradient-text" style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Outfit, system-ui, sans-serif' }}>
              Menu Navigasi
            </span>
          }
          styles={{
            content: { backgroundColor: '#0f172a', color: '#f8fafc' },
            header: { backgroundColor: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)' },
          }}
        >
          <Stack gap="sm" mt="md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const IconComponent = link.icon;
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  onClick={close}
                  variant={isActive ? 'filled' : 'subtle'}
                  color={isActive ? 'pacificCyan' : 'gray'}
                  fullWidth
                  justify="start"
                  size="md"
                  leftSection={<IconComponent size={20} />}
                  style={{ borderRadius: '0.625rem', fontWeight: isActive ? 600 : 400 }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>
        </Drawer>
      </div>
    </header>
  );
}
