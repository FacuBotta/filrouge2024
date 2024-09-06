import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { checkUnseenMessages } from '@/actions/messagesServerActions/checkUnseenMessages';
import NavItem from '@/components/ui/dashboard/NavItem';
import SignOutButton from '@/components/ui/dashboard/sigOutButton';
import IconWrapper from '@/components/ui/IconWrapper';
import { NotificationSpan } from '@/components/ui/NotificationSpan';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { Icon } from 'facu-ui';
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

  type Notifications = {
    profile: number;
    messages: number;
  };

  let notifications: Notifications = {
    profile: 0,
    messages: 0,
  };

  for (let [key, value] of Object.entries(userAuthenticated)) {
    if (!value) {
      if (key !== 'password' && key !== 'emailVerified' && key !== 'name') {
        if (key === 'username') {
          notifications.profile++;
        } else if (key === 'image') {
          notifications.profile++;
        }
      }
    }
  }
  // get the messages notifications
  notifications.messages = await checkUnseenMessages(userAuthenticated.id);
  return (
    <main className="h-dvh w-full pb-14  flex flex-col-reverse sm:flex-col gap-2 bg-light-ciel dark:bg-dark-bg">
      <div className="bg-light-yellow dark:bg-dark-green/40 rounded-xl mx-2 overflow-x-scroll no-scrollbar min-h-11 sm:min-h-[100px] py-2 px-4 flex sm:justify-between items-end border border-dark-bg">
        <div className="gap-2 text-xl items-end mr-5 hidden sm:flex">
          {userAuthenticated?.image ? (
            <UserAvatar className="size-14" src={userAuthenticated.image} />
          ) : (
            <DefaultUserAvatar className="size-14 opacity-40" />
          )}
          <p className="">Hello {userAuthenticated?.username}</p>
        </div>
        <ul className="flex gap-4 text-xl mx-auto sm:m-0 ">
          <NavItem href="/dashboard" notifications={notifications.profile}>
            <IconWrapper type="user" strokeWidth={2} />
          </NavItem>
          <NavItem
            href="/dashboard/messages"
            notifications={notifications.messages}
          >
            <IconWrapper type="message" strokeWidth={2} />
          </NavItem>
          <NavItem href="/dashboard/calendar">
            <IconWrapper type="calendar" strokeWidth={2} />
          </NavItem>
        </ul>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
