import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { selectUserEvents } from '@/actions/eventsServerActions/selectUserEvents';
import { selectUserEventsJoined } from '@/actions/eventsServerActions/selectUserEventsJoined';
import { selectUserTasks } from '@/actions/TasksServerActions/selectUserTasks';
import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import selectUserById from '@/actions/userServerActions/selectUserById';
import PageHeader from '@/components/layouts/PageHeader';
import OwnerEventCard from '@/components/ui/cards/OwnerEventCard';
import SignOutButton from '@/components/ui/dashboard/SignOutButton';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import UserCard from '@/components/ui/dashboard/UserCard';
import IconWrapper from '@/components/ui/IconWrapper';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import {
  BasicProfileInformation,
  EventWithUserAndCount,
  UserJoinedEvent,
} from '@/types/types';
import { Tasks } from '@prisma/client';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
import React from 'react';
const DashboardPage: React.FC = async () => {
  const { user } = await checkIsAuthenticated();
  const contacts = await selectAllBasicUserInfos();
  const userData: BasicProfileInformation | null = await selectUserById(
    user?.id as string
  );
  if (!userData) {
    redirect('/login');
  }
  const { description, username, email, image } = userData;
  const userTasks: Tasks[] = await selectUserTasks();
  const userEventsCreated: EventWithUserAndCount[] = await selectUserEvents();
  // TODO : ver si es necesario o que... puedo recuperar directamente desde las userInvitation
  const userEventsJoined: UserJoinedEvent[] = await selectUserEventsJoined();

  return (
    <section className="min-h-screen mt-10 relative px-2 w-full max-w-max mx-auto flex flex-col sm:!flex-row justify-start gap-5 divide-y sm:divide-y-0 sm:divide-x ">
      {/* profile section - left side */}
      <aside className="w-full sm:sticky top-24 max-w-[400px] h-fit p-5 flex">
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
          <SignOutButton />
          <div className="relative">
            <Link aria-label="Éditer profile" href="/profile/edition">
              <IconWrapper
                type="edit"
                strokeWidth={2}
                className="hover:scale-110 hover:dark:text-dark-greenLight transition-all ease-in-out absolute bottom-2 right-[-10px]"
              />
            </Link>
            <UserAvatar src={image} className="size-[200px]" />
          </div>
          <h1 className="font-bold text-2xl">{username || email}</h1>
          {/* TODO: arreglar cuando hago hover... */}
          <RantingUser ranting={4} />

          <h2 className="font-bold text-2xl">Bio</h2>
          {description && description.length > 0 ? (
            <p className="text-balance text-center mx-auto">{description}</p>
          ) : (
            <div className="h-[200px] flex items-center justify-center p-2 border-2 border-dark-bg dark:border-white bg-dark-grey/40 rounded-xl">
              <p className="text-center">
                Il semble que tu n&apos;as pas encore ajouté ton bio! Prende un
                moment pour compléter ton profil et accéder à toutes les
                fonctionnalités de l&apos;application. Nous avons hâte de mieux
                te connaître!
              </p>
            </div>
          )}
        </div>
      </aside>
      {/* right side */}
      <main className="flex flex-col w-full text-center sm:text-left gap-5 lg:gap-10 pb-10 px-2 sm:px-5">
        <header>
          <PageHeader title="Mon profil" searchType="all" />
          <div>
            <h1 className="font-bold text-2xl mb-5">Mes notes</h1>
          </div>
        </header>
        <TasksProfile tasks={userTasks} />

        <div className="flex flex-col gap-5 w-full ">
          <div className="flex w-full justify-between">
            <h1 className="font-bold text-2xl">Mes événements crées</h1>
            <Link className="primary-btn" href={'/events/new'}>
              Creer un événement 📅
            </Link>
          </div>
          {userEventsCreated?.length === 0 ? (
            <p>Vous n&apos;avez pas encore créé d&apos;événement</p>
          ) : (
            userEventsCreated.map((event: EventWithUserAndCount) => (
              <OwnerEventCard
                key={event.id}
                event={event}
                contacts={contacts}
              />
            ))
          )}

          <h1 className="font-bold text-2xl">Mes événements a venir</h1>
          {userEventsJoined?.length === 0 ? (
            <div>
              <p>Vous n&apos;avez pas encore rejoint des événements</p>
            </div>
          ) : (
            // TODO: add a button to join an event
            userEventsJoined.map((event: UserJoinedEvent) => (
              <div
                key={event.id}
                className="w-full flex border border-dark-bg dark:border-light-grey rounded-lg p-5 gap-5 flex-col"
              >
                <h1 className="font-bold text-2xl">{event.title}</h1>
                <p>{event.description}</p>
              </div>
            ))
          )}
          <Link className="primary-btn" href={'/events'}>
            Découvrir les événements 🚀
          </Link>
          <h1 className="font-bold text-2xl">Mes contactes</h1>
          <div className="flex flex-wrap gap-5 w-full ">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserCard
                key={i}
                user={{
                  id: '1',
                  username: 'Username',
                  image: '',
                  description: 'Lorem ipsum dolor sit amet consectetur',
                  email: 'user@mail.com',
                  _count: {
                    Ratings: 0,
                    EventsCreated: 0,
                  },
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;
