import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import NavItem from '@/components/ui/dashboard/NavItem';
import SignOutButton from '@/components/ui/dashboard/sigOutButton';
import { NotificationSpan } from '@/components/ui/NotificationSpan';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  if (userAuthenticated && !userAuthenticated.password) {
    redirect('/complete-profile');
  }

  // set the profile notifications for the user
  const notifications: string[] = [];
  for (let [key, value] of Object.entries(userAuthenticated)) {
    if (!value) {
      if (key !== 'password' && key !== 'emailVerified' && key !== 'name') {
        if (key === 'username') {
          notifications.push("Vous n'avez pas de nom d'utilisateur encore!");
        } else if (key === 'image') {
          notifications.push("Vous n'avez pas de photo encore!");
        }
      }
    }
  }

  return (
    <main className="h-dvh w-full p-2 flex flex-col gap-2 bg-light-ciel dark:bg-dark-bg">
      <div className="bg-light-yellow dark:bg-dark-green/40 rounded-xl min-h-[100px] py-2 px-4 flex justify-between items-end border border-dark-bg">
        <div className="flex gap-2 text-xl items-end">
          {userAuthenticated?.image ? (
            <UserAvatar className="size-14" src={userAuthenticated.image} />
          ) : (
            <DefaultUserAvatar className="size-14 opacity-40" />
          )}
          <p>Hello {userAuthenticated?.username}</p>
        </div>
        <ul className="flex gap-4 text-xl">
          <NavItem href="/dashboard">
            Profile
            {/* <NotificationSpan notifications={notifications.length} /> */}
          </NavItem>
          <NavItem href="/dashboard/messages">Messages</NavItem>
          <NavItem href="/dashboard/calendar">Calendar</NavItem>

          {/* <Link href="/dashboard/messages">Messages</Link>
          <Link href="/dashboard/Calendar">Calendar</Link>
          <Link href="/dashboard/settings">Settings</Link> */}
          <SignOutButton />
        </ul>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
