import Footer from '@/components/layouts/Footer';
import { Fredoka } from '@/public/fonts/localFonts';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import React from 'react';
import Header from '../components/layouts/header/Header';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'EventHub',
  description:
    "EventHub is your solution for event management and appointment booking. Simplify your organization's activities with our modern and intuitive interface. With EventHub, you can easily sync your events with Google Calendar, manage your tasks, and communicate effectively with your colleagues. Whether you're planning a small gathering or a large event, EventHub offers the necessary tools to succeed.",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        className="overflow-y-scroll scroll-smooth snap-y snap-proximity"
        lang="en"
        suppressHydrationWarning
      >
        <body className={`${Fredoka.variable} font-fredoka`}>
          <Providers>
            <Header />
            {children}
            {auth}
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
