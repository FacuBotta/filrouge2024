'use client';

import { UserAvatar } from '@/public/images/UserAvatar';

type Notifications = {
  profile: number;
  messages: number;
};

export default function DashboardNav({
  userAuthenticated,
  notifications,
}: {
  userAuthenticated: any;
  notifications?: Notifications;
}) {
  return (
    <div className="animate-dashboard-nav fixed left-10 z-50 w-[100px] h-[100px] rounded-lg p-5 flex justify-center border-2 border-dark-bg  bg-light-yellow dark:bg-dark-green overflow-hidden">
      <UserAvatar className="size-14" src={userAuthenticated.image} />
      {/* <div>
          <p className="text-xl">
            Salut{' '}
            {userAuthenticated?.username
              ? userAuthenticated.username
              : userAuthenticated.email}{' '}
            !
          </p>
          <p className="font-extralight text-lg">
            Dernier connexion le{' '}
            {userAuthenticated?.updatedAt.toLocaleDateString('fr-FR')} a{' '}
            {userAuthenticated?.updatedAt.toLocaleTimeString('fr-FR')}
          </p>
        </div> */}
      {/* <SignOutButton /> */}
    </div>
  );
}
