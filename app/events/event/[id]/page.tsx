import { selectEventById } from '@/actions/eventsServerActions/selectEventById';
import MapInfoCard from '@/components/ui/cards/MapInfoCard';
import UserCard from '@/components/ui/dashboard/UserCard';
import IconWrapper from '@/components/ui/IconWrapper';
import type { EventWithUserAndCount } from '@/types/types';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event: EventWithUserAndCount | null = await selectEventById(id);

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
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-xl">Event not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full pb-10">
      <section className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-lg border-2  bg-light-grey/10 backdrop-blur-sm">
        <header>
          <Image
            width={1200}
            height={500}
            className="h-[500px] w-full object-cover shadow-lg"
            src="/images/default_event_image.webp"
            alt={`Image for ${event.title}`}
            priority
          />
        </header>

        <div className="flex flex-col gap-4 border-b border-gray-800 p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">
                {event.title}
                <span className="ml-2 text-lg font-normal text-gray-400">
                  - {event.category?.title}
                </span>
              </h1>
              <p className="mt-4 text-gray-300">{event.description}</p>
              <Link className="primary-btn mt-10" href={`/events/${id}/join`}>
                Rejoindre l&apos;événement 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-[1200px] gap-8 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Dates</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <IconWrapper type="calendar" />
              <div className="space-y-1">
                <p className="text-gray-300">
                  Début: {formatDate(event.eventStart)}
                </p>
                <p className="text-gray-300">
                  Fin: {formatDate(event.eventEnd)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconWrapper type="user" />
              <p className="text-gray-300">
                {event._count.participants} participant
                {event._count.participants !== 1 ? 's' : ''}
              </p>
            </div>
            <div>
              <h2 className="mb-5 text-3xl font-semibold text-white">
                Organisateur
              </h2>
              <UserCard user={event.user} />
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="mb-5 text-3xl font-semibold text-white">Ubication</h2>
          <div className="flex items-center gap-3 mb-10">
            <IconWrapper type="mapPin" />
            <p className="text-gray-300">place de la conférence</p>
          </div>
          <div className="flex items-center h-[250px] w-[320px] sm:w-[380px] sm:h-[470px] border-2 rounded-lg">
            <MapInfoCard />
          </div>
        </div>
      </section>
    </main>
  );
}
