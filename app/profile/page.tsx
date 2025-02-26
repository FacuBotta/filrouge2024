import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import selectProfileData from '@/actions/userServerActions/selectUserData';
import PageHeader from '@/components/layouts/PageHeader';
import CommentCard from '@/components/ui/cards/CommentCard';
import OwnerEventCard from '@/components/ui/cards/OwnerEventCard';
import EventCard from '@/components/ui/dashboard/EventCard';
import SignOutButton from '@/components/ui/dashboard/SignOutButton';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicEventData, UserComment, UserData } from '@/types/types';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfilePage: React.FC = async () => {
  const userData: UserData | null = await selectProfileData();

  if (!userData) {
    redirect('/login');
  }
  const contacts = await selectAllBasicUserInfos();

  const {
    description,
    username,
    email,
    image,
    comments,
    eventsCreated,
    eventsJoined,
    tasks,
    score,
  } = userData;
  return (
    <section className="min-h-screen mt-10 relative px-2 w-full max-w-max mx-auto flex flex-col sm:!flex-row justify-start gap-5 divide-light-borderCards dark:divide-dark-borderCards divide-y sm:divide-y-0 sm:divide-x ">
      {/* profile section - left side */}
      <aside className="w-full sm:sticky top-24 max-w-[400px] h-fit p-5 flex justify-center">
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
          <RantingUser ranting={score} />

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
            <h1 className="font-bold text-2xl">Mes notes</h1>
          </div>
        </header>
        <TasksProfile tasks={tasks} />

        <div className="flex flex-col gap-5 w-full ">
          <div className="flex w-full justify-between">
            <h1 className="font-bold text-2xl">Mes événements crées</h1>
            <Link className="primary-btn" href={'/events/new'}>
              Creer un événement 📅
            </Link>
          </div>
          {eventsCreated?.length === 0 ? (
            <p className="opacity-50">
              Vous n&apos;avez pas encore créé d&apos;événement
            </p>
          ) : (
            eventsCreated.map((event: BasicEventData) => (
              <OwnerEventCard
                key={event.id}
                event={event}
                contacts={contacts}
              />
            ))
          )}
          <div className="flex w-full justify-between">
            <h1 className="font-bold text-2xl">Mes événements a venir</h1>
            <Link className="primary-btn" href={'/events'}>
              Découvrir les événements 🚀
            </Link>
          </div>
          {eventsJoined?.length === 0 ? (
            <div>
              <p className="opacity-50">
                Vous n&apos;avez pas encore rejoint des événements
              </p>
            </div>
          ) : (
            eventsJoined.map((event: BasicEventData) => (
              <EventCard
                key={event.id}
                event={event}
                category={event.category}
              />
            ))
          )}

          <h1 className="font-bold text-2xl">Mes avis</h1>
          <div className="flex flex-wrap gap-5 w-full ">
            {comments?.length > 0 ? (
              comments?.map((comment: UserComment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="opacity-50">Aucun avis pour le moment</p>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProfilePage;
