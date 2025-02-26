import Footer from '@/components/layouts/Footer';
import { Fredoka } from '@/public/fonts/localFonts';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import React from 'react';
import { Toaster } from 'sonner';
import Header from '../components/layouts/header/Header';
import './globals.css';
import { Providers } from './providers';

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: 'EventHub',
  description:
    "EventHub est votre solution pour la gestion d'événements et la planification de rendez-vous. Simplifiez les activités de votre organisation avec notre interface moderne et intuitive. Que vous planifiiez un petit rassemblement ou un grand événement, EventHub offre les outils nécessaires pour réussir.",
  /* openGraph: {
    title: 'EventHub',
    description:
      "EventHub est votre solution pour la gestion d'événements et la planification de rendez-vous. Simplifiez les activités de votre organisation avec notre interface moderne et intuitive.",
    url: 'eventhub.facudev.fr',
    siteName: 'EventHub',
    images: [
      {
        url: 'eventhub.facudev.fr/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EventHub logo',
      },
    ],
    type: 'website',
  }, */
};

export default async function RootLayout({
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
        <body className={`${Fredoka.variable} font-fredoka `}>
          <Providers>
            <Header />
            <main className="main-container">{children}</main>
            {auth}
            <Toaster
              richColors
              position="top-right"
              closeButton={true}
              toastOptions={{ style: { marginTop: '20px' } }}
            />
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
