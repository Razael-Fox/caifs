import React from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { theme } from '../theme';
import { Header } from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'CAIFS - Universal Icon Studio',
  description: 'Convert SVG, generate Unicode icons, and fetch icon URLs easily with modern UI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Header />
          <main className="site-main">
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
