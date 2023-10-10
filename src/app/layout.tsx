import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: `Moster<dev/>`,
  description: `Jalo's personal website`,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <html lang='en' className={`${inter.variable} ${roboto_mono.variable}`}>
    <body>
      {children}
      <Analytics />
    </body>
  </html>
);

export default Layout;
