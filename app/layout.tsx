import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import Header from "../components/Header";

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
        <ThemeProvider attribute="class">
          <Header/>
          {children}
          {auth}
        </ThemeProvider>
      </body>
    </html>
  );
}
