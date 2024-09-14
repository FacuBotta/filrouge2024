import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { selectUserEvents } from '@/actions/eventsServerActions/selectUserEvents';
import { selectUserEventsJoined } from '@/actions/eventsServerActions/selectUserEventsJoined';
import { selectUserTasks } from '@/actions/TasksServerActions/selectUserTasks';
import Button from '@/components/ui/Button';
import EventCard from '@/components/ui/dashboard/EventCard';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserJoinedEvent } from '@/types/types';
import { Events, Tasks } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  const { id, description, username, email, image } = userAuthenticated;

  const userTasks: Tasks[] = await selectUserTasks(id as string);
  const userEventsCreated: Events[] = await selectUserEvents(id as string);
  const userEventsJoined: UserJoinedEvent[] = await selectUserEventsJoined(
    id as string
  );
  // console.log('userAuthenticated from dashboard profile page', userEvents);
  // console.log('userAuthenticated from dashboard profile page', userTasks);

  return (
    <section className=" relative no-scrollbar px-2 w-full max-w-[1300px] mx-auto flex flex-col sm:!flex-row  justify-start gap-5 overflow-y-scroll scroll-smooth divide-y sm:divide-y-0 sm:divide-x my-auto">
      {/* profile section - left side */}
      <div className=" w-full sm:w-[40%] h-full flex-col flex items-center justify-center pt-5 gap-2  ">
        <div className="relative">
          <Link aria-label="Éditer profile" href="/dashboard/edit-profile">
            <IconWrapper
              type="edit"
              strokeWidth={2}
              className="hover:scale-110 hover:dark:text-dark-greenLight transition-all ease-in-out absolute bottom-2 right-[-10px]"
            />
          </Link>
          {image ? (
            <Image
              src={image}
              alt="user avatar"
              width={200}
              height={200}
              className="rounded-full border-2 border-dark-bg dark:border-dark-grey"
            />
          ) : (
            <DefaultUserAvatar className="size-full rounded-full " />
          )}
        </div>
        <h1 className="font-bold text-2xl">{username ? username : email}</h1>
        {/* TODO: add the points to the user profile */}
        <div className="flex mb-2">
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow "
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
        </div>

        <h2 className="font-bold text-2xl">Bio</h2>
        <p className="text-balance text-center mx-auto">{description}</p>
        <div>
          <h1 className="font-bold text-2xl">Mes avis</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
        </div>
      </div>
      {/* right side */}
      <div className=" flex flex-col w-full sm:w-[70%] text-center sm:text-left gap-5 lg:gap-10 pb-10 px-2 sm:px-5">
        <div>
          <h1 className="font-bold text-2xl mb-5">Mes notes</h1>
          <TasksProfile tasks={userTasks} />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Mes événements crées</h1>
          {userEventsCreated?.length === 0 ? (
            <p>Vous n'avez pas encore créé d'événement</p>
          ) : (
            // TODO: add a button to create an event
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
          <Link href={'/events'}>
            <Button>Découvrir les événements 🚀</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
