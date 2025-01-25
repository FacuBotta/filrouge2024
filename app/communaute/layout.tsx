import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  return (
    <div className="flex mt-10 min-h-screen gap-10 max-w-max w-full mx-auto ">
      {children}
    </div>
  );
}
