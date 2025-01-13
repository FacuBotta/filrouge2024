import { selectEventById } from '@/actions/eventsServerActions/selectEventById';
import IconWrapper from '@/components/ui/IconWrapper';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import { EventWithUserAndCount } from '@/types/types';

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const event: EventWithUserAndCount | null = await selectEventById(id);
  console.log(event);

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className="w-full max-w-[800px] mx-auto h-fit border-2 rounded-lg overflow-hidden bg-green-100/10">
      <header className="text-center">
        <img
          className="w-full h-[300px] object-cover"
          src="/images/default_event_image.webp"
          alt="image de l'event"
        />
      </header>
      <section className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 text-left border-b pb-5">
          <h1 className="text-2xl font-bold">
            {event?.title}
            {'  '}
            <span className="font-thin text-lg">
              {' '}
              - {event?.category?.title}
            </span>
          </h1>
          <p>{event?.description}</p>
        </div>
        <div className="flex  justify-between ">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <IconWrapper type="calendar" />
              <div>
                <p>{formatDate(event?.eventStart)}</p>
                <p>{formatDate(event?.eventEnd)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconWrapper type="user" />
              <p>{event?._count.participants} participants</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center gap-2">
            <p>Cree par :</p>
            <UserAvatar className="size-16" src={event?.user.image} />
            <p>{event?.user.username}</p>
            <RantingUser ranting={Math.floor(Math.random() * 5)} />
          </div>
        </div>
      </section>
    </main>
  );
}
