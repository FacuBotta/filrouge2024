import { selectAllEvents } from '@/actions/eventsServerActions/selectAllEvents';
import { Category, Events } from '@prisma/client';
import AllEventsPage from './EventsPage';
import { selectCategories } from '@/actions/eventsServerActions/selectCategories';
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

export default async function EventsPage() {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  if (userAuthenticated && !userAuthenticated.password) {
    redirect('/set-password');
  }
  const allEvents: Category[] = await selectAllEvents();

  return (
    <main className="dashboard-main">
      <DashboardNav userAuthenticated={userAuthenticated} />
      <div className="dashboard-children">
        <AllEventsPage events={allEvents} />
      </div>
    </main>
  );
}
