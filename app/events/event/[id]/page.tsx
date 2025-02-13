import { JoinEventRequestProps } from '@/actions/eventsServerActions/jointEventRequest';
import { selectEventById } from '@/actions/eventsServerActions/selectEventById';
import MapInfoCard from '@/components/ui/cards/MapInfoCard';
import AcceptInvitationButton from '@/components/ui/dashboard/AcceptInvitationButton';
import DeclineInvitationButton from '@/components/ui/dashboard/DeclineInvitationButton';
import DisjoinEventButton from '@/components/ui/dashboard/DisjoinEventButton';
import JoinEventButton from '@/components/ui/dashboard/joinEventButton';
import UserCard from '@/components/ui/dashboard/UserCard';
import IconWrapper from '@/components/ui/IconWrapper';
import { auth } from '@/lib/auth/authConfig';
import type { EventWithUserAndCount, Invitation } from '@/types/types';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Vous devez être connecté pour voir l'événement");
  }
  const { id } = await params;
  const event: EventWithUserAndCount | null = await selectEventById(id);
  console.log({ event });

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

  if (!event || !event.user) {
    throw new Error("L'événement n'existe pas");
  }

  // verify if user has an invitation to event
  const userInvitation: Invitation | undefined = event.UserInvitations?.find(
    (invitation) => invitation.participantId === session.user?.id
  );
  const renderActionButton = () => {
    if (event.user?.id === session.user?.id) {
      return (
        <Link className="primary-btn" href={'/profile'}>
          Gérer mon événement
        </Link>
      );
    }
    if (userInvitation?.status === 'JOINED') {
      return (
        <div>
          <DisjoinEventButton
            eventId={event.id}
            userId={session.user?.id as string}
            className="mt-5"
          />
          <div>ajouter au calendrier btn coming soon</div>
        </div>
      );
    }
    if (userInvitation?.status === 'DECLINED_BY_CREATOR') {
      return <div className="primary-btn mt-5">Invitation refusée</div>;
    }
    if (userInvitation?.status === 'WAITING_CREATOR_RESPONSE') {
      return <div className="primary-btn mt-5">Invitation envoyée</div>;
    }
    if (userInvitation?.status === 'WAITING_PARTICIPANT_RESPONSE') {
      return (
        <div className="mt-5 flex gap-2">
          <AcceptInvitationButton userInvitation={userInvitation} />
          <DeclineInvitationButton userInvitation={userInvitation} />
        </div>
      );
    }
    const joinEventParams: JoinEventRequestProps = {
      eventId: event.id,
      eventCreatorId: event.user?.id as string,
      conversationId: event.conversation?.id as string,
      existingInvitationId: userInvitation?.id,
    };

    return (
      <JoinEventButton joinEventParams={joinEventParams} className=" mt-10" />
    );
  };

  return (
    <main className="min-h-screen w-full max-w-[1000px] pb-10 mx-auto text-dark-bg dark:text-white">
      <section className="mx-auto w-full overflow-hidden rounded-lg border-card bg-card">
        <header>
          <Image
            width={1200}
            height={500}
            className="h-[500px] w-full object-cover shadow-lg"
            src={event.image || '/images/default_event_image.webp'}
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
              {renderActionButton()}
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
