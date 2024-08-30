import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import SignOutButton from '@/components/ui/sigOutButton';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen w-full p-2 flex flex-col gap-2">
      <div className="bg-light-yellow col-span-3 h-[100px]">
        <SignOutButton />
        <ul>
          <Link href="/dashboard">Profile</Link>
          <Link href="/dashboard/messages">Messages</Link>
          <Link href="/dashboard/Calendar">Calendar</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </ul>
      </div>
      <main className="bg-light-blue dark:bg-dark-bg flex justify-between gap-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
