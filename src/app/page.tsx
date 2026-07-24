'use client';

import { Container, Title, Text, Button, Paper, Group } from '@mantine/core';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Container size="sm" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Title order={1} ta="center" mb="md">
            Next.js + Mantine UI + Framer Motion
          </Title>
          <Text c="dimmed" ta="center" mb="xl">
            Proyek berhasil di-setup dengan PNPM & TypeScript di Termux!
          </Text>

          <Group justify="center">
            <Button variant="filled" color="blue">
              Mantine Button
            </Button>
          </Group>
        </Paper>
      </motion.div>
    </Container>
  );
}
