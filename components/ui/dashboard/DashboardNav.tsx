'use client';

import SignOutButton from '@/components/ui/dashboard/SignOutButton';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { useState } from 'react';
import IconWrapper from '../IconWrapper';

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
  const [search, setSearch] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <div className="animate-dashboard-nav fixed z-50 left-1/2 -translate-x-1/2 w-[95%] bg-light-yellow dark:bg-dark-green rounded-xl min-h-14 h-fit  py-2 px-4 flex justify-center sm:justify-between items-end border border-dark-bg ">
      <div className="flex  w-full max-w-[1500px] mx-auto justify-between items-end">
        {/* welcome block - not visible on mobile */}
        {/* TODO: revisar esto */}
        <div className="gap-2 text-xl items-end hidden sm:flex h-full w-[50%]">
          <div className="gap-2 text-xl items-end mr-5 hidden sm:flex h-full">
            <div className="flex h-full items-center">
              {userAuthenticated.image ? (
                <UserAvatar className="size-14" src={userAuthenticated.image} />
              ) : (
                <DefaultUserAvatar className="size-14 opacity-40" />
              )}
            </div>
            <div>
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
            </div>
          </div>
        </div>
        {/* search bar and nav items */}
        <div className="flex  lg:items-end lg:w-full">
          <div className="flex items-end gap-2 w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              className={`${searchOpen ? 'block' : 'hidden'} lg:block lg:translate-x-1/2 w-[300px] h-10 px-5 text-xl font-bold placeholder:text-dark-grey placeholder:text-sm  border-2 border-dark-bg bg-dark-bg dark:border-light-grey rounded-lg`}
            />
            <IconWrapper
              type="search"
              strokeWidth={2}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`lg:hidden`}
            />
          </div>
          {userAuthenticated && <SignOutButton />}
        </div>
      </div>
    </div>
  );
}
