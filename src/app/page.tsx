'use client';

import React from 'react';
import Link from 'next/link';
import { Title, Text, Group, Stack, Card, SimpleGrid, Button } from '@mantine/core';

const IconCode = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#82ddf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconSmile = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#82ddf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const IconLink = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#82ddf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

export default function HomePage() {
  const features = [
    {
      icon: <IconCode />,
      title: 'SVG Converter',
      description: 'Convert & customize raw SVG code into high-res PNG, JPG, or WEBP icons with custom background & gradients.',
      href: '/converter',
      badge: 'Most Popular',
    },
    {
      icon: <IconSmile />,
      title: 'Unicode Generator',
      description: 'Turn any emoji or Unicode character into beautiful app icons with customizable canvas padding and colors.',
      href: '/unicode',
      badge: 'Easy & Fast',
    },
    {
      icon: <IconLink />,
      title: 'URL Icon Fetcher',
      description: 'Fetch SVG icons directly from website URLs using proxy backend integration with high reliability.',
      href: '/url-fetcher',
      badge: 'Proxy Powered',
    },
  ];

  return (
    <Stack gap="xl" py="lg">
      <Stack align="center" justify="center" className="text-center my-6">
        <Title order={1} className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
          CAIFS Universal Icon Studio
        </Title>
        <Text c="dimmed" size="xl" className="max-w-2xl mt-2">
          Pilih fitur studio ikon yang ingin kamu gunakan. Ubah SVG, Unicode, atau tarik ikon dari URL dengan mudah.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {features.map((item) => (
          <Card key={item.href} className="glass-panel p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <Stack gap="md">
              <Group justify="space-between">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">{item.icon}</div>
                <Text size="xs" fw={700} c="cyan.4" className="uppercase tracking-wider">
                  {item.badge}
                </Text>
              </Group>

              <div>
                <Title order={3} c="white" mb="xs">
                  {item.title}
                </Title>
                <Text c="gray.4" size="sm">
                  {item.description}
                </Text>
              </div>
            </Stack>

            <Button 
              component={Link} 
              href={item.href} 
              color="pacificCyan" 
              fullWidth 
              mt="xl"
            >
              Buka {item.title}
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
