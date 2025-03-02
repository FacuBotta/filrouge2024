import selectUserById from '@/actions/userServerActions/selectUserById';
import MakeCommentForm from '@/components/forms/makeCommentForm';
import CommentCard from '@/components/ui/cards/CommentCard';
import MiniCardEvent from '@/components/ui/cards/MiniCardEvent';
import RantingUser from '@/components/ui/RantingUser';
import { UserAvatar } from '@/public/images/UserAvatar';
import { UserComment, UserData } from '@/types/types';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userData: UserData | null = await selectUserById(id);
  if (!userData) {
    return <div>User not found</div>;
  }
  const { description, username, image, comments, eventsCreated, score } =
    userData;
  return (
    <main className="w-[95%] max-w-[1000px] mx-auto min-h-screen my-10 ">
      <header className="flex justify-around items-start flex-wrap gap-5 p-10 border-2 divide-y-2 sm:divide-none rounded-lg overflow-hidden border-card bg-card">
        <div className="flex flex-col items-center justify-center">
          <UserAvatar src={image} className="size-48" />
          <h1 className="text-3xl font-bold my-5">{username}</h1>
          <RantingUser ranting={score} />
        </div>
        <div className="flex flex-col items-start justify-start gap-5">
          <h2 className="text-3xl font-semibold mt-5">A propos de moi</h2>
          <p className="max-w-[400px]">{description}</p>
          <button className="primary-btn">Contacter</button>
        </div>
      </header>
      <section className="flex flex-wrap my-10 gap-5 w-full">
        <div className="flex flex-col gap-5 sm:w-[550px]">
          {eventsCreated?.length === 0 ? (
            <h3 className="text-2xl font-bold">
              Je n&apos;ai pas encore créé d&apos;événements 😑
            </h3>
          ) : (
            <h3 className="text-3xl font-bold">Mes événements</h3>
          )}
          <div className="flex flex-wrap gap-5 ">
            {eventsCreated.map((event) => (
              <MiniCardEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
        <div className="flex flex-col  min-w-[300px] gap-5 items-start justify-start text-start">
          <div className="w-full flex flex-col ">
            <h2 className="mb-2 text-3xl font-semibold ">Mes avis</h2>
            <MakeCommentForm recipientId={id} />
          </div>
          {comments?.length > 0 &&
            comments?.map((comment: UserComment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
      </section>
    </main>
  );
}
