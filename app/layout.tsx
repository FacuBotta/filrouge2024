import "./globals.css";
import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { Providers } from "./providers";

import React from "react";
import Header from "../components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const fredoka = Fredoka({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "EventHub",
  description: "EventHub is your solution for event management and appointment booking. Simplify your organization's activities with our modern and intuitive interface. With EventHub, you can easily sync your events with Google Calendar, manage your tasks, and communicate effectively with your colleagues. Whether you're planning a small gathering or a large event, EventHub offers the necessary tools to succeed.",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.className}>
        <Providers>
          <Header/>
          {children}
          {auth}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
