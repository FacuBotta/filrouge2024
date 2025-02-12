import { selectUserEvents } from '@/actions/eventsServerActions/selectUserEvents';
import selectUserById from '@/actions/userServerActions/selectUserById';
import IconWrapper from '@/components/ui/IconWrapper';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicProfileInformation, EventWithUserAndCount } from '@/types/types';
import { Link } from 'next-view-transitions';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user: BasicProfileInformation | null = await selectUserById(id);

  // TODO : actualisar esto cuando agregue la funcion para cambiar is public...
  let publicUserEvents: EventWithUserAndCount[] = [];
  if (user && user._count.EventsCreated > 0) {
    const dbEvents: EventWithUserAndCount[] | [] = await selectUserEvents({
      userId: user.id,
    });
    publicUserEvents = [...dbEvents];
  }

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('fr', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <main className="w-[95%] max-w-[1000px] mx-auto min-h-screen my-10 ">
      <header className="flex justify-around items-center flex-wrap gap-5 p-10 border-2 divide-y-2 sm:divide-none rounded-lg overflow-hidden border-card bg-card">
        <div className="flex flex-col items-center justify-center">
          <UserAvatar src={user.image} className="size-48" />
          <h1 className="text-3xl font-bold my-5">{user.username}</h1>
          <RantingUser ranting={user._count.Ratings} />
        </div>
        <div className="flex flex-col items-start justify-center gap-5">
          <h2 className="text-3xl font-semibold mt-5">A propos de moi</h2>
          <p className="max-w-[400px]">{user.description}</p>
          <button className="primary-btn">Contacter</button>
        </div>
      </header>
      <section className="flex flex-col my-10 gap-5 ">
        {publicUserEvents.length === 0 ? (
          <h3 className="text-2xl font-bold">
            Je n&apos;ai pas encore créé d&apos;événements 😑
          </h3>
        ) : (
          <h3 className="text-3xl font-bold">Mes événements</h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {publicUserEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/event/${event.id}`}
              className=" w-[300px] flex border border-card rounded-lg p-5 pb-10 gap-2 flex-col justify-between overflow-hidden shadow-xl bg-card hover:opacity-80"
            >
              <div className="flex flex-col gap-2 text-left border-b border-light-borderCards dark:border-dark-borderCards pb-5">
                <h3 className="text-2xl font-bold">{event?.title}</h3>
                <span className="font-thin text-lg">
                  {event?.category?.title}
                </span>
                <p className="mt-4 dark:text-gray-300 break-words line-clamp-3">
                  {event?.description}
                </p>
              </div>
              <div className="flex  justify-between ">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <IconWrapper type="calendar" />
                    <div>
                      <p>{formatDate(event?.eventStart)}</p>
                      {event?.eventEnd && <p>{formatDate(event?.eventEnd)}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconWrapper type="user" />
                    <p>{event?._count.participants} participants</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
