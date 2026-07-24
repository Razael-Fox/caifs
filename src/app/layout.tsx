import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Header } from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'CAIFS - Universal Icon Tool',
  description: 'Convert SVG, generate Unicode icons, and fetch icon URLs easily.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <main className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
