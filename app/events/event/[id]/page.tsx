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
  console.log(event);

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
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
    <main className="min-h-screen w-full max-w-[1000px] pb-10 mx-auto text-dark-bg dark:text-white">
      <section className="mx-auto w-full overflow-hidden rounded-lg border-card bg-card">
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
              <h1 className="text-3xl font-bold">
                {event.title}
                <span className="ml-2 text-lg font-normal opacity-70">
                  - {event.category?.title}
                </span>
              </h1>
              <p className="mt-4 text-balance break-words">
                {event.description}
              </p>
              <Link className="primary-btn mt-10" href={`/events/${id}/join`}>
                Rejoindre l&apos;événement 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-[1200px] gap-8 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Dates</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <IconWrapper type="calendar" />
              <div className="space-y-1">
                <p className="">Début: {formatDate(event.eventStart)}</p>
                {event.eventEnd && (
                  <p className="">Fin: {formatDate(event.eventEnd)}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconWrapper type="user" />
              <p className="">
                {event._count.participants} participant
                {event._count.participants !== 1 ? 's' : ''}
              </p>
            </div>
            <div>
              <h2 className="mb-5 text-3xl font-semibold">Organisateur</h2>
              <UserCard user={event.user} />
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="mb-5 text-3xl font-semibold ">Ubication</h2>
          <div className="flex items-center gap-3 mb-10">
            <IconWrapper type="mapPin" />
            <p className="text-balance break-words">{event.formattedAddress}</p>
          </div>
          <div className="flex items-center h-[250px] w-[320px] sm:w-[380px] sm:h-[470px] border-2 rounded-lg border-card overflow-hidden">
            {event.lat && event.lng ? (
              <MapInfoCard position={{ lat: event.lat, lng: event.lng }} />
            ) : (
              <div className="w-full h-full bg-dark-grey/10 flex items-center justify-center">
                <p className=" text-balance text-center">
                  Cet événement n&apos;a pas de localisation especifiqué
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
