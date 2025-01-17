import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { selectUserEvents } from '@/actions/eventsServerActions/selectUserEvents';
import { selectUserEventsJoined } from '@/actions/eventsServerActions/selectUserEventsJoined';
import { selectUserTasks } from '@/actions/TasksServerActions/selectUserTasks';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import { UserJoinedEvent } from '@/types/types';
import { Events, Tasks } from '@prisma/client';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  if (userAuthenticated && !userAuthenticated.password) {
    redirect('/set-password');
  }
  const { id, description, username, email, image } = userAuthenticated;
  const userTasks: Tasks[] = await selectUserTasks(id as string);
  const userEventsCreated: Events[] = await selectUserEvents(id as string);
  const userEventsJoined: UserJoinedEvent[] = await selectUserEventsJoined(
    id as string
  );

  return (
    <section className="min-h-screen mt-32 relative px-2 w-full max-w-max mx-auto flex flex-col sm:!flex-row justify-start gap-5 divide-y sm:divide-y-0 sm:divide-x ">
      {/* profile section - left side */}
      <div className="w-full sticky top-24 max-w-[400px] h-fit p-5 flex">
        <div className="flex flex-col items-center justify-center pt-5 gap-2">
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
          <h1 className="font-bold text-2xl">{username ? username : email}</h1>
          {/* TODO: arreglar cuando hago hover... */}
          <RantingUser ranting={4} />

          <h2 className="font-bold text-2xl">Bio</h2>
          {description && description.length > 0 ? (
            <p className="text-balance text-center mx-auto">{description}</p>
          ) : (
            <div className="h-[200px] flex items-center justify-center p-2 border-2 border-dark-bg dark:border-white bg-dark-grey/40 rounded-xl">
              <p className="text-center">
                Il semble que tu n'as pas encore ajouté ton bio! Prende un
                moment pour compléter ton profil et accéder à toutes les
                fonctionnalités de l'application. Nous avons hâte de mieux te
                connaître!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* right side */}
      <div className="flex flex-col w-full text-center sm:text-left gap-5 lg:gap-10 pb-10 px-2 sm:px-5">
        <div>
          <h1 className="font-bold text-2xl mb-5">Mes notes</h1>
          <TasksProfile tasks={userTasks} />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Mes événements crées</h1>
          {userEventsCreated?.length === 0 ? (
            <p>Vous n'avez pas encore créé d'événement</p>
          ) : (
            userEventsCreated.map((event: Events, index: number) => (
              <div
                key={event.id}
                className="w-full flex border border-dark-bg dark:border-light-grey rounded-lg p-5 gap-5 flex-col"
              >
                <h1 className="font-bold text-2xl">{event.title}</h1>
                <p>{event.description}</p>
              </div>
            ))
          )}
          <Link className="primary-btn" href={'/events/new'}>
            Creer un événement 📅
          </Link>
          <h1 className="font-bold text-2xl">Mes événements a venir</h1>
          {userEventsJoined?.length === 0 ? (
            <div>
              <p>Vous n'avez pas encore rejoint des événements</p>
            </div>
          ) : (
            // TODO: add a button to join an event
            userEventsJoined.map((event: UserJoinedEvent, index: number) => (
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
          <h1 className="font-bold text-2xl">Mes avis</h1>
          <p className="text-balance text-center mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
