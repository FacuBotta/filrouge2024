import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import NavItem from './NavItem';
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
  return (
    <div className=" bg-light-yellow dark:bg-dark-green/40 rounded-xl mx-2 overflow-x-scroll no-scrollbar min-h-14 sm:min-h-[100px] py-2 px-4 flex sm:justify-between items-end border border-dark-bg ">
      <div className="flex  w-full max-w-[1500px] mx-auto justify-between items-end">
        {/* welcome block - not visible on mobile */}
        <div className="gap-2 text-xl items-end mr-5 hidden sm:flex h-full">
          <div className="gap-2 text-xl items-end mr-5 hidden sm:flex h-full">
            <div className="flex h-full items-center">
              {userAuthenticated.image ? (
                <UserAvatar className="size-14" src={userAuthenticated.image} />
              ) : (
                <DefaultUserAvatar className="size-14 opacity-40" />
              )}
            </div>
            <div>
              <p className="text-2xl">
                Salut{' '}
                {userAuthenticated?.username
                  ? userAuthenticated.username
                  : userAuthenticated.email}{' '}
                !
              </p>
              <p className="font-extralight text-lg">
                Dernier connexion le{' '}
                {userAuthenticated?.updatedAt.toLocaleDateString()} a{' '}
                {userAuthenticated?.updatedAt.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        {/* nav items */}
        <ul className="flex gap-4 text-xl mx-auto sm:m-0 ">
          <li className="flex">
            <label
              htmlFor="search"
              className="cursor-pointer flex flex-row-reverse  "
            >
              <input
                type="checkbox"
                className="hidden peer/smallScreen"
                id="search"
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="absolute left-1/2 -translate-x-1/2 bottom-[80px] sm:top-[150px] lg:top-[100px]  hidden lg:block  peer-checked/smallScreen:block w-[350px] h-10 px-5 text-xl font-bold placeholder:text-dark-grey placeholder:text-sm  border-2 border-dark-bg bg-dark-bg dark:border-light-grey rounded-lg"
              />
              <IconWrapper
                type="search"
                strokeWidth={2}
                className="lg:hidden"
              />
            </label>
          </li>
          <NavItem href="/dashboard" notifications={notifications?.profile}>
            <IconWrapper type="user" strokeWidth={2} />
          </NavItem>
          <NavItem
            href="/dashboard/messages"
            notifications={notifications?.messages}
          >
            <IconWrapper type="message" strokeWidth={2} />
          </NavItem>
          <NavItem href="/dashboard/calendar">
            <IconWrapper type="calendar" strokeWidth={2} />
          </NavItem>
        </ul>
      </div>
    </div>
  );
}
