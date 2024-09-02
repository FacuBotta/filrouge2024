import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import SignOutButton from '@/components/ui/dashboard/sigOutButton';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }

  return (
    // TODO: add margin top tu scroll...
    <main className="max-h-screen w-full p-2 flex flex-col gap-2 bg-light-ciel dark:bg-dark-bg scroll-pt-[100px] snap-y snap-start ">
      <div className="bg-light-yellow dark:bg-dark-greenLight/50 rounded-xl h-[100px] p-2 flex justify-between items-end">
        <SignOutButton />
        <ul className="flex gap-2 text-xl">
          <Link href="/dashboard">Profile</Link>
          <Link href="/dashboard/messages">Messages</Link>
          <Link href="/dashboard/Calendar">Calendar</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </ul>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
