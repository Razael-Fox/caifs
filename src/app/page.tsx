'use client';

import React from 'react';
import Link from 'next/link';
import { Title, Text, Group, Stack, Card, SimpleGrid, Button } from '@mantine/core';
import { FileCode, Smile, Link2 } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <FileCode size={32} color="#22d3ee" />,
      title: 'SVG Converter',
      description: 'Convert & customize raw SVG code into high-res PNG, JPG, or WEBP icons with custom background & gradients.',
      href: '/converter',
      badge: 'Most Popular',
    },
    {
      icon: <Smile size={32} color="#22d3ee" />,
      title: 'Unicode Generator',
      description: 'Turn any emoji or Unicode character into beautiful app icons with customizable canvas padding and colors.',
      href: '/unicode',
      badge: 'Easy & Fast',
    },
    {
      icon: <Link2 size={32} color="#22d3ee" />,
      title: 'URL Icon Fetcher',
      description: 'Fetch SVG icons directly from website URLs using proxy backend integration with high reliability.',
      href: '/url-fetcher',
      badge: 'Proxy Powered',
    },
  ];

  return (
    <Stack gap="xl" py="lg">
      <Stack align="center" justify="center" style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        <Title
          order={1}
          className="gradient-text"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: 800 }}
        >
          CAIFS Universal Icon Studio
        </Title>
        <Text c="dimmed" size="xl" style={{ maxWidth: '36rem', marginTop: '0.5rem' }}>
          Pilih fitur studio ikon yang ingin kamu gunakan. Ubah SVG, Unicode, atau tarik ikon dari URL dengan mudah.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {features.map((item) => (
          <Card
            key={item.href}
            className="glass-panel feature-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Stack gap="md">
              <Group justify="space-between">
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(71, 85, 105, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 0,
                  }}
                >
                  {item.icon}
                </div>
                <Text size="xs" fw={700} c="cyan.4" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
