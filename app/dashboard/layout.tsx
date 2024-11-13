import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { checkUnseenMessages } from '@/actions/messagesServerActions/checkUnseenMessages';
import DashboardNav from '@/components/ui/dashboard/DashboardNav';
import NavItem from '@/components/ui/dashboard/NavItem';
import SignOutButton from '@/components/ui/dashboard/SignOutButton';
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
    redirect('/set-password');
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
    <main className="dashboard-main">
      <DashboardNav
        userAuthenticated={userAuthenticated}
        notifications={notifications}
      />
      <div className="dashboard-children">{children}</div>
    </main>
  );
};

export default DashboardLayout;
